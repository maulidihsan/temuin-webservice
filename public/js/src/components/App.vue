<template>
   <component v-bind:is="CurrentScreen" v-on:change-screen="changeScreen" v-on:initSession="initSession"></component>
</template>

<script>
   const Splash = require('./Splash.vue');
   const Register = require('./Register.vue');
   const Login = require('./Login.vue');

   module.exports = {
      data: function(){
         return{
            CurrentScreen: 'Splash',
            SessionData: {
               user: null,
               accesToken: null,
               refreshToken: null
            }
         }
      },
      components:{
         'Splash': Splash,
         'Register': Register,
         'Login': Login 
      },
      methods:{
         changeScreen: function(screenName){
            this.CurrentScreen = screenName;
         },
         initSession: function(data){
            console.log('session init....');
            this.SessionData.user = data.user;
            this.SessionData.accesToken = data.accesToken;
            this.SessionData.refreshToken = data.refreshToken;
         }
      }
   }
</script>


<style>
@font-face {
   font-family: "Nexa Bold";
   src: url('./public/font/NexaBold.otf');
}
.splash{
   background-color: #8BC34A;
   height: 100vh;
}
</style>