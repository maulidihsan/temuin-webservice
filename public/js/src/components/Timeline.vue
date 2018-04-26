<template>
   <div style="height: 100vh;">
      <!-- FAB -->
      <v-fab-transition>
        <v-btn color="light-green" v-show="!modalPost" fab fixed bottom right v-on:click="modalPost = !modalPost">
          <v-icon>mode_edit</v-icon>
        </v-btn>
      </v-fab-transition>

      <!-- DIALOG UNTUK POST -->
      <v-dialog v-model="modalPost" fullscreen transition="dialog-bottom-transition" scrollable>
        <v-card tile>
          <div style="height: 3px; background-color: #8BC34A;"></div>
          <div uk-grid style="padding: 8px;">
            <div class="uk-flex uk-flex-left uk-width-1-2">
              <div>
                <v-btn icon v-on:click="modalPost = false">
                  <v-icon color="light-green">close</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="uk-flex uk-flex-right uk-width-1-2">
              <button class="uk-button uk-button-link" style="color: #8BC34A; margin-right: 4px;"><b>POST</b></button>
            </div>
          </div>
          <div class="uk-flex uk-flex-center">
            <div class="main-content uk-width-1-1">
              <!-- FORM POST -->
              <div uk-grid>
                <div class="uk-width-auto">
                  <img class="uk-border-circle" src="/public/img/user.png" width="38" height="38" style="background-color: white; border: 1px solid #8BC34A;">
                </div>
                <div class="uk-width-expand" style="padding: 0px; margin-left: 8px;">
                  <textarea class="uk-textarea" placeholder="menemukan barang atau kehilangan barang?" style="font-family: Gibson Regular;" rows="8"></textarea>
                </div>
              </div>

              <!-- Devider -->
              <div style="height: 2px; background-color: #E0E0E0; margin-top: 8px; margin-bottom: 8px;"></div>

              <div uk-grid>
                <div class="uk-width-auto">
                  <v-icon color="light-green">location_on</v-icon>
                </div>
                <div class="uk-width-auto" style="padding: 0px; font-family: Gibson Regular; font-soze: 12px; color: #8BC34A;">
                  <span>lokasi</span>
                </div>
                <div class="uk-width-expand uk-text-right" style="padding: 0px; font-family: Gibson Regular; font-soze: 12px; color: #BDBDBD;">
                  <span>belum diset</span>
                </div>
              </div>

              <div style="height: 2px; background-color: #E0E0E0; margin-top: 24px; margin-bottom: 8px;"></div>

            </div>
          </div>
        </v-card>

        <!-- Bottom nav untuk dialog -->
        <v-bottom-nav fixed :value="true" color="white" height="40">
          <div class="uk-flex uk-flex-center uk-width-1-1" uk-grid style="margin: 0px; max-width: 486px;">
            <div class="uk-flex uk-flex-center uk-flex-middle uk-width-1-3" style="padding: 0px;">
              <v-icon color="light-green">far fa-image</v-icon>
            </div>
            <div class="uk-flex uk-flex-center uk-flex-middle uk-width-1-3" style="padding: 0px;">
              <i class="material-icons" style="color: #8BC34A;">camera_alt</i>
            </div>
            <div class="uk-flex uk-flex-center uk-flex-middle uk-width-1-3" style="padding: 0px;">
              <v-icon color="light-green">place</v-icon>
            </div>
          </div>
        </v-bottom-nav>
      </v-dialog>


   </div>
</template>

<script>
module.exports = {
  data(){
      return{
        modalPost: false
      }
  },
  methods:{
      showModalPost: function(){
        this.modalPost = true;
        console.log('dipanggil');
      }
  }
}
</script>

<style>
@font-face {
   font-family: 'Gibson Regular';
   src: url('./public/font/Gibson-Regular.ttf');
}
@font-face {
   font-family: 'Gibson Regular Italic';
   src: url('./public/font/Gibson-RegularItalic.ttf');
}
.main-content{
   margin-top: 12px; 
   margin-right: 24px;
   margin-left: 24px;
   margin-bottom: 42px;
   max-width: 486px;
}
</style>
