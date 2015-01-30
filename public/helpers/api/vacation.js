var ajax = require('../ajax');

var createVacation = function(args) {
  var opts = args || {};
  opts.method = 'POST';
  opts.url = '/api/vacation/base/create_draft';
  ajax.request(opts);
};

module.exports = {
  createVacation: createVacation
};
