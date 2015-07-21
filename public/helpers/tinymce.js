var config = {
      plugins: [
      "advlist autolink lists link image charmap print preview hr anchor pagebreak",
      "searchreplace visualchars code fullscreen",
      "insertdatetime media nonbreaking save table contextmenu directionality",
      "emoticons template paste textcolor"
      ],

      toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect | bullist numlist | outdent indent blockquote",
      toolbar2: "cut copy paste | searchreplace | undo redo | link unlink code | inserttime preview | forecolor backcolor | table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

      // content_css : "contents.css",
      
      menubar: false,
      statusbar: false,
      toolbar_items_size: 'small'
};

module.exports = {
  config: config
};
