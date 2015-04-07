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
  },

  sendDraft: function(id, args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/base/send_draft';
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
  },

  sendDraft: function(documentId, parentId, args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/motion/send_draft_motions';
    opts.params = { document_id: documentId, parent_id: parentId };
    ajax.request(opts);
  }
};

var comment = {
  create: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/comments/create';
    ajax.request(opts);
  },

  sign: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/comments/sign';
    ajax.request(opts);
  }
};

var file = {
  delete: function(id, args) {
    var opts = args || {};
    opts.method = 'DELETE';
    opts.url = '/api/documents/files/delete';
    opts.params = { id: id };
    ajax.request(opts);
  },
};

var relation = {
  create: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/relations/create';
    ajax.request(opts);
  },

  delete: function(args) {
    var opts = args || {};
    opts.method = 'DELETE';
    opts.url = '/api/documents/relations/delete';
    ajax.request(opts);
  }
};

var print = {
  card: function(id, args){
    var opts = args || {};
    opts.method = 'GET';
    opts.url = '/api/documents/print/card/' + id;
    ajax.request(opts);
  }
};

module.exports = {
  base: base,
  motion: motion,
  comment: comment,
  file: file,
  relation: relation,
  print: print
};
