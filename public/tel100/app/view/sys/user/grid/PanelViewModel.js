Ext.define('Tel100.view.sys.user.grid.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.sysusergridpanel_model',

  requires: [
    'Tel100.model.User'
  ],

  stores: {
    users: {
      autoLoad: true,
      model: 'Tel100.model.User'
    }
  }

});