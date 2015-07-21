Ext.define('Tel100.view.document.folder.TabViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentfoldertab',

  stores: {
    documentStore: {
      model: 'Tel100.model.folder.Document'
    },

    standardfolders: {
      autoLoad: true,
      model: 'Tel100.model.folder.Standard',
      listeners: {
        load: 'onStandardFoldersLoaded'
      }
    },

    substitudeStore: {
      autoLoad: false,
      proxy: {
        type: 'rest',
        url: '/api/vacation/substitudes'
      },
      fields: [
        {
          name: 'id'
        },
        {
          name: 'substitude_type'
        },
        {
          calculate: function(data) {
            return data.first_name + " " + data.last_name;
          },
          name: 'name'
        },
        {
          name: 'first_name'
        },
        {
          name: 'last_name'
        },
        {
          name: 'userid'
        }
      ]
    }
  }
});
