Ext.define('Tel100.view.workarea.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.workareapanel',

  setCurrentApplication: function(name, opts) {
    if (opts && opts.toggleButton) {
      var view = this.getView();
      var applicationButton = view.down('#' + name);
      if (!applicationButton) {
        applicationButton = view.down('#tel100');
        name = 'tel100';
      }
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
