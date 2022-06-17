import React, {Fragment} from 'react';

const DataLabels = (props) => {

    const {title, data} = props;

    return (
        <Fragment>
            <label>{title}</label>
            <p className='mensajes' type='text' readOnly>{data}</p>
        </Fragment>
    )
}

export default DataLabels;