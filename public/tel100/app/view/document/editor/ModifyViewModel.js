Ext.define('Tel100.view.document.editor.ModifyViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenteditormodify',

  data: {
    document: null,
    is_auto_signee: false
  },

  formulas: {
  	author_one: function(get){
  		return ( get('document').get('authors').length === 1 ) &&
  			     ( get('document').get('sender_id') !== get('document').get('authors')[0].author_id ) &&
             ( helpers.user.getCurrentUser().get('employee_id') !== get('document').get('authors')[0].author_id ) &&
             ( get('document').get('as_sender') === 1);
  	},

    canEditText: function(get){
      return !get('is_auto_signee');
    },

    canEditSubject: function(get){
      return !get('is_auto_signee');
    },

    canRemoveAssigne: function(get){
      return !get('is_auto_signee');
    },

    canEditSignees: function(get){
      return !get('is_auto_signee');
    },

    canEditNumber: function(get){
      return get('is_auto_signee');
    },

    canEditDate: function(get){
      return get('is_auto_signee');
    }

  }

});