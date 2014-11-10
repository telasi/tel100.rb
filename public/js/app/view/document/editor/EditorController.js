Ext.define('Telasi.view.document.editor.EditorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditor',

  init: function() {
    var doc = this.getViewModel().getData().doc;
    var self = this;
    if ( typeof doc.getId() === 'number' ) {
      Ext.Ajax.request({
        url: '/api/docs/motions',
        method: 'GET',
        params: { flat: 'true', id: doc.getId() },
        success: function(data) {
          var motionsStore = self.getMotionsStore();
          motionsStore.add(JSON.parse(data.responseText));
        }
      });
      Ext.Ajax.request({
        url: '/api/docs/authors',
        method: 'GET',
        params: { id: doc.getId() },
        success: function(data) {
          var authorsStore = self.getAuthorsStore();
          authorsStore.add(JSON.parse(data.responseText));
        }
      });
    }
  },

  getMotionsGrid:  function() { return this.getView().down('document-motions-grid'); },
  getMotionsStore: function() { return this.getMotionsGrid().getStore(); },
  getAuthorsGrid:  function() { return this.getView().down('document-authors-grid'); },
  getAuthorsStore: function() { return this.getAuthorsGrid().getStore(); },
  getSignaturesGrid: function() { return this.getView().down('document-signatures-grid'); },
  getSignaturesStore: function() { return this.getSignaturesGrid().getStore(); },

  sendDocument: function(btn, status) {
    var editor = btn.up('document-editor');

    // motions data

    var motionsStore = this.getMotionsStore();
    var motions = [];
    for (var i = 0, l = motionsStore.data.length; i < l; i++) {
      var motionData = motionsStore.getAt(i).data;
      var id = motionData.id;
      motions.push({
        id: typeof id === 'number' ? id : undefined,
        receiver_id: motionData.receiver_id,
        receiver_type: motionData.receiver_type,
        motion_text: motionData.motion_text,
        due_date: motionData.due_date
      });
    }

    for(var i = 0, l = motionsStore.removed.length; i < l; i++) {
      var data = motionsStore.removed[i].data;
      motions.push({ id: data.id, _deleted: true });
    }

    // authors data

    var authorsStore = this.getAuthorsStore();
    var authors = [];
    for (var i = 0, l = authorsStore.data.length; i < l; i++) {
      var authorData = authorsStore.getAt(i).data;
      var id = authorData.id;
      authors.push({
        id: typeof id === 'number' ? id : undefined,
        author_id: authorData.author_id,
        author_type: authorData.author_type
      });
    }

    for(var i = 0, l = authorsStore.removed.length; i < l; i++) {
      var data = authorsStore.removed[i].data;
      authors.push({ id: data.id, _deleted: true });
    }

    // signature data

    var signaturesStore = this.getSignaturesStore();
    var signatures = [];
    for (var i = 0, l = signaturesStore.data.length; i < l; i++) {
      var signatureData = signaturesStore.getAt(i).data;
      var id = signatureData.id;
      signatures.push({
        id: typeof id === 'number' ? id : undefined,
        signature_id: signatureData.signature_id,
        signature_type: signatureData.signature_type,
        sign_group: signatureData.sign_group
      });
    }

    for (var i = 0, l = signaturesStore.removed.length; i < l; i++) {
      var data = signaturesStore.removed[i].data;
      signatures.push({ id: data.id, _deleted: true });
    }

    // main model

    var viewModel = this.getViewModel();
    var model = viewModel.getData().doc;
    var id = model.get('id');
    var doc = {
      id: typeof id === 'number' ? id : undefined,
      subject: model.get('subject'),
      status: status,
      body: model.get('body'),
      type_id: model.get('type_id'),
      docdate: model.get('docdate'),
      page_count: model.get('page_count'),
      additions_count: model.get('additions_count'),
      direction: model.get('direction'),
      original_number: model.get('original_number'),
      original_date: model.get('original_date'),
    };
    doc.motions = motions;
    doc.authors = authors;
    doc.signatures = signatures;

    // sending data to server

    Ext.Ajax.request({
      url: '/api/docs/create',
      method: 'POST',
      jsonData: doc,
      success: function(response, opts) {
        var data = JSON.parse(response.responseText);
        if (data.success) {
          editor.fireEvent( 'document-sent', data.document );
        } else {
          Ext.MessageBox.show({
            title: 'შეცდომა',
            msg: data.error,
            buttons: Ext.MessageBox.OK,
            icon: Ext.window.MessageBox.ERROR
          });
        }
      },
    });
  },

  onSendDocument: function(btn, evt) {
    this.sendDocument( btn, 'sent' );
  },

  onSaveDocument: function(btn, evt) {
    this.sendDocument( btn, 'draft' );
  },
});
