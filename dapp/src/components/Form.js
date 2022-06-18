import React, {useEffect, useState} from 'react'
import DataLabels from './DataLabels';
import monitor from '.././monitor.js';

const Form = () => {
    const [manager, setManager] = useState('');

    useEffect(() => {
        async function getManager() {
            const manager = await monitor.methods.manager().call();
            setManager(manager);    
        }
        getManager();
    }, []);
    
    return (
        <form>
            <div className='row'>
                <DataLabels
                    title = 'Cotizador de precios'
                    data = {manager}
                />
            </div>
        </form>
    )
}

export default Form;