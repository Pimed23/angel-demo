import React, {useEffect, useState} from 'react'
import DataLabels from './DataLabels';

const Form = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        setData('Hola');    
    }, []);
    
    return (
        <form>
            <div className='row'>
                <DataLabels
                    title = 'Cotizador de precios'
                    data = {data}
                />
            </div>
        </form>
    )
}

export default Form;