const db = require('../database/dbConfig');

module.exports = {
    add,
    findBy,
    findById,
    findAll,
    FBfindOrCreate
};

function findBy(filter) {
    return db('users')
        // .select('id', 'email', 'first_name', 'last_name')
        .where(filter)
        .first();
}

function add(user) {
    return db('users').insert(user);
}

function findById(id) {
    return db('users')
        .select('id', 'email', 'first_name', 'last_name')
        .where({ id })
        .first();
}

function findAll() {
    return db('users')
        .select('*')
}

async function FBfindOrCreate(userObj)
{
    let user = await db('users')
                .where({ facebookID: userObj })
    if (user.length === 0)
    {
        let newUser = await db('users')
            .insert({ email: userObj.email, first_name: userObj.first_name, last_name: userObj.last_name, facebookID: userObj.facebookID}, 'id')
        return db('users').where({id: newUser.id}).first()
    }
    else
    {
        return user[0]
    }
}