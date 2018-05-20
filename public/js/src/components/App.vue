<template>
   <component 
      v-bind:is="CurrentScreen" 
      v-on:change-screen="changeScreen" 
      v-on:initSession="initSession" 
      v-bind:access-token="SessionData.accessToken"></component>
   
</template>

<script>
	const firebase = require('@firebase/app').default;
	require('@firebase/storage');
	
	const Splash = require('./Splash.vue');
   const Register = require('./Register.vue');
   const Login = require('./Login.vue');
   const MainFrame = require('./MainFrame.vue');

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCF68Qkzd4ojW1kAu9EKf4H9eVUmqtjzYg",
		authDomain: "temuin-9f8ed.firebaseapp.com",
		databaseURL: "https://temuin-9f8ed.firebaseio.com",
		projectId: "temuin-9f8ed",
		storageBucket: "temuin-9f8ed.appspot.com",
		messagingSenderId: "171200043046"
	};


	firebase.initializeApp(config);

   module.exports = {
      data: function(){
         return{
            CurrentScreen: 'Splash',
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
         'MainFrame': MainFrame
      },
      methods:{
         changeScreen: function(screenName){
            this.CurrentScreen = screenName;
         },
         initSession: function(data){
            //console.log('data: /n' + JSON.stringify(data));
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