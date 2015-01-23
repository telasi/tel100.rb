/*
 * File: app/store/hr/Structure.js
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

Ext.define('Tel100.store.hr.Structure', {
  extend: 'Ext.data.TreeStore',

  requires: [
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'hr.Structure',
      autoLoad: false,
      proxy: {
        type: 'ajax',
        url: '/api/hr/structure',
        reader: {
          type: 'json',
          typeProperty: 'ext_type'
        }
      }
    }, cfg)]);
  }
});