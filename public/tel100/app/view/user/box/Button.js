/*
 * File: app/view/user/box/Button.js
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

Ext.define('Tel100.view.user.box.Button', {
  extend: 'Ext.button.Button',
  alias: 'widget.userboxbutton',

  requires: [
    'Tel100.view.user.box.ButtonViewModel',
    'Tel100.view.user.box.ButtonViewController',
    'Ext.menu.Menu',
    'Ext.menu.Separator'
  ],

  controller: 'userboxbutton',
  viewModel: {
    type: 'userboxbutton'
  },

  bind: {
    text: '<i class="fa fa-user"></i> {currentUser.full_name}'
  },
  menu: {
    xtype: 'menu',
    items: [
      {
        xtype: 'menuitem',
        bind: {
          text: '{i18n.user.ui.profile}'
        }
      },
      {
        xtype: 'menuseparator'
      },
      {
        xtype: 'menuitem',
        bind: {
          text: '{i18n.user.ui.logout}'
        },
        listeners: {
          click: 'onLogout'
        }
      }
    ]
  }

});