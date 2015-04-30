/*
 * File: app/view/document/relation/PanelViewModel.js
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

Ext.define('Tel100.view.document.relation.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentrelationpanel',

  requires: [
    'Ext.data.Store',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json',
    'Ext.app.bind.Formula'
  ],

  data: {
    relationCount: 0,
    editable: false
  },

  stores: {
    relations: {
      listeners: {
        load: function() {
          this.viewModel.set('relationCount', this.getTotalCount());
        },
        
      },
      autoLoad: true,
      model: 'Tel100.model.document.Base',
      proxy: {
        type: 'ajax',
        extraParams: {
          base_id: '{document.id}'
        },
        url: '/api/documents/relations',
        reader: {
          type: 'json'
        }
      }
    }
  },
  formulas: {
    notEditable: function(get) {
      return !get('editable');
    }
  }

});