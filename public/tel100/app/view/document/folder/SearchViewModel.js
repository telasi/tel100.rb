Ext.define('Tel100.view.document.folder.SearchViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentfoldersearch',

  data: {
    showall: false
  },

  stores: {
    types: {
      autoLoad: true,
      model: 'Tel100.model.document.TypeFull'
    },

    standardFolders: {
      autoLoad: true,
      model: 'Tel100.model.folder.Standard'
    },

    states: {
      autoLoad: true,
      model: 'Tel100.model.document.Completion',
      proxy: {
        type: 'memory',
        data: [
          { id: 'current' },
          { id: 'completed' },
          { id: 'canceled' }
        ]
      }
    },

    direction: {
      autoLoad: true,
      model: 'Tel100.model.document.Direction',
      proxy: {
        type: 'memory',
        data: [{
          id: 'inner'
        }, {
          id: 'out'
        }, {
          id: 'in'
        }]
      }
    }
  },

  formulas: {
    hideShowAll: function(get){
      var user = helpers.user.getCurrentUser();
      return !user.get('is_director');
    }
  }
});
