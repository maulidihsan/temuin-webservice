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
        <div class="uk-card uk-card-default uk-width-1-1" style="overflow-y: auto;">
          <div class="uk-card-content">
            <div style="height: 3px; background-color: #8BC34A;"></div>
              <div uk-grid style="padding: 8px;">
                <div class="uk-flex uk-flex-left uk-width-1-3">
                  <div>
                    <v-btn icon v-on:click="modalPost = false">
                      <v-icon color="light-green">close</v-icon>
                    </v-btn>
                  </div>
                </div>
                <div class="uk-flex uk-flex-center uk-flex-middle uk-width-1-3">
                  <sync-loader v-bind:loading="loadingSendPost.show" v-if="loadingSendPost.show" :color="loadingSendPost.color" size="10"></sync-loader>
                </div>
                <div class="uk-flex uk-flex-right uk-width-1-3">
                  <button class="uk-button uk-button-link" style="color: #8BC34A; margin-right: 4px;" v-on:click="sendPost" v-if="!loadingSendPost.show"><b>POST</b></button>
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
                      <textarea class="uk-textarea" placeholder="menemukan barang atau kehilangan barang?" style="font-family: Gibson Regular;" rows="8" v-model="dataPost.deskripsi"></textarea>
                    </div>
                  </div>

                  <!-- Devider -->
                  <div style="height: 2px; background-color: #E0E0E0; margin-top: 8px; margin-bottom: 8px;"></div>

                  <div uk-grid>
                    <div class="uk-width-auto">
                      <v-icon color="light-green">location_on</v-icon>
                    </div>
                    <div class="uk-width-auto" style="padding: 0px; font-family: Gibson Regular; color: #8BC34A;">
                      <span>lokasi</span>
                    </div>
                    <div class="uk-width-expand uk-text-right" style="padding: 0px; font-family: Gibson Regular; font-size: 12px; color: #BDBDBD;">
                      <span>{{ txtNamaLokasi }}</span>
                    </div>
                  </div>

                  <div uk-grid class="uk-flex uk-flex-center" style="margin-top: 24px; margin-left: 0px;">
                    <button class="uk-button uk-button-small" :style="ketemuButtonStyle" v-on:click="ketemuButtonClick">
                      menemukan
                    </button>
                    <button class="uk-button uk-button-small" :style="hilangButtonStyle" v-on:click="hilangButtonClick">
                      kehilangan
                    </button>
                  </div>

                  <div style="height: 2px; background-color: #E0E0E0; margin-bottom: 8px; margin-top: 12px;"></div>

                  <div class="uk-flex uk-flex-center" style="margin-top: 24px; margin-left: 0px;" v-if="loadingUpload.show">
                    <v-progress-circular :value="loadingUpload.value" color="light-green"></v-progress-circular>
                  </div>

                  <div class="uk-flex uk-flex-center" v-if="!loadingUpload.show">
                    <img style="max-height: 240px; margin-bottom: 8px;" :src="dataPost.urlGambar">
                  </div>

                </div>
              </div>
          </div>
        </div>

        <!-- Bottom nav untuk dialog -->
        <v-bottom-nav fixed :value="true" color="white" height="42">
          <div class="uk-flex uk-flex-center uk-width-1-1" uk-grid style="margin: 0px; max-width: 486px;">
            <div class="uk-flex uk-flex-center uk-flex-middle uk-width-1-3" style="padding: 0px;">
              <label for="select-image">
                <v-icon color="light-green">far fa-image</v-icon>
              </label>
              
              <input type="file" id="select-image" accept="image/*" style="display: none;">
            </div>
            <div class="uk-flex uk-flex-center uk-flex-middle uk-width-1-3" style="padding: 0px;">
              <label for="camera">
                <i class="material-icons" style="color: #8BC34A;">camera_alt</i>
              </label>

              <input type="file" id="camera" accept="image/*" capture style="display: none;" >
            </div>
            <div class="uk-flex uk-flex-center uk-flex-middle uk-width-1-3" style="padding: 0px;">
              <v-icon color="light-green" v-on:click="modalMap = !modalMap">place</v-icon>
            </div>
          </div>
        </v-bottom-nav>
      </v-dialog>

      <v-dialog fullscreen v-model="modalMap" transition="dialog-bottom-transition" scrollable>
        <div class="uk-width-1-1" v-if="modalMap">
          <LocationPicker v-on:close="modalMap = !modalMap" v-on:location-set="locationSet"></LocationPicker>
        </div>
      </v-dialog>

      <!-- snackbar untuk pesan error -->
      <v-snackbar :timeout="2000" bottom v-model="snackbar" v-if="snackbar">
        {{ errorMsg }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
   </div>
</template>

<script>
  const axios = require('axios');
  const firebase = require('@firebase/app').default;
  require('@firebase/storage');

  const SyncLoader = require('vue-spinner/dist/vue-spinner.min').SyncLoader;
  const LocationPicker = require('./LocationPicker.vue');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCF68Qkzd4ojW1kAu9EKf4H9eVUmqtjzYg",
    authDomain: "temuin-9f8ed.firebaseapp.com",
    databaseURL: "https://temuin-9f8ed.firebaseio.com",
    projectId: "temuin-9f8ed",
    storageBucket: "temuin-9f8ed.appspot.com",
    messagingSenderId: "171200043046"
  };

  firebase.initializeApp(config);

  var kategoriDipilihStyle = {
    'background-color': '#8BC34A', 
    'color': 'white', 
    'font-size': '12px', 
    'font-family': 'Gibson Regular',
    'border-radius': '500px',
    'padding-left': '8px',
    'padding-right': '8px',
  };

  var tidakDipilihStyle = {
    'font-size': '12px', 
    'font-family': 'Gibson Regular',
    'border-radius': '500px',
    'padding-left': '8px',
    'padding-right': '8px',
    'color': '#8BC34A'
  }

  var timeline = {
    data(){
      return{
        modalPost: false,
        modalMap: false,
        hilangButtonStyle: tidakDipilihStyle,
        ketemuButtonStyle: tidakDipilihStyle,
        txtNamaLokasi: 'belum di set',
        dataPost:{
          deskripsi: null,
          urlGambar: null,
          lokasi: {
            lat: null,
            lng: null
          },
          kategori: null
        },
        arrKategori: ['lost', 'found'],
        snackbar: false,
        errorMsg: null,
        loadingUpload:{
          show: false,
          value: 0
        },
        loadingSendPost:{
          show: false,
				  color: '#8BC34A'
        }
      }
    },
    methods:{
      showModalPost: function(){
        this.modalPost = true;
      },
      hilangButtonClick: function(){
        this.hilangButtonStyle = kategoriDipilihStyle;
        this.ketemuButtonStyle = tidakDipilihStyle;
        this.dataPost.kategori = this.arrKategori[0];
      },
      ketemuButtonClick: function(){
        this.ketemuButtonStyle = kategoriDipilihStyle;
        this.hilangButtonStyle = tidakDipilihStyle;
        this.dataPost.kategori = this.arrKategori[1];
      },
      setUrlGambar: function(urlGambar){
        this.dataPost.urlGambar = urlGambar;
      },
      //listener lokasi di set dari location picker
      locationSet: function(location){
        var geocoder = new google.maps.Geocoder;

        this.dataPost.lokasi = location;

        //terjemahkan lat lng ke address
        geocoder.geocode({location: location}, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.txtNamaLokasi = results[0].formatted_address;
            } else {
              this.errorMsg = 'Nama lokasi tidak ditemukan';
              this.snackbar = true;
            }
          } else {
            this.errorMsg = 'Error: ' + status;
            this.snackbar = true;
          }
        });

        //disable modal location picker
        this.modalMap = false;
      },
      //kirim post
      sendPost: function(){
        this.loadingSendPost.show = true;
        axios.post('/timeline/new_post', this.dataPost, { headers: {'x-temuin-token': this.accessToken}})
        .then((response) => {
          this.loadingSendPost.show = false;

          //set ulang section post
          this.modalPost = false;
          this.dataPost = {
            deskripsi: null,
            urlGambar: null,
            lokasi: {
              lat: null,
              lng: null
            },
            kategori: null
          };
        }).catch((error) => {
          this.loadingSendPost.show = false;

          if(error.response.data.status == 422){
            this.errorMsg = error.response.data.errors[0].param + ' ' + error.response.data.errors[0].msg;
            this.snackbar = true;
          }else if(error.response.data.status == 500){
            this.errorMsg = error.response.data.message;
            this.snackbar = true;
          }
        });
      }
    },
    props:{
      accessToken: String
    },
    mounted: function(){
      //listener untuk pilih file dari storage
      var uploader = document.getElementById('select-image');
      uploader.addEventListener('change', (event) => {
        //enable loading upload
        this.loadingUpload.show = true;

        //get file
        var file = event.target.files[0];
        
        //init ref
        var ref = firebase.storage().ref('/postImage/img_'+ Date.now() + file.name);
        
        //upload
        var upload = ref.put(file);
        upload.on('state_changed', 
          //update progress
          (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.loadingUpload.value = parseInt(progress, 10);
          },
          //error
          (err) => {
            this.loadingUpload.show = false;
            this.errorMsg = err.message;
            this.snackbar = true;
          },
          //complete
          () => {
            this.loadingUpload.show = false;
            this.dataPost.urlGambar = upload.snapshot.downloadURL;
          }
        );
      });
      
      //listener untuk akses kamera
      var uploadCapture = document.getElementById('camera');
      uploadCapture.addEventListener('change', (event) => {
        //get file
        var file = event.target.files[0];
        
        //init ref
        var ref = firebase.storage().ref('/postImage/img_' + file.name);
        
        //upload
        var upload = ref.put(file);
        upload.on('state_changed', 
          //update progress
          (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.loadingUpload.value = parseInt(progress, 10);
          },
          //error
          (err) => {
            this.loadingUpload.show = false;
            this.errorMsg = err.message;
            this.snackbar = true;
          },
          //complete
          () => {
            this.loadingUpload.show = false;
            this.dataPost.urlGambar = upload.snapshot.downloadURL;
          }
        );
      });
    },
    components:{
      'LocationPicker': LocationPicker,
      'sync-loader': SyncLoader
    }
  }
  
  module.exports = timeline;
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
