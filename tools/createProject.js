const db = require('../models');
const path = require('path');

db.Project.create({
    userId: db.getFakeUserId(),
    name: 'Kitteh',
    photoUrl: 'https://r.hswstatic.com/w_907/gif/tesla-cat.jpg'
}).then((res) => {
    console.log(res);
});
