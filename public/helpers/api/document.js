var ajax = require('../ajax');

var createDraft = function(args) {
  var opts = args || {};
  opts.method = 'POST';
  opts.url = '/api/documents/base/create_draft';

  opts.success = function(data) {
    console.log(data.id);
  };

  ajax.request(opts);
};

module.exports = {
  createDraft: createDraft
};
