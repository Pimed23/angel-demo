import React, {useEffect, useState} from 'react'
import DataLabels from './DataLabels';
import monitor from '.././monitor.js';

const Form = () => {
    const [manager, setManager] = useState('');
    const [patient, setPatient] = useState('');

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
            <div className='row'>
                <DataLabels
                    title = 'Medic center ID'
                    data = {manager}
                />
                <DataLabels
                    title = 'Patient ID'
                    data = {patient}
                />
            </div>
        </form>
    )
}

export default Form;