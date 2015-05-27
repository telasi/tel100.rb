Ext.define('Tel100.view.document.motions.OutPanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentmotionsoutpanel',

  data: {
    motionbase: true,
    selection: null
  },

  formulas: {
    deleteDraftButtonDisabled: function(get) {
      var selection = get('selection');
      if (selection) {
        var status = selection.get('status');
        return status !== helpers.document.status.DRAFT;
      } else {
        return true;
      }
    },

    sendButtonDisabled: function(get) {
      var docstatus = get('document.status');
      if (docstatus === helpers.document.status.DRAFT) {
        return true;
      } else {
        return !get('hasDraftMotions');
      }
    }
  }
});
