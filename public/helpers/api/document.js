var ajax = require('../ajax');

var base = {
  createDraft: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/base/create_draft';
    ajax.request(opts);
  },

  updateDraft: function(id, args) {
    var opts = args || {};
    opts.method = 'PUT';
    opts.url = '/api/documents/base/update_draft';
    opts.params.id = id;
    ajax.request(opts);
  },

  deleteDraft: function(id, args) {
    var opts = args || {};
    opts.method = 'DELETE';
    opts.url = '/api/documents/base/delete_draft';
    opts.params = { id: id };
    ajax.request(opts);
  }
};

var motion = {
  motions: function(docid, mode, args) {
    var opts = args || {};
    opts.method = 'GET';
    opts.document_id = docid;
    opts.mode = mode || 'in'; // mode is 'in' or 'out'
    opts.url = '/api/documents/motion';
    ajax.request(opts);
  },

  createDraft: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/motion/create_draft';
    ajax.request(opts);
  },

  // TODO: other methods!
};

module.exports = {
  base: base,
  motion: motion
};
