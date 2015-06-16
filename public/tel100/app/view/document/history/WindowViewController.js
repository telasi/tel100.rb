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

    
  }

});
