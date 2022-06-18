import React, {useEffect, useState} from 'react'
import ActionButton from './ActionButton';
import DataLabel from './DataLabel';
import monitor from '../monitor.js';

const Form = () => {
    const [manager, setManager] = useState('');
    const [patient, setPatient] = useState('');
    const [device, setDevice] = useState('');
    const [deviceAddress, setDeviceAddress] = useState('');

    useEffect(() => {
        async function getManager() {
            const manager = await monitor.methods.manager().call();
            setManager(manager);    
        }
        getManager();

        async function getPatient() {
            const patient = await monitor.methods.patient().call();
            setPatient(patient);
            getDevice(patient);
        }
        getPatient();    
    }, []);

    async function getDevice(patient) {
        try {
            const device = await monitor.methods.equipment_to_person(patient).call();
            setDevice(device);    
        } catch(err) {
            console.log('Dont found the device data');
        }
    }
    
    return (
        <form>
            <div className = 'row'>
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
                    params = {[deviceAddress, patient]}
                />
            </div>
        </form>
    )
}

export default Form;