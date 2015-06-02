var ajax = require('../ajax');

var update = function(params, opts) {
  var opts = opts || {};
  opts.method = 'PUT';
  opts.url = '/api/user/update';
  opts.params = params;
  ajax.request(opts);
};

module.exports = {
  update: update
};
