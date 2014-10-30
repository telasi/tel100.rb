Ext.define('Telasi.view.document.editor.EditorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditor',

  onSendDocument: function(btn, evt) {
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
      });
    }

    // main model

    var viewModel = this.getViewModel();
    var model = viewModel.getData().doc;
    var doc = {
      subject: model.get('subject'),
      body: model.get('body'),
      type_id: model.get('type_id'),
      page_count: model.get('page_count'),
      additions_count: model.get('additions_count'),
      due_date: model.get('due_date'),
      alert_date: model.get('alert_date'),
      direction: model.get('direction'),
    };
    doc.motions = motions;

    // sending data to server

    Ext.Ajax.request({
      url: '/api/docs/documents/create',
      method: 'POST',
      jsonData: doc,
      success: function(response) {
        console.log(response);
      },
    });
  },
});
