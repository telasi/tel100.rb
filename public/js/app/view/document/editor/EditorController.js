Ext.define('Telasi.view.document.editor.EditorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditor',

  init: function() {
    var doc = this.getViewModel().getData().doc;
    var self = this;
    if ( typeof doc.getId() === 'number' ) {
      Ext.Ajax.request({
        url: '/api/docs/documents/motions',
        method: 'GET',
        params: { flat: 'true', id: doc.getId() },
        success: function(data) {
          var motionsStore = self.getMotionsStore();
          console.log(JSON.parse(data.responseText));
          motionsStore.add(JSON.parse(data.responseText));
        }
      });
    }
  },

  getMotionsGrid: function() { return this.getView().down('document-motions-grid'); },
  getMotionsStore: function() { return this.getMotionsGrid().getStore(); },

  sendDocument: function(btn, status) {
    var editor = btn.up('document-editor');

    // motions data

    var motionsStore = this.getMotionsStore();
    var motions = [];
    for (var i = 0, l = motionsStore.data.length; i < l; i++) {
      var motionData = motionsStore.getAt(i).data;
      // console.log(motionData);
      var receiver_id = motionData.id;
      var receiver_type;
      if (receiver_id.charAt(0) === 'P') {
        receiver_id = receiver_id.substring(1);
        receiver_type = 'HR::Employee';
      } else {
        receiver_type = 'HR::Organization';
      }
      motions.push({
        receiver_id: receiver_id,
        receiver_type: receiver_type,
        motion_text: motionData.motion_text,
        due_date: motionData.due_date
      });
    }

    // main model

    var viewModel = this.getViewModel();
    var model = viewModel.getData().doc;
    var doc = {
      id: model.get('id'),
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
      url: '/api/docs/documents/create',
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
