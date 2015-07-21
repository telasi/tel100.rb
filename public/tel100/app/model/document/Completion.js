Ext.define('Tel100.model.document.Completion', {
  extend: 'Ext.data.Model',
  schema: 'tel100',

  fields: ['id', {
    calculate: function(data) {
      return i18n.document.base.completion[data.id];
    },
    name: 'name'
  }]
});
