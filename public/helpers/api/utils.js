var ajax = require('../ajax');

var getTime = function(opts) {
  var opts = opts || {};
  opts.method = 'GET';
  opts.url = '/api/utils/time';
  ajax.request(opts);
};

var getDeadline = function(type, opts) {
  var opts = opts || {};
  opts.method = 'GET';
  opts.url = '/api/utils/deadline';
  opts.params = { type: type };
  ajax.request(opts);
};

module.exports = {
  getTime: getTime,
  getDeadline: getDeadline
};
