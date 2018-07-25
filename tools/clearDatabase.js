const db = require('../models');
const path = require('path');

// WARNING: This will DESTROY the entire database
async function clearDatabase() {
    await db.Brand.remove({});
    await db.Credential.remove({});
    await db.Inventory.remove({});
    await db.Material.remove({});
    await db.Project.remove({});
    await db.User.remove({});
}

clearDatabase().then(() => {
    console.log("Cleared the database. Press CTRL-C to exit.");
});
