Ext.define('Tel100.view.document.editor.CreatorViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenteditorcreator',

  data: {
    document: null,
    isSaving: false,
    isSaved: true,
    isSending: false
  },

  formulas: {
    saveButtonText: function(get) {
      var isSaving = get('isSaving');
      var isSaved = get('isSaved');
      if (isSaving) {
        return i18n.ui.saving;
      } else {
        if (isSaved) {
          return i18n.ui.saved;
        } else {
          return i18n.ui.save;
        }
      }
    },
    saveButtonDisabled: function(get) {
      var isSaving = get('isSaving');
      var isSaved = get('isSaved');
      return isSaving || isSaved;
    },
    sendButtonDisabled: function(get) {
      // disable when sending document
      if (get('isSending')) { return true; }
      // disable when no draft motion
      if (!get('hasDraftMotion')) { return true; }
      // checking subject/body
      if (!get('hasSubject')) { return true; }
      // if (!get('hasBody')) { return true; }
      // send is open
      return false;
    }
  }
});
