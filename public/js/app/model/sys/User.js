Ext.define('Telasi.model.sys.User', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'is_active', type: 'int' },
    { name: 'is_admin', type: 'int' },
    { name: 'username', type: 'string' },
    { name: 'first_name_ka', type: 'string' },
    { name: 'first_name_ru', type: 'string' },
    { name: 'first_name_en', type: 'string' },
    { name: 'last_name_ka', type: 'string' },
    { name: 'last_name_ru', type: 'string' },
    { name: 'last_name_en', type: 'string' },
    { name: 'person_id', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'email_confirmed', type: 'boolean' },
    { name: 'mobile', type: 'string' },
    { name: 'mobile_confirmed', type: 'boolean' },
    {
      name: 'employee',
      convert: function(data) {
        if (data) {  return Ext.create('Telasi.model.hr.Employee', data); }
      },
    },
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
  ],
});
