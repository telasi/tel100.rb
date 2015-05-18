Ext.define('Tel100.view.document.MainViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmain',

  data: {
    selection: null,
    customfolderselection: null
  },

  formulas: {
    deleteDraftButtonDisabled: function(get) {
      var selection = get('selection');
      if (this.getData().customfolderselection){
        return false;
      } else {
        if (selection) {
          var status = selection.get('status');
          return status !== helpers.document.status.DRAFT;
        } else {
          return true;
        }
      }
    }
  }
});
