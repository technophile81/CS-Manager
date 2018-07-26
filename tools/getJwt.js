const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000';


async function getJwt() {
    let response = await axios.post('/api/login', {
        email: 'test@example.com',
        password: 'test',
    });

    return response.data;
}


getJwt().then((jwt) => {
    console.log(jwt);
});
