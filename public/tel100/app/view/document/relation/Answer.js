Ext.define('Tel100.view.document.relation.Answer', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentrelationanswer',

  controller: 'documentrelationanswer',
  viewModel: {
    type: 'documentrelationanswer'
  },

  border: false,
  header: false,
  title: 'My Grid Panel',

  bind: {
    hidden: '{hideAnswers}',
    store: '{answers}'
  },
  columns: [{
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return [value,
      ' ',
      record.get('doctype'),
      '</a>'].join('');
    },
    draggable: false,
    resizable: false,
    sortable: false,
    dataIndex: 'docnumber',
    hideable: false,
    flex: 1,
    bind: {
      text: '{i18n.document.base.answers}'
    }
  }],

  listeners: {
    celldblclick: 'onAnswersGridpanelCellDblClick'
  }
});

Ext.define('Tel100.view.document.relation.AnswerViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentrelationanswer',

  onAnswersGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var dm = this.getView().up('documentmain');
    var doc = Ext.create('Tel100.model.document.Base',{id: record.get('docid')});
    doc.load({
      success: function(document){
        dm.getController().openDocument(doc);
      }
    });
  },

  onStoreLoad: function(store, records, successful, eOpts) {
    var vm = this.getViewModel();
    vm.set('hideAnswers', !store.count());
  }
});

Ext.define('Tel100.view.document.relation.AnswerViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentrelationanswer',

  requires: [
    'Ext.data.Store',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  data: {
    hideAnswers: true
  },

  stores: {
    answers: {
      autoLoad: true,
      model: 'Tel100.model.document.Base',
      proxy: {
        type: 'ajax',
        extraParams: {
          related_id: '{document.id}'
        },
        url: '/api/documents/relations/answer',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        load: 'onStoreLoad'
      }
    }
  }
});
