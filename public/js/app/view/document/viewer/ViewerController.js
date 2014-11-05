Ext.define('Telasi.view.document.viewer.ViewerController', {
  extend : 'Ext.app.ViewController',
  alias: 'controller.viewerController',
  control: {
    'document-viewer-motiontree': {
      itemclick: function(tree, record, item, index, e, eOpts) {
        var motionDetailPanel = tree.up('document-viewer-viewer').down('#motionDetails');
      }
    },
  },
});
