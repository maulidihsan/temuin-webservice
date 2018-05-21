<template>
   <div>
      <!-- section toolbar dan tab -->
      <!-- section toolbar dan tab -->
      <div v-show="toolbar">
         <v-toolbar color="light-green" fixed dense scroll-toolbar-off-screen :v-show="toolbar">
         <v-toolbar-title color="white">
            <span style="color: white;">{{currentTab}}</span>
         </v-toolbar-title>
         
         <v-spacer></v-spacer>
         
         <v-btn icon>
            <v-icon size="20" color="white">search</v-icon>
         </v-btn>
         
         <v-btn icon>
            <v-icon size="20" color="white">far fa-bell</v-icon>
         </v-btn>
      </v-toolbar>
      </div>
      <div id="tab-holder">
         <Pesan v-show="currentTab == 'Pesan'"></Pesan>
         <Timeline v-show="currentTab == 'Timeline'"></Timeline>
         <Profil v-show="currentTab == 'Profil'"></Profil>
      </div>

      <!-- Bottom nav -->
      <v-bottom-nav :value="true" :active.sync="currentTab" fixed color="white" height="48">
         <div class="uk-width-1-1 uk-flex uk-flex-middle" style="max-width: 486px">
            <v-btn flat color="light-green" value="Pesan">
               <v-icon>message</v-icon>
            </v-btn>
            <v-btn flat color="light-green" value="Timeline">
               <v-icon>access_time</v-icon>
            </v-btn>
            <v-btn flat color="light-green" value="Profil">
               <v-icon>far fa-user</v-icon>
            </v-btn>
         </div>
      </v-bottom-nav>
   </div>
</template>

<script>
const Timeline = require('./Timeline.vue');
const Profile = require('./Profile.vue');
const ChatFrame = require('./ChatFrame.vue');

module.exports = {
   data(){
      return{
         currentTab: 'Timeline',
         toolbar: true
      }
   },
   mounted: function(){
      var tabHolder = document.getElementById('tab-holder');
      var yBefore = 0;

      //listener scroll event
      window.addEventListener('scroll', (element, event) => {
         if(window.scrollY > yBefore){
            this.toolbar = false;
            yBefore = window.scrollY;
         }else{
            this.toolbar = true;
            yBefore = window.scrollY;
         }
      })
   },
   components:{
      'Timeline': Timeline,
      'Profil': Profile,
      'Pesan': ChatFrame
   }
}
</script>
