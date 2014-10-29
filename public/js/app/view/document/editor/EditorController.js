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
      if (receiver_id.charAt(0) == 'P') {
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
      type_id: model.get('typeId'),
      language: model.get('language'),
      docnumber: model.get('docnumber'),
      page_count: model.get('pageCount'),
      additions_count: model.get('additionsCount'),
      due_date: model.get('dueDate'),
      alert_date: model.get('alertDate'),
      direction: model.get('direction'),
    };
    doc.motions = motions;

    // sending data to server

    Ext.Ajax.request({
      url: '/api/docs/documents/create',
      method: 'POST',
      params: doc,
      success: function(response) {
        console.log(response);
      },
    });
  },
});
