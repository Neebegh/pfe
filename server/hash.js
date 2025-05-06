const bcrypt = require('bcryptjs');

bcrypt.hash('admin$123', 12).then(hash => {
  console.log("Hash :", hash);
});
