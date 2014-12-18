Ext.define('Tel100.view.document.type.AdminPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenttypeadminpanel',

  onTypeSelected: function(model, selected, eOpts) {
    var form = this.getReferences().form;
    var doctype = selected[0];
    form.loadDoctype(doctype);
  },

  onTypeCreated: function(doctype) {
    var grid = this.getReferences().grid;
    grid.refresh();
    grid.setSelection(doctype);
  },

  onTypeUpdated: function(doctype) {
    var grid = this.getReferences().grid;
    var store = grid.getStore();
    var idx = store.indexOf(doctype);
    if (idx !== -1) {
      store.getAt(idx).load();
    }
  },

  onTypeDeleted: function(doctype) {
    var grid = this.getReferences().grid;
    var store = grid.getStore();
    var idx = store.indexOf(doctype);
    if (idx !== -1) {
      store.removeAt();
    }
  }
});
