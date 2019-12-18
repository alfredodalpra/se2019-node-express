let users = [];

module.exports = {
  add
};

function add(user) {
  if (!user.name) {
    throw new Error('name is required');
  }

  if (!user.email) {
    throw new Error('email is required');
  }
  const newUser = {
    id: users.length + 1,
    name: user.name,
    email: user.email
  };
  users.push(newUser);
  return newUser;
}
