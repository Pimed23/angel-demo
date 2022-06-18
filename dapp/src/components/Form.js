import React, {useEffect, useState} from 'react'
import ActionButton from './ActionButton';
import DataLabel from './DataLabel';
import monitor from '../monitor.js';

const Form = () => {
    const [manager, setManager] = useState('');
    const [patient, setPatient] = useState('');
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
        }
        getPatient();
    
    }, []);
    
    return (
        <form>
            <div className = 'row'>
                <DataLabel
                    title = 'Medic center ID'
                    data = {manager}
                />
                <DataLabel
                    title = 'Patient ID'
                    data = {patient}
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