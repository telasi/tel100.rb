/*
 * File: app/model/folder/Base.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Tel100.model.folder.Base', {
  extend: 'Ext.data.Model',

  requires: [
    'Tel100.model.Tel100',
    'Ext.data.proxy.Rest',
    'Ext.data.field.Field'
  ],

  schema: 'tel100',

  proxy: {
    type: 'rest',
    url: '/api/folder'
  },

  fields: [
    {
      name: 'name'
    },
    {
      name: 'category'
    },
    {
      calculate: function(data) {
        return true;
      },
      name: 'custom'
    }
  ]
});