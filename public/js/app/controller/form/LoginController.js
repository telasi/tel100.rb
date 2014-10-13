Ext.define('Telasi.controller.form.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function(){
        this.getView().destroy();

        Ext.widget('main-window');
    }
});