const db = require('../models');
const path = require('path');

// WARNING: This will DESTROY the entire database
async function clearDatabase() {
    await db.Credential.remove({});
    await db.Inventory.remove({});
    await db.Material.remove({ userId: { '$ne' : null } });
    await db.Project.remove({});
    await db.User.remove({});

    let invisMaterial = new db.Material({
        brandId: db.getInvisibleUserId(),
        userId: db.getInvisibleUserId(),
        name: 'INVISIBLE',
        red: 0,
        green: 0,
        blue: 0,
        hue: 0,
        saturation: 0,
        lightness: 0,
    });
    await invisMaterial.save();

    let invisProject = new db.Project({
        userId: db.getInvisibleUserId(),
        name: 'INVISIBLE',
    });
    await invisProject.save();

    let testUser = new db.User({
        name: 'Test',
    });
    let user = await testUser.save();

    let testCred = new db.Credential({
        userId: user._id,
        source: 'local',
        name: 'test@example.com',
        secret: 'test',
    });
    await testCred.save();
}

clearDatabase().then(() => {
    console.log("Cleared all users and their data from the database. Press CTRL-C to exit.");
});
