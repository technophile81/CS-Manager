const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000';


function runCreateFailTest(resolve, reject) {
    axios.post('/api/inventory', {
        foo: 'bar',
    }).then((res) => {
        resolve("Unexpectedly succeeded on bad creation");
    }).catch((err) => {
        if (err.response.status === 422) {
            resolve("OK");
        } else {
            resolve("Unexpected status " + err.response.status);
        }
    });
}

function runCreateSuccessTest(resolve, reject) {
    axios.post('/api/inventory', {
        materialId: '000000000000000000000000',
    }).then((res) => {
        resolve("OK");
    }).catch((err) => {
        resolve("Failed to create inventory item with status " + err.response.status);
    });
}


function runDeleteFailTest(resolve, reject) {
    axios.delete('/api/inventory/1234').then((res) => {
        resolve("Unexpectedly succeeded on bad deletion");
    }).catch((err) => {
        if (err.response.status === 404) {
            resolve("OK");
        } else {
            resolve("Unexpected status " + err.response.status);
        }
    });
}

function runDeleteSuccessTest(resolve, reject) {
    axios.post('/api/inventory', {
        materialId: '000000000000000000000000',
    }).then((res) => {
        axios.delete('/api/inventory/' + res.data._id).then((res) => {
            if (res.status === 204) {
                resolve("OK");
            } else {
                resolve("Unexpected status " + res.status);
            }
        }).catch((err) => {
            resolve("Failed to delete inventory item with status " + err.response.status);
        });
    }).catch((err) => {
        resolve("Failed to create inventory item with status " + err.response.status);
    });
}


function runReadSuccessTest(resolve, reject) {
    axios.get('/api/inventory').then((res) => {
        for (let inventory in res.data) {
            if (inventory.name === 'INVISIBLE') {
                resolve("Found invisible test inventory");
                return;
            }
        }

        resolve("OK");
    }).catch((err) => {
        resolve("Failed to get list of inventory items with status " + err.response.status);
    });
}


async function runTests() {
    console.log("runCreateFailTest: " + await new Promise(runCreateFailTest));
    console.log("runCreateSuccessTest: " + await new Promise(runCreateSuccessTest));

    console.log("runDeleteFailTest: " + await new Promise(runDeleteFailTest));
    console.log("runDeleteSuccessTest: " + await new Promise(runDeleteSuccessTest));

    console.log("runReadSuccessTest: " + await new Promise(runReadSuccessTest));
}


runTests().then(() => {
    console.log("\nDone.");
});
