<template>
   <div uk-height-viewport style="background-color: #EEEEEE;" class="uk-width-1-1 uk-flex uk-flex-center">
      <!-- section toolbar dan tab -->
      <v-toolbar color="light-green" dark fixed dense>
         <v-btn icon @click="backBtn">
            <v-icon>arrow_back</v-icon>
         </v-btn>
         <v-toolbar-title>
            <span style="color: white;">{{propsData.toUsername}}</span>
         </v-toolbar-title>
         
         <v-spacer></v-spacer>
         
         <v-btn icon>
            <v-icon size="20">search</v-icon>
         </v-btn>
         
         <v-btn icon>
            <v-icon size="20">far fa-bell</v-icon>
         </v-btn>
      </v-toolbar>
      <!-- end section -->

      <div class="uk-width-1-1 section padding-content" style="margin-top: 54px; margin-bottom: 90px;">
         <div v-for="(itemMessage) in messageList" :key="itemMessage._id">
            <chat-to v-if="itemMessage.from == propsData.toUsername" :message-data="itemMessage" :user-data="senderDetail"></chat-to>
            <chat-from v-else :message-data="itemMessage" :user-data="ownerDetail"></chat-from>
         </div>
      </div>

      <div class="uk-width-1-1 uk-flex uk-flex-center" style="position: fixed; bottom: 0; background-color: white;">
         <div class="grid-normal section chat-content padding-content uk-width-1-1" uk-grid>
            <div class="uk-width-expand col-normal">
               <textarea class="uk-textarea" style="font-size: 12px;" rows="2" v-model="message"></textarea>
            </div>
            <div class="uk-width-auto" style="padding-left: 8px;">
               <v-btn icon size="12" @click="sendChat">
                  <v-icon>send</v-icon>
               </v-btn>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
const ChatTo = require('./ChatTo.vue');
const ChatFrom = require('./ChatFrom.vue');
const io = require('socket.io-client');

var socket;

module.exports = {
   data(){
      return{
         message: '',
         messageList: [],
         ownerDetail: {},
         senderDetail: {}
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
   props:{
      propsData: Object
   },
   components: {
      'chat-to': ChatTo,
      'chat-from': ChatFrom
   },
   methods: {
      backBtn: function(){
         this.$eventBus.$emit('back-secondary');
      },
      getChat: function(){
         if(!this.$session.accessToken){
            return;
         }

         this.$axios.get('/chat?username=' + this.propsData.toUsername, {
            headers: {
               'x-temuin-token': this.$session.accessToken
            }
         }).then(response => {
            var data = response.data.data;
            this.messageList = data.messages;

            //reverse urutan
            this.messageList.reverse();

            this.ownerDetail = data.owner_detail;
            this.senderDetail = data.sender_detail;

            //validasi tambahan untuk urlFoto
            if(!this.ownerDetail.urlFoto){
               this.ownerDetail.urlFoto = '';
            }

            if(!this.senderDetail.urlFoto){
               this.senderDetail.urlFoto = '';
            }
         }).catch(err => {
            console.log(JSON.stringify(err));
         });
      },
      sendChat: function(){
         var message = this.message;

         var dataMessage = {
            from: this.ownerDetailusername,
            body: this.message,
            timestamp: Date.now()
         };
      
         this.messageList.push(dataMessage);

         //set ulang message
         this.message = '';

         socket.emit('send_msg', {
            to: this.propsData.toUsername,
            message: message
         }, (cb) => {
            //apapun

         });
      }
   },
   created: function(){
      console.log(JSON.stringify(this.propsData));
      
      this.getChat();
      socket.on('new_msg', (data) => {
         if(data.sender.username != this.propsData.toUsername){
            return;
         }

         var dataMessage = {
            from: data.sender.username,
            body: data.message,
            timestamp: Date.now()
         };
         
         this.messageList.push(dataMessage);
         //window.scrollBy(0, window.innerHeight);
      });
   }
}
</script>


<style>
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
.section{
   max-width: 486px;
}
</style>
