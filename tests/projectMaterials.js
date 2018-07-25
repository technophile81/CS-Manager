const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000';


async function runMaterialsTest(project) {
    let response = await axios.get('/api/materials');
    let materials = response.data;

    // Add 3 random requirements and also add enough to inventory, and allocate them
    for (let i = 0; i < 3; i++) {
        let material = materials[i];
        let needed = 1 + Math.floor(Math.random() * 5);
        let available = needed + Math.floor(Math.random() * 5);

        await axios.post('/api/projects/' + project._id + '/materials/' + material._id, { quantity: needed });

        for (let j = 0; j < needed; j++) {
            await axios.post('/api/inventory', { materialId: material._id, projectId: project._id });
        }

        for (let j = needed; j < available; j++) {
            await axios.post('/api/inventory', { materialId: material._id });
        }
    }

    // Add 3 random requirements and also add enough to inventory, but don't allocate
    for (let i = 3; i < 6; i++) {
        let material = materials[i];
        let needed = 1 + Math.floor(Math.random() * 5);
        let available = needed + Math.floor(Math.random() * 5);

        await axios.post('/api/projects/' + project._id + '/materials/' + material._id, { quantity: needed });

        for (let j = 0; j < available; j++) {
            await axios.post('/api/inventory', { materialId: material._id });
        }
    }

    // Add 3 random requirements and don't add enough to inventory, and allocate all of what's available
    for (let i = 6; i < 9; i++) {
        let material = materials[i];
        let available = 1 + Math.floor(Math.random() * 5);
        let needed = available + 1 + Math.floor(Math.random() * 5);

        await axios.post('/api/projects/' + project._id + '/materials/' + material._id, { quantity: needed });

        for (let j = 0; j < available; j++) {
            await axios.post('/api/inventory', { materialId: material._id, projectId: project._id });
        }
    }

    // Add 3 random requirements and don't add enough to inventory, and allocate some of what's available
    for (let i = 9; i < 12; i++) {
        let material = materials[i];
        let available = 2 + Math.floor(Math.random() * 5);
        let needed = available + 1 + Math.floor(Math.random() * 5);

        await axios.post('/api/projects/' + project._id + '/materials/' + material._id, { quantity: needed });

        for (let j = 0; j < Math.floor(available / 2); j++) {
            await axios.post('/api/inventory', { materialId: material._id, projectId: project._id });
        }

        for (let j = Math.floor(available / 2); j < available; j++) {
            await axios.post('/api/inventory', { materialId: material._id });
        }
    }

    // Add 6 random things to inventory
    for (let i = 12; i < 18; i++) {
        let material = materials[i];
        let available = 1 + Math.floor(Math.random() * 5);

        for (let j = 0; j < available; j++) {
            await axios.post('/api/inventory', { materialId: material._id });
        }
    }

    response = await axios.get('/api/projects/' + project._id + '/materials');

    return response.data;
}


function runSuccessTest(resolve, reject) {
    axios.post('/api/projects', {
        name: 'Create Test',
    }).then((project) => {
        runMaterialsTest(project.data).then((res) => { resolve(res); });
    }).catch((err) => {
        resolve("Failed to create project with status " + err.response.status);
    });
}


async function runTests() {
    console.log(await new Promise(runSuccessTest));
}


runTests().then(() => {
    console.log("\nDone.");
});
