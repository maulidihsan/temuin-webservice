<template>
   <component 
      v-bind:is="CurrentScreen" 
      v-on:change-screen="changeScreen" 
      v-on:initSession="initSession" 
      v-bind:access-token="SessionData.accessToken"></component>
   
</template>

<script>
   const Splash = require('./Splash.vue');
   const Register = require('./Register.vue');
   const Login = require('./Login.vue');
   const Timeline = require('./Timeline.vue');
   
   //sementara
   const LocationPicker = require('./LocationPicker.vue');

   module.exports = {
      data: function(){
         return{
            CurrentScreen: 'Timeline',
            SessionData: {
               user: null,
               accessToken: null,
               refreshToken: null
            }
         }
      },
      components:{
         'Splash': Splash,
         'Register': Register,
         'Login': Login,
         'Timeline': Timeline,
         'LocationPicker': LocationPicker
      },
      methods:{
         changeScreen: function(screenName){
            this.CurrentScreen = screenName;
         },
         initSession: function(data){
            console.log('data: /n' + JSON.stringify(data));
            this.SessionData.user = data.user;
            this.SessionData.accessToken = data.accessToken;
            this.SessionData.refreshToken = data.refreshToken;
         },
         getAccesToken: function(){
            return this.SessionData.accesToken;
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