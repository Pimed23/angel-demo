import React, {Fragment} from 'react';
import monitor from '../monitor.js';
import web3 from '../web3.js';

const ActionButton = (props) => {

    const {title, params} = props;

    const connectIoTDevice = async(event, params) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        await monitor.methods.addEquipment(params[0], params[1]).send({
            from: accounts[0]
        });
    }

    return (
        <Fragment>
            <button 
                className = 'u-full-width' 
                onClick = {async (event) => {await connectIoTDevice(event, params)}}
            >{title}</button>
        </Fragment>
    )
}

export default ActionButton;