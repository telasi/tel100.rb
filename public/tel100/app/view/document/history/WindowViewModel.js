Ext.define('Tel100.view.document.history.WindowViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenthistory',

  data: {
    document: null,
    change: null,
    signeesCount: 0,
    assigneesCount: 0,
    filesCount: 0,
  },

  stores: {
    changes: {
      autoLoad: true,
      model: 'Tel100.model.document.Change',
      proxy: {
      	type: 'ajax',
      	extraParams: {
          id: '{document.id}'
        },
        url: '/api/documents/changes',
        reader: {
          type: 'json'
        }
      }
    },
    change: {
      autoLoad: false,
      model: 'Tel100.model.document.Change',
      proxy: {
      	type: 'ajax',
        url: '/api/documents/changes/show',
        reader: {
          type: 'json'
        }
      }
    },
    signees: {
      autoLoad: false,
      model: 'Tel100.model.document.Motion',
      proxy: {
        type: 'ajax',
        extraParams: {
          role: 'signee',
        },
        url: '/api/documents/changes/motion',
        reader: {
          type: 'json'
        }
      }
     },
     assignees: {
        autoLoad: false,
        model: 'Tel100.model.document.Motion',
        proxy: {
          type: 'ajax',
          extraParams: {
            role: 'assignee',
          },
          url: '/api/documents/changes/motion',
          reader: {
            type: 'json'
          }
        }
     },
     files: {
      autoLoad: false,
      model: 'Tel100.model.document.File',
      proxy: {
          type: 'ajax',
          url: '/api/documents/changes/files',
          reader: {
            type: 'json'
          }
        }
      }
   }

});