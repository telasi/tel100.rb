/*
 * File: app/view/modules/HR.js
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

Ext.define('Tel100.view.modules.HR', {
  extend: 'Ext.container.Container',
  alias: 'widget.moduleshr',

  requires: [
    'Tel100.view.modules.HRViewModel',
    'Tel100.view.modules.HRViewController',
    'Tel100.view.hr.tree.Panel',
    'Ext.tab.Panel',
    'Ext.tab.Tab',
    'Ext.toolbar.Toolbar',
    'Ext.grid.Panel',
    'Ext.grid.column.Date',
    'Ext.grid.View',
    'Ext.tree.Panel'
  ],

  controller: 'moduleshr',
  viewModel: {
    type: 'moduleshr'
  },

  items: [
    {
      xtype: 'tabpanel',
      activeTab: 0,
      items: [
        {
          xtype: 'panel',
          bind: {
            title: '{i18n.vacation.ui.title}'
          },
          dockedItems: [
            {
              xtype: 'toolbar',
              dock: 'top',
              items: [
                {
                  xtype: 'button',
                  bind: {
                    text: '{i18n.vacation.ui.button}'
                  },
                  listeners: {
                    click: 'onButtonClick'
                  }
                }
              ]
            }
          ],
          items: [
            {
              xtype: 'gridpanel',
              title: 'ისტორია',
              bind: {
                store: '{vacationlist}'
              },
              columns: [
                {
                  xtype: 'datecolumn',
                  dataIndex: 'from_date',
                  flex: 2,
                  format: 'd/m/Y',
                  bind: {
                    text: '{i18n.vacation.fields.from}'
                  }
                },
                {
                  xtype: 'datecolumn',
                  dataIndex: 'to_date',
                  flex: 2,
                  format: 'd/m/Y',
                  bind: {
                    text: '{i18n.vacation.fields.to}'
                  }
                },
                {
                  xtype: 'gridcolumn',
                  dataIndex: 'type_name',
                  flex: 10,
                  bind: {
                    text: '{i18n.vacation.fields.type}'
                  }
                },
                {
                  xtype: 'gridcolumn',
                  dataIndex: 'full_name',
                  flex: 10,
                  bind: {
                    text: '{i18n.vacation.fields.substitude}'
                  }
                }
              ]
            }
          ]
        },
        {
          xtype: 'panel',
          title: 'HR Structure',
          items: [
            {
              xtype: 'hrtreepanel'
            }
          ]
        }
      ]
    }
  ]

});