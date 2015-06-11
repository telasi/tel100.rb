Ext.define('Tel100.view.document.editor.CreatorViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditorcreator',

  onBeforeRender: function(component, eOpts) {
    var view = this.getView();
    var vm = this.getViewModel();

    // fire documentchange
    var onChange = function() {
      var doc = vm.get('document');
      if (doc.dirty) { vm.set('isSaved', false); }
      view.fireEvent('documentchange', doc);
    };
    var options = { deep: true };
    vm.bind('{document}', onChange, this, options);

    // var motionsPanel = view.down('documentmotionsoutpanel');
    // motionsPanel.getViewModel().bind('{hasDraftMotion}', function() {
    //   console.log('HERE!');
    // }, this);

    // setting files as editable
    var filesPanel = view.down('#files');
    filesPanel.setEditable(true);

    // setting relations as editable
    var relationPanel = view.down('#relations');
    relationPanel.setEditable(true);
  },

  onDocumentChange: function(document) {
    var vm = this.getViewModel();

    // update subject/body properties
    if (document) {
      vm.set('hasSubject', document.get('subject'));
      vm.set('hasBody', document.get('body'));
    }

    // save changes
    if (document.dirty) {
      vm.set('isSaving', true);
      var changes = document.getChanges();
      helpers.api.document.base.updateDraft(document.id, {
        params: changes,
        success: function() {
          document.commit(true);
          vm.set('isSaved', true);
          vm.set('isSaving', false);
        }.bind(this),
        failure: function() {
          console.log('failed to save document');
          vm.set('isSaving', false);
        }
      });
    }
  },

  onSendClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var isSending = vm.get('isSending');
    if (!isSending) {
      var view = this.getView();
      var document = vm.get('document');
      var subject = document.get('subject');
      var body = document.get('body');
      if (!subject) {
        Ext.Msg.alert(i18n.errors.title, i18n.document.base.errors.empty_subject);
        return;
      }
      vm.set('isSending', true);
      helpers.api.document.base.sendDraft(document.id, {
        success: function() {
          view.fireEvent('documentsent', document);
        }.bind(this),
        failure: function(msg) {
          Ext.Msg.alert(i18n.errors.title, msg);
          vm.set('isSending', false);
        }.bind(this)
      });
    }
  },

  onSaveClick: function(button, e, eOpts) {
    var doc = this.getViewModel().get('document');
    this.onDocumentChange(doc);
  },

  onDocumentPrintClick: function(printParameters, e, eOpts) {
    var vm = this.getViewModel();
    var view = this.getView();
    var document = vm.get('document');
    var url = '/api/documents/print/document/' + document.id + '?lang=' + helpers.i18n.getCurrentLocale();
    for (var key in printParameters) {
      url += '&' + key + '=' + printParameters[key];
    }
    helpers.api.document.print.showPDFwindow(url);
  }
});
