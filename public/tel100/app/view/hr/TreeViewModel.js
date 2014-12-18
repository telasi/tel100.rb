Ext.define('Tel100.view.hr.TreeViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.hrtree',

  requires: [
    'Ext.data.Store',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json',
    'Ext.data.field.Field'
  ],

  stores: {
    hrstructure: {
      type: 'tree',
      autoLoad: true,
      fields: [ 'name' ],
      root: { expanded: true },
      proxy: {
        type: 'ajax',
        url: '/api/hr/structure',
        reader: {
          type: 'json',
          typeProperty: 'ext_type'
        }
      }
    }
  }
});
