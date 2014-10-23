Ext.define('Telasi.view.document.MotionsEditorController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.motionsEditorController',
  requires: [
    'Telasi.view.document.Editor',
    'Telasi.model.document.Base'
  ],

  onNewEmployee: function() {
    console.log( 'onNewEmployee' );
    var hrForm = Ext.create('Telasi.view.common.hr.HRChoseForm');
    hrForm.modal = true;
    hrForm.show();
  },

  onNewOrganization: function() {
    console.log( 'onNewOrganization' );
  },

  onNewContact: function() {
    console.log( 'onNewContact' );
  },
});
