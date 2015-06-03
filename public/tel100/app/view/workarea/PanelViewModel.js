Ext.define('Tel100.view.workarea.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.workareapanel',

  formulas: {
    hideAdmin: function(get) {
      var currentUser = get('currentUser');
      return currentUser.get('is_admin') !== 1;
    }
  }
});
