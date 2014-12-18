Ext.define('Tel100.model.User', {
  extend: 'Ext.data.Model',

  requires: [
    'Tel100.model.Tel100',
    'Ext.data.field.Integer',
    'Ext.data.field.Boolean',
    'Ext.data.field.String',
    'Ext.data.field.Date'
  ],

  schema: 'tel100schema',

  fields: [{
    name: 'mobile',
  }, {
    name: 'first_name',
  }, {
    name: 'last_name',
  }, {
    name: 'phone',
  }, {
    type: 'string',
    calculate: function(data) {
      var mobile = data.mobile;
      if (mobile && mobile.length === 9) {
        return '(' + mobile.substr(0,3) + ')' + mobile.substr(3,3) + '-' + mobile.substr(6,3);
      }
      return mobile;
    },
    name: 'formatted_mobile'
  }, {
    type: 'string',
    calculate: function(data) {
      var phone = data.phone;
      if (phone && phone.length === 4) {
        return phone.substr(0, 1) + '-' + phone.substr(1);
      } else if (phone && phone.length === 3) {
        return '7-' + phone;
      }
      return phone;
    },
    name: 'formatted_phone'
  }, {
    type: 'string',
    calculate: function(data) {
      return data.first_name + ' ' + data.last_name;
    },
    name: 'full_name'
  }],

  proxy: {
    type: 'rest',
    url: '/api/sys/users'
  }
});
