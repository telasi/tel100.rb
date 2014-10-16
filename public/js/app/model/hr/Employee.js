Ext.define('Telasi.model.hr.Employee', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'is_active', type: 'int' },
    { name: 'person_id', type: 'string' },
    { name: 'first_name_ka', type: 'string' },
    { name: 'first_name_ru', type: 'string' },
    { name: 'first_name_en', type: 'string' },
    { name: 'last_name_ka', type: 'string' },
    { name: 'last_name_ru', type: 'string' },
    { name: 'last_name_en', type: 'string' },
    {
      name: 'firstName',
      type: 'string',
      calculate: function(data) {
        return data.first_name_ka;
      }
    },
    {
      name: 'lastName',
      type: 'string',
      calculate: function(data) {
        return data.last_name_ka;
      }
    },
    {
      name: 'fullName',
      calculate: function(data) {
        return data.firstName + ' ' + data.lastName;
      },
    },
    {
      name: 'personNumber',
      calculate: function(data) {
        return '0' + data.person_id;
      }
    }
  ],
});
