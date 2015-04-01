/*
 * File: app/view/document/motions/ResultPanelViewModel.js
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

Ext.define('Tel100.view.document.motions.ResultPanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsresultpanel',

  requires: [
    'Ext.data.Store',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json',
    'Ext.app.bind.Formula'
  ],

  data: {
    motionId: null,
    isResult: false,
    categoryId: null,
    text: null,
    
  },

  stores: {
    motions: {
      autoLoad: true,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          mode: 'in',
          document_id: '{document.id}'
        },
        url: '/api/documents/motion',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        load: 'onMotionsStoreLoad'
      }
    },
    responseTypes: {
      autoLoad: true,
      model: 'Tel100.model.document.ResponseType',
      proxy: {
        type: 'ajax',
        extraParams: {
          type: 'response'
        },
        url: '/api/documents/response_types',
        reader: {
          type: 'json'
        }
      }
    }
  },
  formulas: {
    hideComplete: function(get) {
      return !get('isResult');
    },
    saveLabel: function(get) {
      return get('isResult') ?
      i18n.document.comment.actions.saveResult :
      i18n.document.comment.actions.saveComment;
    }
  }

});