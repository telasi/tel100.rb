Ext.define('Tel100.view.document.editor.ModifyViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditormodify',

  onBeforeRender: function(component, eOpts) {
    var view = this.getView();
    var vm = this.getViewModel();

    // var bodyText = component.down('#documentBody');
    // var doc = vm.get('document');
    // bodyText.setValue(doc.get('body'));

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
    var me = this;
    var view = this.getView();
    var vm = this.getViewModel();
    var document = vm.get('document');
    
    var changes = document.getChanges();

    files_dirty = false

    var view = this.getView().down('documentfilemodifypanel');
    var st_temp = view.getViewModel().getStore('filestemp');
    files_dirty = st_temp.getCount() > 0;

    var st = view.getViewModel().getStore('files');

    files = [];

    st.each(function(record){
      if(record.get('deleted')){
        files_dirty = true;
        files.push({ id: record.id, delete: true });
      }
    });

    var view = this.getView().down('documentmotionsauthormodifypanel');
    var st = view.getViewModel().getStore('motions');

    var motions = [];
    var authorCount = 1;

    st.each(function(record){
      if (record.get('temp') || record.get('deleted')){

        if(record.get('temp')){
          authorCount++;
        };
        if(record.get('deleted')){
          authorCount--;
        };

        var motionid = null;
        if(record.get('deleted')){ motionid = record.get('id'); }
        var receiver = record.get('receiver');
        motions.push({ id:            motionid,
                       receiver_id:   receiver.id,
                       receiver_type: receiver.ext_type,
                       receiver_role: 'author',
                       motion_text:   record.get('motion_text'),
                       send_type_id:  record.get('send_type_id'),
                       due_date:      record.get('due_date'),
                       deleted:       record.get('deleted'),
                       temp:          record.get('temp') })
      }
    });

    if(authorCount !== 1 ){
      Ext.MessageBox.alert('Error', i18n.document.base.errors.author_count, function(){
        return true;
      });
      return;
    };

    var view = this.getView().down('documentmotionsassigneemodifypanel');
    var st = view.getViewModel().getStore('motions');

    st.each(function(record){
      if (record.get('temp') || record.get('deleted')){
        var motionid = null;
        if(record.get('deleted')){ motionid = record.get('id'); }
        var receiver = record.get('receiver');
        motions.push({ id:            motionid,
                       receiver_id:   receiver.id,
                       receiver_type: receiver.ext_type,
                       receiver_role: 'assignee',
                       motion_text:   record.get('motion_text'),
                       send_type_id:  record.get('send_type_id'),
                       due_date:      record.get('due_date'),
                       deleted:       record.get('deleted'),
                       temp:          record.get('temp') })
      }
    });

    var view = this.getView().down('documentmotionssigneemodifypanel');
    var st = view.getViewModel().getStore('motions');

    st.each(function(record){
      if (record.get('temp') || record.get('deleted')){
        var motionid = null;
        if(record.get('deleted')){ motionid = record.get('id'); }
        var receiver = record.get('receiver');
        motions.push({ id:            motionid,
                       receiver_id:   receiver.id,
                       receiver_type: receiver.ext_type,
                       receiver_role: 'signee',
                       ordering:      record.get('ordering'),
                       motion_text:   record.get('motion_text'),
                       send_type_id:  record.get('send_type_id'),
                       due_date:      record.get('due_date'),
                       deleted:       record.get('deleted'),
                       temp:          record.get('temp') })
      }
    });

    changes.motions = Ext.encode(motions);
    changes.files = Ext.encode(files);

    if(!vm.get('is_auto_signee') && ( document.dirty || files_dirty ) ){
      Ext.MessageBox.confirm('Document was changed', i18n.document.base.ui.modify_confirm, function(btn, text){
        if(btn == 'yes'){
          helpers.api.document.edit.edit(document.id, {
                params: changes,
                success: function() {
                  document.commit(true);
                  component.up('window').destroy();
                }.bind(this),
                failure: function(msg) {
                  Ext.Msg.alert(i18n.errors.title, msg);
                }
          });
        } else {
          return;
        }
      });
    } else {
        helpers.api.document.edit.edit(document.id, {
              params: changes,
              success: function() {
                document.commit(true);
                component.up('window').destroy();
              }.bind(this),
              failure: function(msg) {
                Ext.Msg.alert(i18n.errors.title, msg);
              }
        });
    };

  }

});
