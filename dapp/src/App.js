import React from 'react';
import Form from './components/Form.js';
import web3 from './web3.js';
import monitor from './monitor.js';

function App() {
  console.log(web3.version);
  return (
      <div className='container'>
        <Form/>
      </div>
  );
}

export default App;
