import React, {Fragment} from 'react';

const ActionButton = (props) => {

    const {title, action, params} = props;

    return (
        <Fragment>
            <button 
                className = 'u-full-width' 
                onClick = {async (event) => {await action(event, params)}}
            >{title}</button>
        </Fragment>
    )
}

export default ActionButton;