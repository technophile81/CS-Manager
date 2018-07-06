const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/CS-Manager");

var db = require('./models');

const csvFilePath = './db/dmc-floss.csv';
const csv = require('csvtojson');

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h in the set [0, 360) and s and l in the set [0, 100].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}

// WARNING: This will REMOVE all existing entries in the database.
db.Material.remove({}).then(() => {
    csv()
        .fromFile(csvFilePath)
        .then((materialsList) => {
            let promises = [];

            for (let material of materialsList) {
                let [h, s, l] = rgbToHsl(material.materialRed, material.materialGreen, material.materialBlue);
                material.materialHSL = (h * 1000000) + (s * 1000) + l;

                promises.push(db.Material.create(material));
            }

            Promise.all(promises).then((results) => {
                console.log("Imported " + results.length + " colors. Press CTRL-C to exit.");
            })
        });
});