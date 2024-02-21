// Run cmd by administrator: npm install axios jsonwebtoken 
 
const jwt = require('jsonwebtoken');
const axios = require('axios');

const domain = "0898768886"; 
const secret = 'KZY1rJ0nLrx0Zjgd'; // Replace with your actual secret key 
const agentId = "401_202";    

//const domain = "0898776879"; 
//const secret = 'FM3+zYwjlaH0GNQ8'; // Replace with your actual secret key 
//const agentId = "284_284";    

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 360);

const payload = {
    ipphone: agentId,
    expired: expirationDate,
}; 
const header = {
    algorithm: 'HS256',  // Specify the signing algorithm
    typ: 'JWT',  // Add the "typ" claim
};  
const token = jwt.sign(payload, secret,{ header });
console.log(token);

const apiUrl = `https://3c-capi.mobifone.vn/${domain}/thirdParty/login`;
axios.post(apiUrl, { token: token })
    .then(response => {
        // Handle the API response here
        console.log(response.data);
    })
    .catch(error => {
        // Handle errors here
        console.error(error.message);
    });
 