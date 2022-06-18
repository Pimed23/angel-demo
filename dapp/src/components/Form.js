import React, {useEffect, useState} from 'react'
import ActionButton from './ActionButton';
import DataLabel from './DataLabel';
import monitor from '../monitor.js';
import web3 from '../web3.js';

const Form = () => {
    const [accountAddress, setAccountAddress] = useState('');
    const [manager, setManager] = useState('');
    const [patient, setPatient] = useState('');
    const [device, setDevice] = useState('');
    const [deviceAddress, setDeviceAddress] = useState('');

    useEffect(() => {
        const checkingCredentials = async () => {
            getPatient().then((patient) => {
                if (patient === accountAddress) {
                    getManager();
                    setPatient(patient);
                    getDevice(patient);
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
            </div>
        </form>
    )
}

export default Form;