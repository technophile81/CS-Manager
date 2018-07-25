const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000';


const materialData = {
    brandId: '000000000000000000000000',
    name: 'Test Material',
    red: 0,
    green: 0,
    blue: 0,
    hue: 0,
    saturation: 0,
    lightness: 0,
};


function runCreateFailTest(resolve, reject) {
    axios.post('/api/materials', {
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
    axios.post('/api/materials', materialData).then((res) => {
        resolve("OK");
    }).catch((err) => {
        resolve("Failed to create material with status " + err.response.status);
    });
}


function runDeleteFailTest(resolve, reject) {
    axios.delete('/api/materials/1234').then((res) => {
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
    axios.post('/api/materials', materialData).then((res) => {
        axios.delete('/api/materials/' + res.data._id).then((res) => {
            if (res.status === 204) {
                resolve("OK");
            } else {
                resolve("Unexpected status " + res.status);
            }
        }).catch((err) => {
            resolve("Failed to delete material with status " + err.response.status);
        });
    }).catch((err) => {
        resolve("Failed to create material with status " + err.response.status);
    });
}


function runReadSuccessTest(resolve, reject) {
    axios.get('/api/materials').then((res) => {
        for (let material in res.data) {
            if (material.name === 'INVISIBLE') {
                resolve("Found invisible test material");
                return;
            }
        }

        resolve("OK");
    }).catch((err) => {
        resolve("Failed to get list of materials with status " + err.response.status);
    });
}


function runUpdateFailTest(resolve, reject) {
    axios.put('/api/materials/1234', {
        name: 'Update Fail',
    }).then((res) => {
        resolve("Unexpectedly succeeded on bad update");
    }).catch((err) => {
        if (err.response.status === 404) {
            resolve("OK");
        } else {
            resolve("Unexpected status " + err.response.status);
        }
    });
}

function runUpdateSuccessTest(resolve, reject) {
    axios.post('/api/materials', materialData).then((res) => {
        axios.put('/api/materials/' + res.data._id, {
            name: 'Update Success',
        }).then((res) => {
            if (res.status === 200) {
                resolve("OK");
            } else {
                resolve("Unexpected status " + res.status);
            }
        }).catch((err) => {
            resolve("Failed to update material with status " + err.response.status);
        });
    }).catch((err) => {
        resolve("Failed to create material with status " + err.response.status);
    });
}


async function runTests() {
    console.log("runCreateFailTest: " + await new Promise(runCreateFailTest));
    console.log("runCreateSuccessTest: " + await new Promise(runCreateSuccessTest));

    console.log("runDeleteFailTest: " + await new Promise(runDeleteFailTest));
    console.log("runDeleteSuccessTest: " + await new Promise(runDeleteSuccessTest));

    console.log("runReadSuccessTest: " + await new Promise(runReadSuccessTest));

    console.log("runUpdateFailTest: " + await new Promise(runUpdateFailTest));
    console.log("runUpdateSuccessTest: " + await new Promise(runUpdateSuccessTest));
}


runTests().then(() => {
    console.log("\nDone.");
});
