/*
 * File: app/view/workarea/LocaleSelectorViewController.js
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

Ext.define('Tel100.view.workarea.LocaleSelectorViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.workarealocaleselector',

  onSegmentedbuttonAfterRender: function(component, eOpts) {
    var btnId = '#i18n' + helpers.i18n.getCurrentLocale();
    this.getView().down(btnId).toggle();
  },

  onSegmentedbuttonToggle: function(segmentedbutton, button, isPressed, eOpts) {
    var btnId = button.getItemId();
    var newLocale = button.getItemId().substr(4);
    var oldLocale = helpers.i18n.getCurrentLocale();
    if (newLocale != oldLocale) {
      helpers.i18n.setCurrentLocale(newLocale);
      debugger;
      this.getView().up('#main-viewport').getViewModel().set('i18n', window[newLocale]);
    }
  }

});
