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
          var signaturesStore = self.getSignaturesStore();
          var motionsStore = self.getMotionsStore();
          var motions = JSON.parse(data.responseText);
          var signatures = motions.filter(function(val){ return val.receiver_role !== 'assignee'; });
          var assignees  = motions.filter(function(val){ return val.receiver_role === 'assignee'; });
          signaturesStore.add( signatures );
          motionsStore.add( assignees );
        }
      });
    }
  },

  getMotionsGrid:  function() { return this.getView().down('document-motions-grid'); },
  getMotionsStore: function() { return this.getMotionsGrid().getStore(); },
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
        due_date: motionData.due_date,
        ordering: motionData.ordering,
        motion_text: motionData.motion_text,
        receiver_id: motionData.receiver_id,
        receiver_type: motionData.receiver_type,
        receiver_role: motionData.receiver_role
      });
    }

    for(var i = 0, l = motionsStore.removed.length; i < l; i++) {
      var data = motionsStore.removed[i].data;
      motions.push({ id: data.id, _deleted: true });
    }

    // XXX: signature data

    var signaturesStore = this.getSignaturesStore();
    for (var i = 0, l = signaturesStore.data.length; i < l; i++) {
      var signatureData = signaturesStore.getAt(i).data;
      var id = signatureData.id;
      motions.push({
        id: typeof id === 'number' ? id : undefined,
        receiver_id: signatureData.receiver_id,
        receiver_type: signatureData.receiver_type,
        receiver_role: signatureData.receiver_role,
        ordering: signatureData.ordering
      });
    }

    for (var i = 0, l = signaturesStore.removed.length; i < l; i++) {
      var data = signaturesStore.removed[i].data;
      motions.push({ id: data.id, _deleted: true });
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
    this.sendDocument( btn, Telasi.statuses.current );
  },

  onSaveDocument: function(btn, evt) {
    this.sendDocument( btn, Telasi.statuses.draft );
  },
});
