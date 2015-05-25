Ext.define('Tel100.view.document.motions.ResultPanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentmotionsresultpanel',

  onSaveClick: function(button, e, eOpts) {
    var view = this.getView();
    var vm = this.getViewModel();

    var docId = vm.get('document').id;
    var motionId = vm.get('selection.id');
    if (typeof motionId !== 'number') { motionId = null; }
    var text = vm.get('text');
    var isComplete = vm.get('isResult');
    if (isComplete && vm.get('hideComplete')) { isComplete = false; }
    var responseTypeId = null;
    if (isComplete) { responseTypeId = vm.get('categoryId'); }

    var params = {
      document_id: docId,
      motion_id: motionId,
      is_result: isComplete,
      text: text,
      response_type_id: responseTypeId
    };

    if (!params.is_result && !params.text) {
      Ext.Msg.show({
        title: i18n.document.comment.errors.text_required_title,
        message: i18n.document.comment.errors.text_required,
        buttons: Ext.Msg.OK,
      });
      return;
    }

    view.setLoading(true);

    helpers.api.document.comment.create({
      params: params,
      success: function(data) {
        view.resetForm();
        view.setLoading(false);
        view.fireEvent('commentadded');
      },
      failure: function(error) {
        view.setLoading(false);
        console.error(error);
      }
    });
  },

  onMotionsStoreLoad: function(store, records, successful, eOpts) {
    var view = this.getView();
    var combo = view.down('#in-motions');
    var val = store.getAt(0);
    combo.select(val);
  },

  onResponseTypesStoreLoad: function(store, records, successful, eOpts) {
    var view = this.getView();
    var combo = view.down('#result-types');
    var val = store.getAt(0);
    combo.select(val);
  }
});
