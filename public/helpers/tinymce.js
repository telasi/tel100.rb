// var templatesDialog;

var config = {
      plugins: [
      "advlist autolink lists link image charmap hr anchor pagebreak",
      "searchreplace visualchars code fullscreen",
      "insertdatetime media nonbreaking save table contextmenu directionality",
      "emoticons template paste textcolor"
      ],

      toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect | bullist numlist | outdent indent blockquote",
      toolbar2: "cut copy paste | searchreplace | undo redo | link unlink code | inserttime | forecolor backcolor | table | hr removeformat | subscript superscript | charmap emoticons | fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

      content_css : "/mycontents.css",

      // setup: function(editor){
      //   editor.addButton('Templates', {
      //     text: 'Templates',
      //     icon: false,
      //     onClick: function(){
      //       var dialog = getTemplatesDialog(function(data) {
                
      //       });
      //       dialog.show();
      //       // editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
      //     }

      //   })
      // },

      table_default_attributes: {
           width: '100%',
           border: 1,
           cellpadding: 0,
           cellspacing: 0,
      },

      // autofocus: false,

      fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 28pt 30pt 32pt 34pt 36pt",
      
      menubar: false,
      statusbar: false,
      toolbar_items_size: 'small',

      invalid_elements: 'container'
};

var getConfig = function(){
      config.language = helpers.i18n.getCurrentLocale();
      return config;
}

// var getTemplatesDialog = function(callback) {

//   // create party listener if not created yet
//   if (!templatesDialog) {
//     templatesDialog = Ext.create('Tel100.view.templates.Selector', {
//       title: i18n.document.motion.selectReceiver
//     });
//   }

//   // remove all listeners
//   templatesDialog.clearListeners();

//   // adding new listener
//   templatesDialog.on('selectioncomplete', callback);

//   // return dialog to the user
//   return templatesDialog;
// };

module.exports = {
  config: config,
  getConfig: getConfig
};
