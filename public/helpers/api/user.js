var ajax = require('../ajax');

var update = function(params, opts) {
  var opts = opts || {};
  opts.method = 'PUT';
  opts.url = '/api/user/update';
  opts.params = params
  ajax.request(opts);
};

var changePassword = function(password, opts) {
  var opts = opts || {};
  opts.method = 'PUT';
  opts.url = '/api/user/change_password';
  opts.params = { password: password }
  ajax.request(opts);
};

module.exports = {
  changePassword: changePassword,
  update: update
};
