/*
 * File: app/view/hr/tree/PanelViewController.js
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

Ext.define('Tel100.view.hr.tree.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.hrtreepanel',

  onTreepanelBeforeLoad: function(store, operation, eOpts) {
    this.getView().setLoading(true);
  },

  onTreepanelLoad: function(treestore, records, successful, operation, node, eOpts) {
    this.getView().setLoading(false);
  },

  onRefresh: function(tool, e, owner, eOpts) {
    this.getView().refresh();
  }

});
