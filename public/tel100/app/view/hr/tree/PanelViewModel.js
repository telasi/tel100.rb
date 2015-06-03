Ext.define('Tel100.view.hr.tree.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.hrtreepanel',

  stores: {
    structure: {
      type: 'tree',
      autoLoad: false,
      root: { },

      proxy: {
        type: 'ajax',
        url: '/api/hr/structure',
        reader: {
          type: 'json',
          typeProperty: 'ext_type'
        }
      },

      fields: [ 'name' ]
    }
  }
});
