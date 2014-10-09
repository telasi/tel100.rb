Ext.define('Telasi.view.form.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'form-login',

    title: 'შესვლა',
    frame:true,
    width: 320,
    bodyPadding: 10,
    url: '/api/login',
    defaultType: 'textfield',

    initComponent: function() {
      Ext.apply(this, {
        items: [{
          allowBlank: false,
          name: 'userID',
          fieldLabel: 'მომხმარებელი',
          emptyText: 'მომხმარებელი'
        }, {
          allowBlank: false,
          name: 'password',
          fieldLabel: 'პაროლი',
          emptyText: 'პაროლი',
          inputType: 'password'
        }],

        buttons: [{ 
          text:'შესვლა',
          handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
              form.submit({
                success: function(form, action) {
                  Ext.Msg.alert('Info',action.result.message);
                },
                failure: function(form, action) {
                  // console.log('failure', action);
                },
              });

              Ext.Msg.wait('დაელოდეთ...');
            }
          },
        }],
      });


      this.defaults = {
        anchor: '100%',
        labelWidth: 120
      };
        
      this.callParent();
    },
});