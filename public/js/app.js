Ext.application({
  name   : 'Telasi',
  paths  : { 'Telasi' : 'js/app' },
  width  : '100%',
  height : '100%',

  launch : function() {
    var login = Ext.create('Telasi.view.form.LoginForm');

    Ext.create('Ext.Panel', {
      height: 400,
      //width:  '100%',
      layout: 'center',
      items: [
        login
      ],
      renderTo: Ext.getBody(),
    });

  }
});
