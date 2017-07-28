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

      table_default_attributes: {
           width: '100%',
           border: 1,
           cellpadding: 0,
           cellspacing: 0,
      },
      
      menubar: false,
      statusbar: false,
      toolbar_items_size: 'small',

      invalid_elements: 'container'
};

var getConfig = function(){
      config.language = helpers.i18n.getCurrentLocale();
      return config;
}

module.exports = {
  config: config,
  getConfig: getConfig
};
