const db = require("../models");

module.exports = {
    createOne: async function (data, userId) {
        data.userId = userId;
        let result = await db.Project.create(data).exec();
        return result;
    },

    deleteOne: async function (id) {
        if (!id) {
            return undefined;
        }

        let result = await db.Project.remove({ _id: id }).exec();
        return result;
    },

    getOne: async function (id, userId) {
        let query = {
            _id: id,
        };

        if (userId) {
            query.userId = userId;
        }

        let result = await db.Project.find(query).exec();

        if (result.length !== 1) {
            return null;
        }

        return result;
    },

    getMany: async function (id, userId, orderBy) {
        let query = {};
        if (userId) {
            query = { '$or' : [ { userId: null }, { userId: userId } ] };
        }

        // TODO: handle orderBy
        let sort = {};

        let result = await db.Project.find(query).sort(sort).exec();
        return result;
    },

    updateOne: async function (id, data) {
        delete data.userId;

        let result = await db.Project.update({ _id: id }, { '$set' : data }).exec();
        return result;
    },
};

