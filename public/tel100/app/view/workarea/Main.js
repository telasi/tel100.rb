/*
 * File: app/view/workarea/Main.js
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

Ext.define('Tel100.view.workarea.Main', {
  extend: 'Ext.container.Container',
  alias: 'widget.workareamain',

  requires: [
    'Tel100.view.workarea.MainViewModel',
    'Tel100.view.workarea.MainViewController',
    'Ext.form.Label'
  ],

  controller: 'workareamain',
  viewModel: {
    type: 'workareamain'
  },

  items: [
    {
      xtype: 'label',
      text: 'My Label'
    },
    {
      xtype: 'label',
      bind: {
        text: '{user.username}'
      }
    }
  ],
  listeners: {
    beforerender: 'onContainerBeforeRender'
  }

});