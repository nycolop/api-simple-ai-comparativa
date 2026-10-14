const buildGreeting = (name) => {
  if (!name || name.trim() === '') {
    return { error: 'The "name" query parameter is required.' };
  }

  return { message: `Hello, ${name}` };
};

module.exports = { buildGreeting };
