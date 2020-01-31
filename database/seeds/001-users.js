
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Harry', password: "test"},
        {username: 'Neville', password: "test"},
        {username: 'Ron', password: "test"},
      ]);
    });
};
