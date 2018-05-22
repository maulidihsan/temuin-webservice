<template>
	<div style="padding-bottom: 60px;">
		<div class="uk-width-1-1" style="background-color: #8BC34A; height: 192px"></div>

		<!-- Foto profil -->
		<div class="uk-width-1-1 uk-flex uk-flex-center" style="margin-top: -90px;">
			<div>
				<div class="uk-border-circle" style="background-color: white; width: 180px; height: 180px; overflow: hidden;">
					<img :src="dataUser.urlFoto">	
				</div>
			</div>
		</div>

		<div class="uk-width-1-1 uk-flex uk-flex-center">
			<div class="uk-width-1-1 main-content uk-flex uk-flex-center">
				<div class="uk-text-center">
					<label for="pilih-foto" style="font-family: Gibson Regular; font-size: 12px; color: #8BC34A;">
						ganti foto profil <v-icon>edit</v-icon>
					</label>
					<input type="file" id="pilih-foto" accept="image/*" style="display: none;">
					<div style="font-family: Gibson Regular; font-size: 24px;"><b>{{dataUser.nama}}</b></div>
					<div style="font-family: Gibson Regular;">({{dataUser.username}})</div>
				</div>
			</div>
		</div>
		<div class="uk-width-1-1 uk-flex uk-flex-center">
			<button class="uk-button uk-button-small uk-button-primary" style="background-color: #8BC34A; color: white; font-family: Gibson Regular;">
				logout
			</button>
		</div>

		<div class="uk-width-1-1 uk-flex uk-flex-center" style="margin-top: 54px;">
			<v-progress-linear :active="progressBar.show" :value="progressBar.value" height="2" color="light-green"></v-progress-linear>
		</div>
		<div class="uk-width-1-1 uk-flex uk-flex-center" style="border-top: 2px solid #e5e5e5;">
			<div uk-grid class="uk-flex uk-flex-middle" style="margin-top: 12px;">
				<v-icon>email</v-icon>
				<span style="padding: 4px; font-size: 12px; font-family: Gibson Regular;">{{dataUser.email}}</span>
			</div>
		</div>

		<!-- snackbar untuk pesan error -->
		<v-snackbar :timeout="2000" bottom v-model="snackbar.show" v-if="snackbar.show">
			{{ snackbar.msg }}
			<v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
const axios = require('axios').default;
const firebase = require('@firebase/app').default;
require('@firebase/storage');

module.exports = {
	data: function(){
		return{
			dataUser: {
				nama: null,
				email: null,
				urlFoto: '/public/img/user.png',
				username: null
			},
			progressBar:{
				show: false,
				value: 0
			},
			snackbar: {
				show: false,
				msg: null
			}
		}
	},
	methods:{
		updateFoto: function(urlFoto){
			var body = {
				data: {
					nama: this.dataUser.nama,
					urlFoto: urlFoto
				}
			};

			axios.post('/users/profile/update', body, {
				headers:{
					'x-temuin-token': this.$session.accessToken
				}
			}).then(response => {
				var data = response.data.data;
				if(data.nama){
					this.dataUser.nama = data.nama;
				}

				if(data.email){
					this.dataUser.email = data.email;
				}

				if(data.username){
					this.dataUser.username = data.username;
				}

				if(data.urlFoto){
					this.dataUser.urlFoto = data.urlFoto;
				}
			}).catch(err => {
				console.log(JSON.stringify(err));
			});
		}
	},
	created:function(){
		axios.get('/users/profile', { headers: { 'x-temuin-token': this.$session.accessToken }})
			.then(response => {
				var data = response.data.data;
				if(data.nama){
					this.dataUser.nama = data.nama;
				}

				if(data.email){
					this.dataUser.email = data.email;
				}

				if(data.username){
					this.dataUser.username = data.username;
				}

				if(data.urlFoto){
					this.dataUser.urlFoto = data.urlFoto;
				}
				//kurang url foto
			}).catch(err => {
				this.snackbar.msg = "Gagal memuat data";
				this.snackbar.show = true;
			}
		);
	},
	mounted: function(){
		//listener untuk pilih file dari storage
		var uploader = document.getElementById('pilih-foto');
		uploader.addEventListener('change', (event) => {
			//enable loading upload
			this.progressBar.show = true;

			//get file
			var file = event.target.files[0];
			
			//init ref
			var ref = firebase.storage().ref('/profileImage/img_'+ Date.now() + file.name);
			
			//upload
			var upload = ref.put(file);
			upload.on('state_changed', 
				//update progress
				(snapshot) => {
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					this.progressBar.value = parseInt(progress, 10);
				},
				//error
				(err) => {
					this.progressBar.show = false;
					this.snackbar.msg = err.message;
					this.snackbar.show = true;
				},
				//complete
				() => {
					this.progressBar.show = false;
					this.updateFoto(upload.snapshot.downloadURL);
				}
			);
		});
	}
}
</script>

<style>
.progress-linear{
	margin: 0px;
}
</style>
