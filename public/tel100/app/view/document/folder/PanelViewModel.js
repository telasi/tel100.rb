/*
 * File: app/view/document/folder/PanelViewModel.js
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

Ext.define('Tel100.view.document.folder.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentfolderpanel',

  requires: [
    'Ext.data.Store',
    'Ext.data.field.Field'
  ],

  stores: {
    standardfolders: {
      data: [
        {
          name: 'inbox',
          category: 'a'
        },
        {
          name: 'outbox',
          category: 'a'
        },
        {
          name: 'urgent',
          category: 'b'
        }
      ],
      fields: [
        {
          name: 'name'
        },
        {
          name: 'category'
        }
      ]
    },
    customfolders: {
      autoLoad: true,
      model: 'Tel100.model.folder.Base',
      listeners: {
        load: 'onCustomStoreLoad'
      }
    },
    folders: {
      groupField: 'category',
      fields: [
        {
          name: 'name'
        },
        {
          name: 'category'
        }
      ]
    }
  }

});