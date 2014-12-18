Ext.define('Tel100.view.document.type.form.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenttypeformpanel',

  requires: [
    'Tel100.model.document.Type'
  ],

  loadDoctype: function(doctype) {
    if (doctype) {
      if (!doctype.phantom) {
        Helpers.loadModel('doctype', doctype, this.getViewModel());
      } else {
        this.getViewModel().set('doctype', doctype);
      }
    }
  },

  onSave: function() {
    var self = this;
    var type = self.getViewModel().get('doctype');
    if (type && type.save) {
      var newMode = type.phantom;
      var view = self.getView();
      view.setLoading(true);
      type.save({
        callback: function(records, operation, success) {
          view.setLoading(false);
          if (success) {
            view.fireEvent(newMode ? 'typecreated' : 'typeupdated', records);
          }
        }
      });
    }
  },

  onDelete: function() {
    var self = this;
    var type = self.getViewModel().get('doctype');
    if (type && !type.phantom) {
      if (confirm(Helpers.i18n().actions.confirm_delete)) {
        var view = self.getView();
        view.setLoading(true);
        type.erase({
          callback: function(records, operation, success) {
            view.setLoading(false);
            if (success) {
              view.fireEvent('typedeleted', type);
              self.onNew();
            }
          }
        });
      }
    }
  },

  onNew: function(tool, e, owner, eOpts) {
    this.loadDoctype(Ext.create('Tel100.model.document.Type'));
  }

});
