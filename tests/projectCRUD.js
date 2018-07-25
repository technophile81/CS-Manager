const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000';


function runCreateFailTest(resolve, reject) {
    axios.post('/api/projects', {
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
    axios.post('/api/projects', {
        name: 'Create Test',
    }).then((res) => {
        resolve("OK");
    }).catch((err) => {
        resolve("Failed to create project with status " + err.response.status);
    });
}


function runDeleteFailTest(resolve, reject) {
    axios.delete('/api/projects/1234').then((res) => {
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
    axios.post('/api/projects', {
        name: 'Delete Test',
    }).then((res) => {
        axios.delete('/api/projects/' + res.data._id).then((res) => {
            if (res.status === 204) {
                resolve("OK");
            } else {
                resolve("Unexpected status " + res.status);
            }
        }).catch((err) => {
            resolve("Failed to delete project with status " + err.response.status);
        });
    }).catch((err) => {
        resolve("Failed to create project with status " + err.response.status);
    });
}


function runReadSuccessTest(resolve, reject) {
    axios.get('/api/projects').then((res) => {
        resolve("OK");
    }).catch((err) => {
        resolve("Failed to get list of projects with status " + err.response.status);
    });
}


function runUpdateFailTest(resolve, reject) {
    axios.put('/api/projects/1234', {
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
    axios.post('/api/projects', {
        name: 'Update Test',
    }).then((res) => {
        axios.put('/api/projects/' + res.data._id, {
            name: 'Update Success',
        }).then((res) => {
            if (res.status === 200) {
                resolve("OK");
            } else {
                resolve("Unexpected status " + res.status);
            }
        }).catch((err) => {
            resolve("Failed to update project with status " + err.response.status);
        });
    }).catch((err) => {
        resolve("Failed to create project with status " + err.response.status);
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
