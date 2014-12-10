/*
 * File: app/store/document/Base.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
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

Ext.define('Tel100.store.document.Base', {
  extend: 'Ext.data.Store',

  requires: [
    'Tel100.model.document.Base',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'document.Base',
      model: 'Tel100.model.document.Base',
      proxy: {
        type: 'ajax',
        url: '/api/docs',
        reader: {
          type: 'json'
        }
      }
    }, cfg)]);
  }
});