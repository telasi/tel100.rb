Ext.define('Tel100.view.document.history.WindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenthistory',

  onCancelClick: function(component, eOpts){
    component.up('window').destroy();
  },

  onChangesSelect: function(rowmodel, record, index, eOpts){
    var st = this.getViewModel().getStore('change');
    st.load({params: { change_no: record.id },
      callback: function(records, operation, success) {
        if(success){
          this.getViewModel().set('change', records[0].data);
        }
      }.bind(this)
    });

    var st = this.getViewModel().getStore('signees');
    st.load({params: { change_no: record.id },
      callback: function(records, operation, success) {
        this.getViewModel().set('signeesCount', records.length);
      }.bind(this)
    });

    var st = this.getViewModel().getStore('assignees');
    st.load({params: { change_no: record.id },
      callback: function(records, operation, success) {
        this.getViewModel().set('assigneesCount', records.length);
      }.bind(this)
    });

    var st = this.getViewModel().getStore('files');
    st.load({params: { change_no: record.id },
      callback: function(records, operation, success) {
        this.getViewModel().set('filesCount', records.length);
      }.bind(this)
    });

  },

  onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var url = '/api/documents/history/files/download?id=' + record.id;
    var tab = window.open(url, 'tel100');
    tab.focus();
  }

});
