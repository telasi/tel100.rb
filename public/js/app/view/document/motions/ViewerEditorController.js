Ext.define('Telasi.view.document.motions.ViewerEditorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.document-motionvieweditor-controller',

  refresh: function() {
    var doc = this.getViewModel().getData().doc;
    var view = this.getView();
    view.setLoading(true);

    Ext.Ajax.request({
      url: '/api/docs/sender_motions',
      method: 'GET',
      params: { id: doc.id, flat: 'true', role: 'assignee' },

      success: function(response, opts) {
        view.setLoading(false);
        var data = JSON.parse(response.responseText);
        if (data.success === false) {
          Telasi.errorDialog( data.error );
        } else {
          var grid = view.down('document-motions-grid');
          grid.getStore().loadRawData(data);
        }
      },

      failure: function() {
        Telasi.errorDialog( 'სერვერის შეცდომა' );
        view.setLoading(false);
      },
    });
  },
});
