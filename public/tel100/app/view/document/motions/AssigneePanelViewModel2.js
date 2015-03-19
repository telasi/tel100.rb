/*
 * File: app/view/document/motions/AssigneePanelViewModel2.js
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

Ext.define('Tel100.view.document.motions.AssigneePanelViewModel2', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsauthorpanel',

  requires: [
    'Ext.data.Store',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  data: {
    assigneeCount: 0,
    selection: null
  },

  stores: {
    motions: {
      onStoreChanges: function() {
        var store = this;
        this.viewModel.set('assigneeCount', store.getCount());
        this.view.fireEvent('listchanged', store);
      },
      listeners: {
        datachanged: function() {
          this.onStoreChanges();
        }
      },
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          mode: 'out',
          role: 'author',
          document_id: '{document.id}'
        },
        url: '/api/documents/motion',
        reader: {
          type: 'json'
        }
      }
    }
  }

});