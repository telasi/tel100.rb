Ext.define('Tel100.model.document.Direction', {
  extend: 'Ext.data.Model',
  schema: 'tel100',

  fields: ['id', {
    calculate: function(data) {
      return i18n.document.base.directions[data.id];
    },
    name: 'name'
  }]
});
