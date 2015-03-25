/*
 * File: app/model/hr/party.js
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

Ext.define('Tel100.model.hr.party', {
  extend: 'Ext.data.Model',

  requires: [
    'Tel100.model.Tel100',
    'Ext.data.proxy.Rest',
    'Ext.data.reader.Json'
  ],

  schema: 'tel100',

  proxy: {
    type: 'rest',
    extraParams: {
      name: ''
    },
    url: '/api/hr/party/list',
    reader: {
      type: 'json',
      rootProperty: 'data'
    }
  }
});