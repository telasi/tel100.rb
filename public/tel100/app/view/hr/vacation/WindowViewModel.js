/*
 * File: app/view/hr/vacation/WindowViewModel.js
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

Ext.define('Tel100.view.hr.vacation.WindowViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.hrvacationwindow',

  requires: [
    'Ext.data.Store',
    'Ext.data.field.Field'
  ],

  data: {
    substitude: null
  },

  stores: {
    types: {
      autoLoad: true,
      model: 'Tel100.model.hr.vacation.Type'
    },
    defaults: {
      autoLoad: true,
      model: 'Tel100.model.hr.vacation.Defaults',
      listeners: {
        load: 'onLoad'
      }
    },
    substitude_type: {
      data: [
        {
          id: '1',
          name: '{i18n.vacation.substitude_type.none.title}',
          explain: '{i18n.vacation.substitude_type.none.explain}'
        },
        {
          id: '2',
          name: '{i18n.vacation.substitude_type.all.title}',
          explain: '{i18n.vacation.substitude_type.all.explain}'
        },
        {
          id: '3',
          name: '{i18n.vacation.substitude_type.new.title}',
          explain: '{i18n.vacation.substitude_type.new.explain}'
        },
        
      ],
      fields: [
        {
          name: 'id'
        },
        {
          name: 'name'
        },
        {
          name: 'explain'
        }
      ]
    },
    salary_type: {
      data: [
        {
          id: 0,
          name: '0%'
        },
        {
          id: 15,
          name: '15%'
        },
        {
          id: 30,
          name: '30%'
        }
      ],
      fields: [
        {
          name: 'id'
        },
        {
          name: 'name'
        }
      ]
    }
  }

});