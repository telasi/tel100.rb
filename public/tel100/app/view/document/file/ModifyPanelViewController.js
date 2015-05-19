Ext.define('Tel100.view.document.file.ModifyPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentfilemodifypanel',

  onFilefieldChange: function(filefield, value, eOpts) {
    if (value) {
      var form = filefield.up('form').getForm();
      var vm = this.getViewModel();
      var view = this.getView();
      var doc = vm.get('document');
      var st = vm.getStore('files');
      form.submit({ url: '/api/documents/filestemp/upload?document_id=' + doc.id,
        success: function() {
          view.refresh();
        }
      });
    }
  },

  onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var url = '/api/documents/filestemp/download?id=' + record.id;
    var tab = window.open(url, 'tel100');
    tab.focus();
  }

});
