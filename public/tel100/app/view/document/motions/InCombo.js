/*
 * File: app/view/document/motions/InCombo.js
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

Ext.define('Tel100.view.document.motions.InCombo', {
  extend: 'Ext.form.field.ComboBox',
  alias: 'widget.documentmotionsincombo',

  requires: [
    'Tel100.view.document.motions.InComboViewModel'
  ],

  viewModel: {
    type: 'documentmotionsincombo'
  },
  editable: false,
  displayField: 'senderName',
  valueField: 'id',

  bind: {
    store: '{motions}'
  }

});