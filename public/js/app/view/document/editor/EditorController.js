Ext.define('Telasi.view.document.editor.EditorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditor',

  sendDocument: function(btn, status) {
    var editor = btn.up('document-editor');

    // motions data

    var motionsGrid = this.getView().down('document-motions-grid');
    var motionsStore = motionsGrid.getStore();
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
      subject: model.get('subject'),
      status: status,
      body: model.get('body'),
      type_id: model.get('type_id'),
      docdate: model.get('docdate'),
      page_count: model.get('page_count'),
      additions_count: model.get('additions_count'),
      direction: model.get('direction'),
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
