<template>
  <!-- Item timeline -->
   <div class="uk-card uk-card-default" style="margin-bottom: 12px;">
      <div class="uk-card-body" style="padding: 12px;">
         <div uk-grid>
            <div class="uk-width-auto">
               <img class="uk-border-circle" src="/public/img/user.png" width="38" height="38" style="background-color: white; border: 1px solid #8BC34A;">
            </div>
            <div class="uk-width-expand uk-flex uk-flex-middle" uk-grid style="margin-bottom: 12px;">
               <div class="uk-width-2-3" style="padding-left: 12px;">
                  <span style="font-family: Gibson Regular; color: #8BC34A;"><b>{{dataPost.user.username}}</b></span>
                  <!-- light-green lighten-2 #AED581 (Keterangan Found) -->
                  <br>
                  <span style="font-family: Gibson Regular; color: #E57373; font-size: 10px;"><b>{{dataPost.kategori}} - {{strWaktu}}</b></span> 
               </div>
               <div class="uk-width-1-3 uk-text-right">
                  <span style="font-family: Gibson Regular; color: #BDBDBD; font-size: 12px;">{{strTimeAgo}}</span>
               </div>
            </div>
         </div>
         <div style="font-family: Gibson Regular; color: #616161; font-size: 14px; margin-bottom: 12px;">
            {{ dataPost.deskripsi }}
         </div>
         <div style="margin-bottom: 12px;" class="uk-flex uk-flex-center">
            <img :src="dataPost.urlGambar" style="max-height: 320px;">
         </div>
         <div style="font-family: Gibson Regular; color: #757575; font-size: 12px;">
            {{strLokasi}}
         </div>
      </div>
      <div class="uk-card-footer uk-flex uk-flex-right" style="padding-top: 0px; padding-bottom: 2px; padding-left: 0px; padding-right: 0px;">
         <v-btn icon>
            <v-icon color="grey lighten-1">location_on</v-icon>
         </v-btn>
         <v-btn icon>
            <v-icon color="grey lighten-1">share</v-icon>
         </v-btn>
      </div>
   </div>
</template>

<script>
const moment = require('moment');

module.exports = {
	data(){
		return{
			strWaktu: null,
			strLokasi: null,
			timestamp: null,
			strTimeAgo: null
		}
	},
	props:{
		dataPost: Object
	},
	created: function(){
		var geocoder = new google.maps.Geocoder;

		//console.log(JSON.stringify(this.dataPost));
		this.timestamp = Date.parse(this.dataPost.created);
		this.strWaktu = moment(this.timestamp).format('MMMM Do YYYY - HH:mm');
		this.strTimeAgo = moment(this.timestamp).fromNow();

		//terjemahkan lat lng ke address
		var location = {
			lat: this.dataPost.lokasi.coordinates[1],
			lng: this.dataPost.lokasi.coordinates[0]
		}

		geocoder.geocode({location: location}, (results, status) => {
			if (status === 'OK') {
				if (results[0]) {
					this.strLokasi = results[0].formatted_address;
				} else {
					this.strLokasi = 'Nama lokasi tidak ditemukan';
				}
			} else {
				this.strLokasi = 'Error: ' + status;
			}
		});
	}
}
</script>
