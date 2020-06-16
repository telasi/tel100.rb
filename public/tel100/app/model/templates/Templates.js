Ext.define('Tel100.model.templates.Templates', {
  extend: 'Ext.data.Model',

  requires: [
    'Tel100.model.Tel100',
    'Ext.data.proxy.Rest',
    'Ext.data.field.Field'
  ],

  schema: 'tel100',

  proxy: {
    type: 'rest',
    url: '/api/templates'
  },

  fields: [
    {
      name: 'id'
    },
    {
      name: 'name'
    },
    {
      name: 'category'
    },
    {
      name: 'body'
    }
  ],

});