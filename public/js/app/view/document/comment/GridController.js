Ext.define('Telasi.view.document.comment.GridController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.document-comments-controller',
  requires: [
    'Telasi.model.document.Comment'
  ],

  refresh: function() {
    var doc = this.getViewModel().getData().doc;
    var view = this.getView();
    view.setLoading(true);

    Ext.Ajax.request({
      url: '/api/docs/comments',
      method: 'GET',
      params: { id: doc.id },

      success: function(response, opts) {
        var data = JSON.parse(response.responseText);
        view.setLoading(false);
        var store = Ext.create('Ext.data.Store', {
          fields:[
            { name: 'created_at', type: 'date' },
            'full_name',
            'operation',
            'text'
          ],
          data: data,
          proxy: {
            type: 'memory',
            reader: {
              type: 'json',
              rootProperty: 'items'
            }
          }
        });

        // view.setStore(store);
        // console.log(view.setStore);
        view.setStore(store);
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
