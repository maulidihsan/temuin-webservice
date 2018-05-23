<template>
	<div>
		<component 
      v-bind:is="CurrentScreen" 
      v-on:change-screen="changeScreen"
		v-show="isPrimary"></component>

		<component :is="CurrentSecondary" :props-data="secondaryProps" v-if="!isPrimary"></component>
	</div>
</template>

<script>
	const firebase = require('@firebase/app').default;
	require('@firebase/storage');

   const Splash = require('./Splash.vue');
   const Register = require('./Register.vue');
   const Login = require('./Login.vue');
   const MainFrame = require('./MainFrame.vue');

	//secondary layout
	const ChatPage = require('./ChatPage.vue');

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
				isPrimary: true,
				CurrentSecondary: 'chat-page',
				secondaryProps: {}
         }
      },
      components:{
         'Splash': Splash,
         'Register': Register,
         'Login': Login,
         'MainFrame': MainFrame,
			'chat-page': ChatPage
      },
      methods:{
         changeScreen: function(screenName){
            this.CurrentScreen = screenName;
         },
         getAccesToken: function(){
            return this.SessionData.accesToken;
			},
			openSecondary: function(data){
				this.CurrentSecondary = data.pageName;
				this.isPrimary = false;
				this.secondaryProps = data.data;
			},
			backSecondary: function(){
				this.isPrimary = true;
			}
		},
		mounted: function(){
			this.$eventBus.$on('open-secondary', this.openSecondary);
			this.$eventBus.$on('back-secondary', this.backSecondary);
			this.$eventBus.$on('change-screen', this.changeScreen);
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