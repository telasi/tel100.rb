Ext.define('Telasi.view.document.viewer.Detail', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-viewer-detail',
  layout: 'accordion',
  bodyPadding: 0,

  requires: [
     'Telasi.view.document.viewer.MotionPanel',
  ],

  items: [{
      xtype: 'document-viewer-motionpanel',
      title: '<i class="fa fa-random"></i> დოკუმენტის მოძრაობა',
  }]
});
