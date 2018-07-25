const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000';


function runCreateFailTest(resolve, reject) {
    axios.post('/api/projects', {
        foo: 'bar',
    }).then((res) => {
        resolve("runCreateFailTest: Unexpectedly succeeded on bad creation.");
    }).catch((err) => {
        resolve("runCreateFailTest: OK");
    });
}

function runCreateSuccessTest(resolve, reject) {
    axios.post('/api/projects', {
        name: 'Test',
    }).then((res) => {
        resolve("runCreateSuccessTest: OK");
    }).catch((err) => {
        resolve("runCreateFailTest: Failed to create project.");
    });
}

async function runTests() {
    console.log(await new Promise(runCreateFailTest));
    console.log(await new Promise(runCreateSuccessTest));
}


runTests().then(() => {
    console.log("\nDone.");
});
