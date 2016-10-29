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
  },

  reply: function(sourceid, args){
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/base/reply';
    opts.params = { sourceid: sourceid };
    ajax.request(opts);
  },

  clone: function(sourceid, args){
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/base/clone';
    opts.params = { sourceid: sourceid };
    ajax.request(opts);
  }
};

var edit = {
  modification: function(id, args) {
    var opts = args || {};
    opts.method = 'GET';
    opts.url = '/api/documents/base/modification/'+ id;
    opts.params = { id: id };
    ajax.request(opts);
  },

  edit: function(id, args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/base/edit';
    opts.params.id = id;
    ajax.request(opts);
  },

  prepare: function(id, args){
    var opts = args || {};
    opts.method = 'GET';
    opts.url = '/api/documents/filestemp/prepare/' + id;
    ajax.request(opts);
  },

  purge: function(id, args){
    var opts = args || {};
    opts.method = 'GET';
    opts.url = '/api/documents/filestemp/purge/' + id;
    ajax.request(opts);
  },  

  filedelete: function(id, args) {
    var opts = args || {};
    opts.method = 'DELETE';
    opts.url = '/api/documents/filestemp/delete';
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
  },

  author: function(args) {
    var opts = args || {};
    opts.method = 'POST';
    opts.url = '/api/documents/comments/author';
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

var responseType = {
  send: 1,
  complete: 2,
  cancel: 3
};

var print = {
  card: function(id, args){
    var opts = args || {};
    opts.method = 'GET';
    opts.url = '/api/documents/print/card/' + id;
    ajax.request(opts);
  },

  showPDFwindow: function(url) {
    var pdfwin = Ext.create('Ext.Window',{
        title: i18n.document.base.ui.card,
        width: '50%',
        height: '80%',
        layout:'anchor',
        anchor:"100% 100%",
        maximizable: true,
        modal: true,
        items: {
          xtype: 'component',
          autoEl: {
            style: 'height: 100%; width: 100%; border: none',
            html: '<iframe src="' + url + '" height="100%", width="100%" />'
          }
        }
      });

    pdfwin.show();
  }

};

module.exports = {
  base: base,
  motion: motion,
  comment: comment,
  file: file,
  relation: relation,
  responseType: responseType,
  print: print,
  edit: edit
};
