<template>
   <div>
      <div class="chat-content padding-content grid-normal" uk-grid style="margin-top: 0px; margin-bottom: 4px;" @click="openChat">
         <div class="uk-width-auto col-normal">
            <div class="uk-border-circle" style="height: 42px; width: 42px; background-color: white; overflow: hidden;">
               <img :src="propsData.senderDetail.urlFoto" v-if="propsData.senderDetail.urlFoto">
               <img src="/public/img/user.png" v-else>
            </div>
         </div>
         <div class="uk-width-expand" style="padding-left: 12px;">
            <div style="font-size: 13px; color: #8BC34A;">
               <b>{{propsData.senderDetail.username}}</b>
            </div>

            <div style="font-size: 12px;">
               {{propsData.lastMessage.body}}
            </div>

            <div class="uk-text-right" style="font-size: 11px; border-bottom: 2px solid #EEEEEE; padding-bottom: 4px;">
               {{strDate}}
            </div>
         </div>
      </div>
   </div>
</template>

<script>
const moment = require('moment');

module.exports = {
   props:{
      propsData: Object
   },
   methods:{
      openChat: function(){
			var data = {
				pageName: 'chat-page',
				data:{
					toUsername: this.propsData.senderDetail.username
				}
			}
			this.$eventBus.$emit('open-secondary', data);
		}
   },
   computed: {
     	strDate : function(){
			var date = moment(this.propsData.lastMessage.timestamp).format('Do/MMM HH:mm');
			return date;
		}
   }
}
</script>
