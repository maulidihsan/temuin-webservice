<template>
  	<div class="uk-width-1-1 uk-flex uk-flex-center" style="background-color: #EEEEEE; padding-top: 48px;" uk-height-viewport>
    	<!-- main content -->
		<div class="uk-width-1-1 main-content">
			<chat-item></chat-item>
		</div>
    	<!-- end main -->
  	</div>
</template>

<script>
const axios = require('axios').default;
const ChatListItem = require('./ChatListItem.vue');


module.exports = {
	components: {
		'chat-item': ChatListItem
	},
	created: function(){
		axios.get('/chat', {
			headers:{
				'x-temuin-token': this.$session.accessToken
			}
		}).then(res => {
			console.log(JSON.stringify(res.data));
		}).catch(err => {
			console.log(JSON.stringify(err));
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
</style>

