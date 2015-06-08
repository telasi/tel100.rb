Ext.define('Tel100.view.document.editor.EditorViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documenteditoreditor',

  onEditClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var document = vm.get('document');
    var title = [ i18n.document.comment.actions.edit, ': ', document.get('docnumber')].join('');

    var editWindow = Ext.create('Tel100.view.document.editor.Modify', {
      title: title,
      viewModel: {
        data: {
          document: document
        }
      }
    });

    editWindow.show();
  },

  onReplyClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var document = vm.get('document');

    helpers.api.document.base.reply(document.id, {
      success: function(data) {
        var doc = Ext.create('Tel100.model.document.Base', data);
        var dm = this.getView().up('documentmain');
        dm.getViewModel().set('selection', doc);
        dm.getController().openDocument(doc);
      }.bind(this)
    });
  },

  onCardPrintClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var document = vm.get('document');
    var url = '/api/documents/print/card/' + document.id + '?lang=' + helpers.i18n.getCurrentLocale(); 
    helpers.api.document.print.showPDFwindow(url);
  },

  onDocumentPrintClick: function(button, e, eOpts) {
    var vm = this.getViewModel();
    var document = vm.get('document');
    var printParams = vm.get('printParams');
    var url = '/api/documents/print/document/' + 
              document.id + 
              '?lang=' + helpers.i18n.getCurrentLocale();
    for(var key in printParams){
      if(printParams[key]){
        url += '&'+ key + '=true';
      }
    }
    helpers.api.document.print.showPDFwindow(url);
  },

  onInMotionChanged: function(motion) {
    var view = this.getView();
    var outPanel = view.down('documentmotionsoutpanel');
    if (!motion || motion.get('type') === 'document') {
      outPanel.setParentId(null);
    } else {
      outPanel.setParentId(motion.id);
    }
    outPanel.refresh();
  },

  onDestroy: function(component, eOpts) {
    if (component.commentsDialog) {
      component.commentsDialog.destroy();
    }
  },

  onContainerAfterRender: function(component, eOpts) {
    helpers.party.employeeTips(component);
  },

  onMenucheckitemCheckChange: function(menucheckitem, checked, eOpts){
    var vm = this.getViewModel();
    var field = 'printParams.' + menucheckitem.itemId;
    vm.set(field, checked);
  }
});
