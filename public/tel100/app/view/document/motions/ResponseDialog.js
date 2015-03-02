/*
 * File: app/view/document/motions/ResponseDialog.js
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

Ext.define('Tel100.view.document.motions.ResponseDialog', {
  extend: 'Ext.window.Window',
  alias: 'widget.documentmotionsresponsedialog',

  requires: [
    'Tel100.view.document.motions.ResponseDialogViewModel',
    'Tel100.view.document.motions.ResponsePanel',
    'Ext.container.Container'
  ],

  viewModel: {
    type: 'documentmotionsresponsedialog'
  },
  height: 300,
  width: 500,
  autoDestroy: false,
  layout: 'fit',
  closeAction: 'hide',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.motion.respond}'
  },
  items: [
    {
      xtype: 'documentmotionsresponsepanel',
      listeners: {
        cancelcomment: 'onContainerCancelcomment',
        commentsent: 'onContainerCommentsent'
      }
    }
  ],

  onContainerCancelcomment: function(container) {
    this.close();
  },

  onContainerCommentsent: function(container) {
    this.close();
    this.fireEvent('commentsent');
  }

});