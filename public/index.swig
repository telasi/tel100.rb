<!DOCTYPE html>
<!--
  Don't edit this file manually! Generate it from index.swig!
-->
<html manifest="" lang="en-US">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link href="/favicon.ico" rel="shortcut icon" />
  <meta charset="UTF-8">
  <title>teldoc</title>
  <!-- css -->
  <link href="/build/bootstrap.min.css" rel="stylesheet">
  <link href="/build/font-awesome.min.css" rel="stylesheet">
  <!-- scripts -->
  <script src="/extjs/ext-all.js"></script>
  <script src="/build/tinymce/tinymce.min.js"></script>
  <script src="/build/i18n.js?v={{ version }}"></script>  
  <script src="/build/helpers.js?v={{ version }}"></script>
  <script src="/build/tel100.js?v={{ version }}"></script>
  <!-- theme -->
  <script src="/extjs/theme/ext-theme-neptune.js"></script>
  <script type="text/javascript" 
        src="http://1.1.2.65:9292/faye/client.js">
        </script>
  <link href="/extjs/theme/resources/ext-theme-neptune-all_01.css" rel="stylesheet">
  <link href="/tel100/tel100.css" rel="stylesheet">
  <style type="text/css">
    .tel100-help {
      position: fixed;
      left: 16px;
      bottom: 16px;
      font-size: 24px;
    }
  </style>
  <!-- start script -->
  <script>
    Ext.Loader.setConfig({ enabled: false });
    Ext.application({
      stores: [ 'CustomFolders' ],
      name: 'Tel100',
      launch: function() {
        Ext.create('Tel100.view.Main');

        // create help link
        var el = document.createElement('a');
        el.innerHTML = '<i class="fa fa-question-circle"></i>';
        el.classList.add('tel100-help');
        el.href = '/teldoc'+helpers.i18n.getCurrentLocale()+'.pdf';
        el.target = 'doc';
        document.body.appendChild(el);
      }
    });
  </script>
</head>
<body>
</body>
</html>