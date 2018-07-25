const db = require('../models');
const path = require('path');

// WARNING: This will DESTROY the entire database
async function clearDatabase() {
    await db.Credential.remove({});
    await db.Inventory.remove({});
    // only clear user-bound materials
    // await db.Material.remove({});
    await db.Project.remove({});
    await db.User.remove({});
}

clearDatabase().then(() => {
    console.log("Cleared all users and their data from the database. Press CTRL-C to exit.");
});
