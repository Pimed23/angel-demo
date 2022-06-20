import React, {useEffect, useState} from 'react'
import ActionButton from './ActionButton';
import DataLabel from './DataLabel';
import monitor from '../monitor.js';
import web3 from '../web3.js';
import {Storage} from 'aws-amplify';


const Form = () => {
    const [cloudFile, setCloudFile] = useState('');
    const [fileData, setFileData] = useState('');
    const [fileStatus, setFileStatus] = useState(false);
    const [accountAddress, setAccountAddress] = useState('');
    const [manager, setManager] = useState('');
    const [patient, setPatient] = useState('');
    const [device, setDevice] = useState('');
    const [deviceAddress, setDeviceAddress] = useState('');
    const [patientValid, setPatientValid] = useState(false);

    useEffect(() => {
        const checkingCredentials = async () => {
            getPatient().then((patient) => {
                if (patient === accountAddress) {
                    getManager();
                    setPatient(patient);
                    getDevice(patient);
                    setPatientValid(true);
                } 
            });
        }
        checkingCredentials();
    }, [accountAddress]);

    const getAccount = async () => {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        return account;
    }
    
    const getPatient = async () => {
        const patient = await monitor.methods.patient().call();
        return patient;
    }

    const getManager = async () => {
        const manager = await monitor.methods.manager().call();
        setManager(manager);
    }

    const getDevice = async (patient) => {
        try {
            const device = await monitor.methods.equipment_to_person(patient).call();
            setDevice(device);    
        } catch(err) {
            console.log('Dont found the device data');
        }
    }

    const connectIoTDevice = async (event, params) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        await monitor.methods.addEquipment(params[0], params[1]).send({
            from: accounts[0]
        });
    }

    const connectMetamask = async (event) => {
        event.preventDefault();
        if (typeof window.ethereum !== 'undefined') {
            getAccount().then((account) => {
                setAccountAddress(account)
            });

        } else {
            alert("Metamask is not installed");
        }
    }

    const disconnectMetamask = async (event) => {
        window.ethereum.on('disconnect', setAccountAddress('0x0'));
    }

    const uploadFile = async (event) => {
        event.preventDefault();
        console.log(cloudFile.name);
        await Storage.put(cloudFile.name, cloudFile, {contentType: cloudFile.type});
        setFileStatus(true);
        handleFileShow();
    }

    const handleFileShow = () => {
        Storage.get('time.json').then(resp => {
            fetch(resp)
                .then(resp => resp.json())
                .then(out => {setFileData(JSON.stringify(out))
            });
        });
    }

    /////////////////////////////////////////////////////////////////////////////////
    // SIMULATING IOT DEVICE

    useEffect(() => {
        const updateCloudData = () => {
            try {
                let timestamp = new Date().getTime();
                let data = `[{ "timestamp": "${timestamp}"}]` 
                Storage.put('time.json', data); 
                handleFileShow();
            } catch (error) {
                console.log(error);
            }
        };
        
        const id = setInterval(() => {
            if(patientValid === true)
                updateCloudData(); 
        }, 2000);
    
        return () => clearInterval(id);
    }, [fileData, patientValid]);

    return (
        <form>
            <div className = 'row'>
                <ActionButton
                    title = {!!accountAddress ? 'Disconnect' : 'Connect to Metamask'}
                    action = {!!accountAddress ?    disconnectMetamask : connectMetamask}
                />

                <DataLabel
                    title = 'Medic center ID'
                    data = {!!manager ? manager : '---'}
                />
                <DataLabel
                    title = 'Patient ID'
                    data = {!!patient ? patient : '---'}
                />

                <DataLabel
                    title = 'IoT Device ID'
                    data = {!!device ? device : '---'}
                />

                <label>Link IoT Device</label>
                <input 
                    className='messages u-full-width' type = 'text' 
                    placeholder='Enter IoT address' value={deviceAddress}
                    onChange={event => setDeviceAddress(event.target.value)}
                />

                <ActionButton
                    title = 'Click to connect'
                    action = {connectIoTDevice}
                    params = {[deviceAddress, patient]}
                />

                <p></p>
                <div>
                    <label>Patient Data</label>
                    <textarea className='u-full-width' value={fileData} readOnly></textarea>
                </div>

                <p></p>
                <center>
                    <label>Upload file to the Cloud</label>
                    <input type='file' onChange={(e) => setCloudFile(e.target.files[0])}/>
                    <button onClick={uploadFile}>Upload File</button>                    
                    <div>{fileStatus ? 'File upload successfully' : ''}</div>
                </center>                
            </div>
        </form>
    )
}

export default Form;