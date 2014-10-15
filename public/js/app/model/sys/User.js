Ext.define('Telasi.model.sys.User', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'username', type: 'string' },
    { name: 'firstNameKa', type: 'string' },
    { name: 'firstNameRu', type: 'string' },
    { name: 'firstNameEn', type: 'string' },
    { name: 'lastNameKa', type: 'string' },
    { name: 'lastNameRu', type: 'string' },
    { name: 'lastNameEn', type: 'string' },
    { name: 'personId', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'emailConfirmed', type: 'boolean' },
    { name: 'mobile', type: 'string' },
    { name: 'mobileConfirmed', type: 'boolean' },
    {
      name: 'firstName',
      type: 'string',
      calculate: function(data) {
        return data.firstNameKa;
      }
    },
    {
      name: 'lastName',
      type: 'string',
      calculate: function(data) {
        return data.lastNameKa;
      }
    },
    {
      name: 'fullName',
      calculate: function(data) {
        return data.firstName + ' ' + data.lastName;
      },
    }
  ],
});
