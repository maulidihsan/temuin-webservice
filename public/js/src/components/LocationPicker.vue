<template>
  <div style="height: 100%; padding-bottom: 40px;">
    <div id="map-google" style="height: 100%;"></div>
    <v-bottom-nav fixed :value="true" height="42" color="white">
      <div class="uk-width-1-1 uk-flex uk-flex-middle uk-flex-center">
        <div class="uk-button-group uk-width-1-1 uk-child-width-1-3@s" style="max-width: 486px;">
          <button class="uk-button uk-button-default uk-button-small btn-bottom uk-flex uk-flex-middle uk-flex-center" v-on:click="$emit('close')">
            <v-icon>close</v-icon>
          </button>
          <button class="uk-button uk-button-default btn-bottom uk-button-small uk-flex uk-flex-middle uk-flex-center" v-on:click="pusatkanLokasi">
            <v-icon>my_location</v-icon>
          </button>
          <button class="uk-button uk-button-default btn-bottom uk-button-small uk-flex uk-flex-middle uk-flex-center" v-on:click="setLokasi">
            <v-icon>done</v-icon>
          </button>
        </div>
      </div>
    </v-bottom-nav>

    <!-- snackbar untuk pesan error -->
    <v-snackbar :timeout="2000" bottom v-model="snackbar" v-if="snackbar">
      {{ errorMsg }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
module.exports = {
  data(){
    return{
      mapStyle:{
        height: screen.height - 40
      },
      map: null,
      location: null,
      snackbar: false,
      errorMsg: null
    }
  },
  mounted: function(){
    this.map = new google.maps.Map(document.getElementById('map-google'), {
      zoom: 14,
      center: {lat: -7.783, lng: 110.367}
    });

    var markers = [];

    this.map.addListener('click', (event) => {
      //set data lokasi
      this.location = event.latLng;

      //set marker
      for(var i = 0; i < markers.length; i++){
        markers[i].setMap(null);
      }

      var marker = new google.maps.Marker({
        position: event.latLng,
        map: this.map
      });

      markers.push(marker);
    });

    //dapatkan lokasi user saat ini
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        var lokasiUser = {};
        lokasiUser.lat = position.coords.latitude;
        lokasiUser.lng = position.coords.longitude;

        this.map.setOptions({
          zoom: 16,
          center: lokasiUser
        });
      })
    }
  },
  methods:{
    setLokasi: function(){
      console.log(this.snackbar);
      //emit event di parent
      if(this.location == null){
        this.errorMsg = 'Lokasi belum dipilih';
        return this.snackbar = true;
      }
      this.$emit('location-set', {lat: this.location.lat(), lng: this.location.lng()});
    },
    pusatkanLokasi: function(){
      //dapatkan lokasi user saat ini
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          var lokasiUser = {};
          lokasiUser.lat = position.coords.latitude;
          lokasiUser.lng = position.coords.longitude;

          this.map.setOptions({
            zoom: 16,
            center: lokasiUser
          });
        })
      }
    }
  }
}
</script>

<style>
.btn-bottom{
  color: #8BC34A; 
  background-color: white;
  border-color: white; 
  font-family: Gibson Regular;
  font-size: 12px;
}
</style>