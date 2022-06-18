import React, {Fragment} from 'react';

const DataLabel = (props) => {

    const {title, data} = props;

    return (
        <Fragment>
            <label>{title}</label>
            <p className='messages' type='text' readOnly>{data}</p>
        </Fragment>
    );
}

export default DataLabel;