/*
 * File: app/model/party/Favourites.js
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

Ext.define('Tel100.model.party.Favourites', {
  extend: 'Ext.data.Model',

  requires: [
    'Tel100.model.Tel100',
    'Ext.data.proxy.Rest',
    'Ext.data.field.Field'
  ],

  schema: 'tel100',

  proxy: {
    type: 'rest',
    url: '/api/party/favourites'
  },

  fields: [
    {
      name: 'id'
    },
    {
      name: 'person_id'
    },
    {
      name: 'person_type'
    },
    {
      name: 'name'
    },
    {
      calculate: function(data) {
        return helpers.party.convertTypeToExt(data.person_type);
      },
      name: 'ext_type'
    }
  ],

  toHtml: function() {
    return this.get('name');
  }

});