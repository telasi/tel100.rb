var ajax = require('../ajax');

var getInfo = function(id, className, opts) {
  var opts = opts || {};
  opts.method = 'GET';
  opts.url = '/api/party/info';
  opts.params = { id: id, class_name: className };
  ajax.request(opts);
};

module.exports = {
  getInfo: getInfo
};
