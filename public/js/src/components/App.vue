<template>
   <component v-bind:is="CurrentScreen" v-on:change-screen="changeScreen"></component>
</template>

<script>
   const Splash = require('./Splash.vue');
   const Register = require('./Register.vue');
   const Login = require('./Login.vue');

   module.exports = {
      data: function(){
         return{
            CurrentScreen: 'Login'
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