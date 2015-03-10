/*
 * File: app/view/document/motions/TreeViewModel.js
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

Ext.define('Tel100.view.document.motions.TreeViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionstree',

  requires: [
    'Ext.data.TreeStore',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json',
    'Ext.data.field.Field',
    'Ext.app.bind.Formula'
  ],

  data: {
    selection: null
  },

  stores: {
    motions: {
      type: 'tree',
      rootVisible: true,
      root: {
        expanded: true
      },
      proxy: {
        type: 'ajax',
        extraParams: {
          document_id: 31
        },
        url: '/api/documents/motion/tree',
        reader: {
          type: 'json'
        }
      },
      fields: [
        {
          name: 'id'
        },
        {
          name: 'sender'
        },
        {
          name: 'receiver'
        },
        {
          name: 'status'
        },
        {
          name: 'ordering'
        }
      ]
    }
  },
  formulas: {
    disableProperties: function(get) {
      return !get('selection');
    }
  }

});