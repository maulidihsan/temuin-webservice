<template>
  	<div class="uk-width-1-1 uk-flex uk-flex-center" style="background-color: #EEEEEE; padding-top: 48px; padding-bottom: 56px;" uk-height-viewport>
    	<!-- main content -->
		<div class="uk-width-1-1 section" style="padding-top: 4px;">
			<chat-item v-for="(chat, index) in chatList" :key="index" :props-data="chat"></chat-item>
		</div>
    	<!-- end main -->
  	</div>
</template>

<script>
const axios = require('axios').default;
const firebase = require('@firebase/app').default;
require('@firebase/messaging');

const io = require('socket.io-client');
var socket;

const ChatListItem = require('./ChatListItem.vue');

module.exports = {
	components: {
		'chat-item': ChatListItem
	},
	data(){
		return{
			chatList: []
		}
	},
	methods:{
		sortList: function(){
			this.chatList.sort(function(a, b){
				if(a.lastMessage.timestamp > b.lastMessage.timestamp){
					return -1;
				}

				if(a.lastMessage.timestamp < b.lastMessage.timestamp){
					return 1;
				}

				return 0;
			});

			console.log(this.chatList);
		}
	},
	beforeCreate: function(){
      socket = io({
         transportOptions: {
            polling: {
               extraHeaders: {
                  'x-temuin-token': this.$session.accessToken
               }
            }
         }
      });

      socket.on('connect', function () {
         console.log('connected');
      });
   },
	created: function(){
		axios.get('/chat', {
			headers:{
				'x-temuin-token': this.$session.accessToken
			}
		}).then(res => {
			//console.log(JSON.stringify(res.data));
			
			for(var i = 0; i < res.data.data.length; i++){
				var dataMsg = res.data.data[i];

				var listItem = {
					senderDetail: dataMsg.sender_detail,
					lastMessage: dataMsg.messages[0]
				}

				this.chatList.push(listItem);
			}

			//console.log(JSON.stringify(this.chatList[0]));
		}).catch(err => {
			//console.log(JSON.stringify(err));
		});

		socket.on('new_msg', (data) => {
			console.log(JSON.stringify(data));
         var dataMessage = {
            from: data.sender.username,
            body: data.message,
            timestamp: Date.now()
         };
			
			//console.log(dataMessage);
			var result = this.chatList.findIndex(function(chat){
				return chat.senderDetail.username == dataMessage.from;
			});

			if(result != -1){
				console.log(JSON.stringify(this.chatList[result]));
				this.chatList[result].lastMessage.body = dataMessage.body;
				this.chatList[result].lastMessage.timestamp = dataMessage.timestamp;

				this.sortList();
			}else{
				var dataSender = {
					from: data.sender.username,
					nama: data.sender.nama,
					urlFoto: data.sender.urlFoto || ''
				};

				var dataMsg = {
					from: data.sender.username,
					timestamp: Date.now(),
					body: data.message
				}

				var listItem = {
					senderDetail: dataSender,
					lastMessage: dataMsg
				}

				this.chatList.push(listItem);
				this.sortList();
			}

         //window.scrollBy(0, window.innerHeight);
      });
	}, 
	mounted: function(){
		const messaging = firebase.messaging();

		/*messaging.useServiceWorker('/public/js/dist/firebase-messaging-sw.js');
		messaging.usePublicVapidKey('BN5hcB1pRtcDGdx8xIDlbTZx8yqENPWZebteBVAX3u4jcT7gdIWKlKASgI6LviUXlYgVz04q6SpNv9DmIIS1w50');
		console.log('disini');
		messaging.requestPermission().then(function() {
			console.log('Notification permission granted.');
			// TODO(developer): Retrieve an Instance ID token for use with FCM.
			
			messaging.getToken().then(function(currentToken) {
				if (currentToken) {
					console.log(currentToken);
				} else {
					// Show permission request.
					console.log('No Instance ID token available. Request permission to generate one.');
				}
			}).catch(function(err) {
				console.log('An error occurred while retrieving token. ', err);
			});
		}).catch(function(err) {
			console.log('Unable to get permission to notify.', err);
		});
		*/
	}
}
</script>


<style>
.section{
	max-width: 486px;
}
.chat-content{
   background-color: white; 
   padding-top: 12px; 
   padding-bottom: 12px;
}
.padding-content{
	padding-left: 12px; 
	padding-right: 12px;
}
.grid-normal{
	margin-left: 0px;
}
.col-normal{
	padding-left: 0px;
}
</style>

