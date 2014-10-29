Ext.define('Telasi.view.document.editor.EditorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditor',

  onSendDocument: function(btn, evt) {
    // motions data

    var motionsGrid = this.getView().down('document-motions-grid');
    var motionsStore = motionsGrid.getStore();
    var motions = [];
    for (var i = 0, l = motionsStore.data.length; i < l; i++) {
      motions.push(motionsStore.getAt(i).data);
    }

    // main model

    var viewModel = this.getViewModel();
    var model = viewModel.getData().doc;
    var doc = {
      subject: model.get('subject'),
      body: model.get('body'),
      typeId: model.get('typeId'),
      language: model.get('language'),
      docnumber: model.get('docnumber'),
      pageCount: model.get('pageCount'),
      additionsCount: model.get('additionsCount'),
      dueDate: model.get('dueDate'),
      alertDate: model.get('alertDate'),
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
