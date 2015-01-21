var ajax = require('../ajax');

var createDraft = function(args) {
  var opts = args || {};
  opts.method = 'POST';
  opts.url = '/api/documents/base/create_draft';
  ajax.request(opts);
};

var deleteDraft = function(id, args) {
  var opts = args || {};
  opts.method = 'DELETE';
  opts.url = '/api/documents/base/delete_draft';
  opts.params = { id: id };
  ajax.request(opts);
};


module.exports = {
  createDraft: createDraft,
  deleteDraft: deleteDraft
};
