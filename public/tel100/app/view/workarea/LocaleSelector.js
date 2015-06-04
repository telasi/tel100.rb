Ext.define('Tel100.view.workarea.LocaleSelector', {
  extend: 'Ext.button.Segmented',
  alias: 'widget.workarealocaleselector',

  controller: 'workarealocaleselector',
  viewModel: {
    type: 'workarealocaleselector'
  },

  items: [
    { itemId: 'i18nka', text: 'ქართული' },
    { itemId: 'i18nru', text: 'Русский' }
  ],

  listeners: {
    afterrender: 'onSegmentedbuttonAfterRender',
    toggle: 'onSegmentedbuttonToggle'
  }
});

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
      var i18n =  window[newLocale];
      this.getView().up('#main-viewport').getViewModel().set('i18n', i18n);
      window.i18n = i18n;
    }
  }

});

Ext.define('Tel100.view.workarea.LocaleSelectorViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.workarealocaleselector'
});
