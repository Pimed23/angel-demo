import React, {Fragment, useEffect, useState, useRef} from 'react';
import Form from './components/Form';
import Amplify, {Storage} from 'aws-amplify';

function App() {
  const ref = useRef(null);
  const [heartbeat, setHeartbeat] = useState(null);
  const [accountAddress, setAccountAddress] = useState("");
  
  // Erase setters...
  // const handleAccountAddress = () => {
  //   setAccountAddress
  // }

  useEffect(() => {
    handleFileShow();
    Amplify.configure({
      Auth: {
          identityPoolId: 'us-east-1:f4a2f0dc-d4f0-4d91-87ea-be7b12b09026', //REQUIRED - Amazon Cognito Identity Pool ID
          region: 'us-east-1' // REQUIRED - Amazon Cognito Region
      },
      Storage: {
          AWSS3: {
              bucket: 'angel-dapp', //REQUIRED -  Amazon S3 bucket name
              region: 'us-east-1', //OPTIONAL -  Amazon service region
          }
      }
    });
  });

  const handleFileLoad = () => {
    const filename = ref.current.files[0].name;
    Storage.put(filename, ref.current.files[0])
      .then(resp => {
        setHeartbeat(resp);
      }).catch(err => {
        console.log(err);
      });
  }

  const handleFileShow = () => {
    Storage.get('time.json')
      .then(resp => {
        setHeartbeat(resp);
        console.log(resp);
      })
  }

  return (
    <Fragment>
      <div className='container'>
        <Form
          accountAddress = {accountAddress}
          setAccountAddress = {setAccountAddress}
          heartbeat = {heartbeat}
        />
        <input ref={ref} type="file" onChange={handleFileLoad}/>
      </div>
    </Fragment>
  );
}

export default App;