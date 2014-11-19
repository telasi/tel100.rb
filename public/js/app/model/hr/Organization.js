Ext.define('Telasi.model.hr.Organization', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'parent_id', type: 'int' },
    { name: 'saporg_id', type: 'int' },
    { name: 'saporg_type', type: 'string' },
    { name: 'is_active', type: 'int' },
    { name: 'is_manager', type: 'int' },
    { name: 'name_ka', type: 'string' },
    { name: 'name_ru', type: 'string' },
    { name: 'name_en', type: 'string' },
    { name: 'has_user', type: 'boolean' },
    {
      name: 'name',
      type: 'string',
      calculate: function(data) {
        return data.name_ka;
      }
    },
  ],
});
