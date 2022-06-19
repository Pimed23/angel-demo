import React, {Fragment} from 'react';
import Form from './components/Form.js';
import {Amplify} from 'aws-amplify';
import {withAuthenticator} from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
//import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

const App = ({signOut, user}) => {

    return (
        <Fragment>
            <div className='container'>
                <Form/>
            </div>

        </Fragment>
    );
}

export default withAuthenticator(App);
