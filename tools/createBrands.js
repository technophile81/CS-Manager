const db = require('../models');
const path = require('path');

// WARNING: This will REMOVE all existing entries in the brand database
db.Brand.remove({}).then(() => {
    let promises = [];

    promises.push(db.Brand.create({ name: 'DMC' }));

    Promise.all(promises).then((results) => {
        console.log("Created " + results.length + " brands. Press CTRL-C to exit.");
    });
});
