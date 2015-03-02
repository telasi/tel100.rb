/*
 * File: app/view/workarea/PanelViewController.js
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

Ext.define('Tel100.view.workarea.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.workareapanel',

  setCurrentApplication: function(name, opts) {
    if (opts && opts.toggleButton) {
      var applicationButton = this.getView().down('#' + name);
      applicationButton.toggle();
    }
    if (opts && opts.switchApplication) {
      var modulesContainer = this.getView().down('#body-layout');
      modulesContainer.setActiveItem(name);
    }
    helpers.preferences.setValue('current-application', name);
  },

  onToggle: function(segmentedbutton, button, isPressed, eOpts) {
    this.setCurrentApplication(button.itemId, { switchApplication: true });
  },

  onBeforeRender: function(component, eOpts) {
    var currApplication = helpers.preferences.getValue('current-application', 'docs');
    this.setCurrentApplication(currApplication, { toggleButton: true, switchApplication: true });
  }

});
