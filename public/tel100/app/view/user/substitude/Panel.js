/*
 * File: app/view/user/substitude/Panel.js
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

Ext.define('Tel100.view.user.substitude.Panel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.usersubstitudepanel',

  requires: [
    'Tel100.view.user.substitude.PanelViewModel',
    'Tel100.view.user.substitude.PanelViewController',
    'Ext.button.Button'
  ],

  controller: 'usersubstitudepanel',
  viewModel: {
    type: 'usersubstitudepanel'
  },
  shadow: 'drop',
  shadowOffset: 20,
  cls: 'floating-substitude-top',
  floating: true,
  height: 26,
  html: 'asadasdasds',
  width: 500,
  layout: 'border',
  bodyPadding: 3,
  bodyStyle: {
    'background-color': 'red',
    color: 'white',
    'text-align': 'center'
  },
  header: false,

  items: [
    {
      xtype: 'button',
      region: 'east',
      padding: 0,
      width: 20,
      text: 'X',
      listeners: {
        click: 'onButtonClick'
      }
    }
  ]

});