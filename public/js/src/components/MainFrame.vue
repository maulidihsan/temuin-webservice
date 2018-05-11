<template>
   <div>
      <!-- section toolbar dan tab -->
      <v-toolbar color="light-green" dark tabs>
         <v-toolbar-title>{{currentTab}}</v-toolbar-title>
         
         <v-spacer></v-spacer>
         
         <v-btn icon>
            <v-icon size="20">search</v-icon>
         </v-btn>
         
         <v-btn icon>
            <v-icon size="20">far fa-bell</v-icon>
         </v-btn>
         
         <v-tabs slot="extension" v-model="currentTab" color="light-green" slider-color="yellow">
            <div class="uk-width-1-1 uk-flex uk-flex-center">
               <div class="uk-width-1-1 uk-child-width-1-3" style="max-width: 486px;">
                  <v-tab href="#Pesan">
                     <v-icon>message</v-icon>
                  </v-tab>
                  <v-tab href="#Timeline">
                     <v-icon>access_time</v-icon>
                  </v-tab>
                  <v-tab href="#Profil">
                     <v-icon>far fa-user</v-icon>
                  </v-tab>
               </div>
            </div>
         </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="currentTab">
         <div class="uk-width-1-1 uk-flex uk-flex-center">
            <v-tab-item id="Pesan">
               Pesan
            </v-tab-item>
            <v-tab-item id="Timeline">
               <Timeline :access-token="accessToken"></Timeline>
            </v-tab-item>
            <v-tab-item id="Profil">
               Profil
            </v-tab-item>
         </div>
      </v-tabs-items>
   </div>
</template>

<script>
const Timeline = require('./Timeline.vue');

module.exports = {
   data(){
      return{
         currentTab: 'Timeline'
      }
   },
   props:{
      accessToken: String
   },
   components:{
      'Timeline': Timeline
   }
}
</script>
