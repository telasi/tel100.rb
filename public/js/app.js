Ext.application({
  name: 'Telasi',
  paths  : { 'Telasi' : '/js/app' },

// <<<<<<< HEAD
//   autoCreateViewport: true,

//   controllers: [
//     'user.Login'
//   ]
// =======
  views: [
        'Telasi.view.form.LoginForm',
        'Telasi.view.form.MainWindow',
  ],

  launch : function() {
    // var login = Ext.create('Telasi.view.form.LoginForm');

    // Ext.create('Ext.Panel', {
    //   height: 400,
    //   //width:  '100%',
    //   layout: 'center',
    //   items: [
    //     login
    //   ],
    //   renderTo: Ext.getBody(),
    // });
    Ext.widget('form-login');
  }
// >>>>>>> b6738e6efdac28463fbe384958d5083c0428f836
});
