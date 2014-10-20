Ext.define('Telasi.model.document.Type', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'order_by', type: 'int' },
    { name: 'name_ka', type: 'string' },
    { name: 'name_ru', type: 'string' },
    { name: 'name_en', type: 'string' },
    {
      name: 'name',
      type: 'string',
      calculate: function(data) {
        return data.name_ka;
      }
    }
  ],
});
