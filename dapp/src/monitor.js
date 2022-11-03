import web3 from "./web3";

const address = '0x8a8b10d7e55D04e19247821524fA83Ba7E6438A4'; 

const abi = [{"constant":false,"inputs":[{"name":"equipment","type":"address"},{"name":"person","type":"address"}],"name":"addEquipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"measures","outputs":[{"name":"start_timestamp","type":"uint256"},{"name":"end_timestamp","type":"uint256"},{"name":"equipment_address","type":"address"},{"name":"monitored_person","type":"address"},{"name":"is_normal","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"start","type":"uint256"},{"name":"end","type":"uint256"},{"name":"person","type":"address"},{"name":"target","type":"address"},{"name":"is_normal","type":"bool"}],"name":"createMeasure","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"patient","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"equipment_to_person","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"creator","type":"address"},{"name":"target","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

export default new web3.eth.Contract(abi, address);