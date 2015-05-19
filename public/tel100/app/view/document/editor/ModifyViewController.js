Ext.define('Tel100.view.document.editor.ModifyViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditormodify',

  onBeforeRender: function(component, eOpts) {
    var view = this.getView();
    var vm = this.getViewModel();

    var bodyText = component.down('#documentBody');
    var doc = vm.get('document');
    bodyText.setValue(doc.get('body'));

    // setting files as editable
    var filesPanel = view.down('#files');
    filesPanel.setEditable(true);
  },

  onCancelClick: function(component, eOpts){
    var view = this.getView();
    var vm = this.getViewModel();
    var document = vm.get('document');

    helpers.api.document.edit.purge(document.id);

    component.up('window').destroy();
  },

  onSaveClick: function(component, eOpts){
    var view = this.getView();
    var vm = this.getViewModel();
    var document = vm.get('document');
    
    var changes = document.getChanges();

    var vm = this.getView().down('documentmotionsassigneemodifypanel');
    var st = vm.getViewModel().getStore('motions');

    var motions = [];

    st.each(function(record){
      if (record.get('temp') || record.get('deleted')){
        var motionid = null;
        if(record.get('deleted')){ motionid = record.get('id'); }
        var receiver = record.get('receiver');
        motions.push({ id:            motionid,
                       receiver_id:   receiver.id,
                       receiver_type: receiver.ext_type,
                       motion_text:   record.get('motion_text'),
                       send_type_id:  record.get('send_type_id'),
                       due_date:      record.get('due_date'),
                       deleted:       record.get('deleted'),
                       temp:          record.get('temp') })
      }
    });

    changes.motions = Ext.encode(motions);

    helpers.api.document.edit.edit(document.id, {
        params: changes,
        success: function() {
          document.commit(true);
          component.up('window').destroy();
        }.bind(this),
        failure: function() {
          console.log('failed to save document');
        }
    });
  }

});
