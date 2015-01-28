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
  createDraft: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/motion/create_draft';
    ajax.request(opts);
  },

  updateDraft: function(id, args) {
    var opts = args || {};
    opts.method = 'PUT';
    opts.url = '/api/documents/motion/update_draft';
    opts.params.id = id;
    ajax.request(opts);
  },

  deleteDraft: function(id, args) {
    var opts = args || {};
    opts.method = 'DELETE';
    opts.url = '/api/documents/motion/delete_draft';
    opts.params = { id: id };
    ajax.request(opts);
  }
};

module.exports = {
  base: base,
  motion: motion
};
