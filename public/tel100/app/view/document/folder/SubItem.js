/*
 * File: app/view/document/folder/SubItem.js
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

Ext.define('Tel100.view.document.folder.SubItem', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentfoldersubitem',

  requires: [
    'Tel100.view.document.folder.SubItemViewModel'
  ],

  viewModel: {
    type: 'documentfoldersubitem'
  },
  height: 250,
  width: 400,

  bind: {
    title: '{subitem.title}'
  }

});