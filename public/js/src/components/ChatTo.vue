<template>
   <div>
      <!-- item chat to-->
      <div class="grid-normal" uk-grid style="margin-bottom: 8px;">
         <div class="uk-width-auto col-normal uk-flex uk-flex-bottom" style="padding-bottom: 17px;">
            <div class="uk-border-circle" style="height: 36px; width: 36px; background-color: white; overflow: hidden;">
               <img :src="userData.urlFoto">
            </div>
         </div>
         <div class="uk-width-auto" style="padding-left: 4px; max-width: 80%;">
            <v-card color="white">
               <div style="padding: 4px;">
                  <div class="col-normal" style="font-size: 13px;">
                     <b>{{userData.username}}</b>
                  </div>

                  <div style="margin-top: 0px; font-size: 13px;">
                     {{messageData.body}}
                  </div>
               </div>
            </v-card>

            <div class="uk-width-1-1 col-normal uk-text-right" style="font-size: 9px; margin-top: 0px;">
               {{this.strDate}}
            </div>

         </div>
      </div>
      <!-- end item chat -->

   </div>
</template>

<script>
const moment = require('moment');
module.exports = {
   props:{
      messageData: Object,
      userData: Object
   },
   data(){
      return{
         strDate: ''
      }
   },
   created: function(){
      console.log('created');
      this.strDate = moment(this.messageData.timestamp).format('Do/MMM HH:mm');
      //console.log(JSON.stringify(this.userData));
   },
   mounted: function(){
      window.scrollBy(0, document.body.scrollHeight);
   }
}
</script>
