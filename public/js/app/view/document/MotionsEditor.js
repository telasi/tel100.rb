Ext.define('Telasi.view.document.MotionsEditor', {
  extend: 'Ext.form.Panel',
  xtype: 'documentMotionsEditor',
  controller: 'motionsEditorController',
  requires: [
    'Telasi.view.document.MotionsEditorController'
  ],
  border: false,
  autoScroll: true,
  items: [{
    xtype: 'button',
    text: 'dump'
  }, ],
  dockedItems: [{
    dock: 'top',
    xtype: 'toolbar',
    border: false,
    items: [{
      xtype: 'splitbutton',
      html: '<i class="fa fa-user"></i> თანამშრომელი',
      handler: 'onNewEmployee',
      menu: [{
        text: 'სტრუქტურული ერთეული',
        handler: 'onNewOrganization',
      }, {
        text: 'გარე ორგანიზაცია / აბონენტი',
        handler: 'onNewContact',
      }]
    }]
  }]
});
