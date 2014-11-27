Ext.define('Telasi.view.document.motions.TreeController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.document-motiontree-controller',

  refresh: function() {
    var doc = this.getViewModel().getData().doc;
    var view = this.getView();
    view.setLoading(true);

    Ext.Ajax.request({
      url: '/api/docs/motions',
      method: 'GET',
      params: { id: doc.id },

      success: function(response, opts) {
        view.setLoading(false);
        var data = JSON.parse(response.responseText);
        if (data.success === false) {
          Ext.MessageBox.show({
            title: 'შეცდომა',
            msg: data.error,
            buttons: Ext.MessageBox.OK,
            icon: Ext.window.MessageBox.ERROR
          });
        } else {
          view.getStore().loadRawData(data);
        }
      },

      failure: function() {
        Ext.MessageBox.show({
          title: 'შეცდომა',
          msg: 'სერვერის შეცდომა',
          buttons: Ext.MessageBox.OK,
          icon: Ext.window.MessageBox.ERROR
        });
        view.setLoading(false);
      },
    });
  },
});
