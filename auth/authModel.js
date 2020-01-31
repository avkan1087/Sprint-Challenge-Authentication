const db = require('../database/dbConfig');

module.exports = {
    find,
    findBy,
    findById, 
    add,
    update,
    remove
}

function find () {
    return db('users');
};

function findBy(users) {
    return db('users').where(users);
}

function findById (id) {
    return db('users')
    .where({ id })
};

function add(newUser) {
    return db('users')
    .insert(newUser)
    .then(ids => {
    return findById(ids[0]);
    });
}

function update(changes, id) {
    return db('users')
    .where('id' , id)
    .update(changes)
    .then(count => {
    count > 0 ? findById(id) : null
    });
};

function remove (id) {
    return db('users')
    .where('id' , id)
    .del();
};