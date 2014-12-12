/*
 * File: app/view/document/grid/PanelViewController.js
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

Ext.define('Tel100.view.document.grid.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentgridpanel',

  refresh: function() {
    this.getView().getStore().load();
  },

  onBeforeRender: function(component, eOpts) {
    this.refresh();
  },

  onRefresh: function(tool, e, owner, eOpts) {
    this.refresh();
  },

  onDoubleClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    this.getView().fireEvent('opendocument', record);
  }

});
