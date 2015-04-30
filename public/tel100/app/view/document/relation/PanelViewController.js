/*
 * File: app/view/document/relation/PanelViewController.js
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

Ext.define('Tel100.view.document.relation.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentrelationpanel',

  onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var dm = this.getView().up('documentmain');
    var doc = Ext.create('Tel100.model.document.Base',{id: record.get('related_id')});
    doc.load({
      success: function(document){
        dm.getController().openDocument(doc);
      }
    });
  }

});
