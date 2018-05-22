<template>
   <div>
      <!-- item chat from -->
      <div class="uk-width-1-1 uk-flex uk-flex-right" style="margin-bottom: 8px;">
         <div class="grid-normal uk-flex uk-flex-right" uk-grid>
            <div class="uk-width-auto" style="padding-right: 4px; max-width: 80%;">
               <v-card color="light-green">
                  <div style="padding: 6px;">
                     <div class="uk-width-expand col-normal" style="font-size: 13px;">
                        <b>saya</b>
                     </div>

                     <div style="margin-top: 0px; font-size: 13px;">
                        {{this.messageData.body}}
                     </div>
                  </div>
               </v-card>
               <div class="uk-width-1-1 col-normal uk-text-right" style="font-size: 9px; margin-top: 0px;">
                  {{this.strDate}}
               </div>
            </div>

            <div class="uk-width-auto col-normal uk-flex uk-flex-bottom" style="padding-bottom: 17px;">
               <div class="uk-border-circle" style="height: 36px; width: 36px; background-color: white; overflow: hidden;">
                  <img :src="userData.urlFoto">
               </div>
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
      this.strDate = moment(this.messageData.timestamp).format('Do/MMM HH:mm');
      console.log(JSON.stringify(this.userData));
      console.log(JSON.stringify(this.messageData));
   },
   mounted: function(){
      window.scrollBy(0, document.body.scrollHeight);
   }
}
</script>
