/*
 * File: app/view/document/editor/GeneralViewController.js
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

Ext.define('Tel100.view.document.editor.GeneralViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditorgeneral',

  onTypeIdChange: function(field, newValue, oldValue, eOpts) {
    var vm = this.getViewModel();
    var doc = vm.get('document');
    if (doc.dirty) {
      doc.set('type', field.getSelectedRecord());
    }
  }

});
