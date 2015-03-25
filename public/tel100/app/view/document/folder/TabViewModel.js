/*
 * File: app/view/document/folder/TabViewModel.js
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

Ext.define('Tel100.view.document.folder.TabViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentfoldertab',

  requires: [
    'Ext.data.Store',
    'Ext.data.proxy.Rest',
    'Ext.data.field.Field'
  ],

  stores: {
    documentStore: {
      model: 'Tel100.model.folder.Document'
    },
    standardfolders: {
      autoLoad: true,
      model: 'Tel100.model.folder.Standard'
    },
    substitudeStore: {
      autoLoad: true,
      proxy: {
        type: 'rest',
        url: '/api/vacation/substitudes'
      },
      fields: [
        {
          name: 'id'
        },
        {
          name: 'substitude_type'
        },
        {
          calculate: function(data) {
            return data.first_name + " " + data.last_name;
          },
          name: 'name'
        },
        {
          name: 'first_name'
        },
        {
          name: 'last_name'
        },
        {
          name: 'userid'
        }
      ]
    }
  }

});