// Run cmd by administrator: npm install axios jsonwebtoken
 
const jwt = require('jsonwebtoken');
const domain = "0898768886";
const secretKey = "KZY1rJ0nLrx0Zjgd";
const agentId = "401_201"; 
const expirationSeconds = 360000; // Token expires in 1 hour

function generateJWT(agentId, secretKey, expirationSeconds) {  
    const payload = {
        ipphone: agentId,
        expired: Math.floor(Date.now() / 1000) + expirationSeconds,
    };
    const token = jwt.sign(payload, secretKey);
    return token;
}

const generatedToken = generateJWT(agentId, domain, secretKey, expirationSeconds);
console.log('Generated Token:', generatedToken);

