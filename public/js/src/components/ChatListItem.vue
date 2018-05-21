<template>
   <div>
      <div class="chat-content padding-content grid-normal" uk-grid style="margin-top: 0px; margin-bottom: 4px;" @click="openChatPage">
         <div class="uk-width-auto col-normal">
            <div class="uk-border-circle" style="height: 42px; width: 42px; background-color: white;">
               <img src="/public/img/user.png">
            </div>
         </div>
         <div class="uk-width-expand" style="padding-left: 12px;">
            <div style="font-size: 13px; color: #8BC34A;">
               <b>Sarpras DTETI</b>
            </div>

            <div style="font-size: 12px;">
               dari timeline temuin katanya menemukan HP?
            </div>

            <div class="uk-text-right" style="font-size: 11px; border-bottom: 2px solid #EEEEEE; padding-bottom: 4px;">
               16 Mei 2018, 18:30
            </div>
         </div>
      </div>
   </div>
</template>

<script>
module.exports = {
   methods:{
      openChatPage: function(){
         this.$eventBus.$emit('open-secondary', 'chat-page');
      }
   }
}
</script>
