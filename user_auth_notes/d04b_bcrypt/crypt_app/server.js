var bcrypt = require('bcrypt');

bcrypt.hash('bananas', 10, function(err, hash) {
  console.log(hash);
});

bcrypt.compare('potatoes', '$2a$10$ZRv9HYR/L6He7m5f.2xbb.lZXMCks4/bsySUejQ6D4wxmj72o8e0.', function(err, res) {
  console.log("potatoes = " + res);
});

bcrypt.compare('bananas', '$2a$10$dfjom.LQEHqTm1z2u9cC1OpUCCbitj4zNQov.hFuIoVXzcv.YnOUq', function(err, res) {
  console.log("bananas = " +res);
});
