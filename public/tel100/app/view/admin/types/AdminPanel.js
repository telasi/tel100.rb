/*
 * File: app/view/admin/types/AdminPanel.js
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

Ext.define('Tel100.view.admin.types.AdminPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.admintypesadminpanel',

  requires: [
    'Tel100.view.admin.types.AdminPanelViewModel',
    'Tel100.view.admin.types.grid.Panel',
    'Ext.grid.Panel'
  ],

  viewModel: {
    type: 'admintypesadminpanel'
  },
  layout: 'border',

  items: [
    {
      xtype: 'admintypesgridpanel',
      region: 'west',
      split: true
    }
  ]

});