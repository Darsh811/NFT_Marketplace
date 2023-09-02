import axios from "axios";
var FormData = require('form-data');
var data = new FormData();
// https://docs.pinata.cloud/pinata-api/authentication

/*
1 - CREATE AN ACCOUNT
2 - CREATE AN API_KEY
3 - AUTHENTICATE 
4 - CONNECT TO THE PINATA API
5 - PINNING : https://docs.pinata.cloud/pinata-api/pinning
*/


var config = {
  method: 'get',
  url: 'https://api.pinata.cloud/data/testAuthentication',
  headers: { 
    'Authorization': 'Bearer ' + process.env.REACT_APP_PINATA_SECRET_ACCESS_TOKEN
  }
};

var pinFile = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    data: data,
    headers: { 
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY, 
        pinata_secret_api_key : process.env.REACT_APP_PINATA_SECRET_API_KEY, 
    }
  };

export async function connect() {
    try {
        const res = await axios(config)
        console.log(res.data);
    } catch (e) {
        console.error(e)
    }
}

export function uploadFileToIPFS(value, callback) {
    data.append('file', value.file);
    data.append('pinataOptions', '{"cidVersion": 1}');
    data.append('pinataMetadata', `{"name": "${value.file.name}", "keyvalues": {"company": "Pinata"}}`)
  
    axios(pinFile)
    .then(callback)
    .catch(console.error)

}
