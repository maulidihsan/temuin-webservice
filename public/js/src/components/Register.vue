<template>
  <div class="uk-flex uk-flex-center">
    	<div class="main-content">
			<div class="uk-flex uk-flex-center uk-flex-middle">
				<img src="/public/img/LogoColor.png" width="60">
				<div class="uk-flex uk-flex-center" style="font-family: Nexa Bold;margin: 8px;">
					<div style="color: #8BC34A;" class="temuin">Temu</div>
					<div style="color: black" class="temuin">In</div>
				</div>
			</div>

			<div style="margin-top: 42px;">
				<v-flex xs12>
					<v-alert :type="allert.type" v-model="allert.status" dismissible transition="scale-transition"> 
						<div class="uk-text-break" style="font-family: Gibson Regular; font-size: 12px">
							{{ allert.message }} 
						</div>
					</v-alert>
				</v-flex>

				<form>
					<input class="uk-input form-input" type="text" placeholder="nama" v-model="inputData.nama">
					<input class="uk-input form-input" type="email" placeholder="email" v-model="inputData.email">
					<input class="uk-input form-input" type="text" placeholder="username" v-model="inputData.username">
					<label class="form-input">jenis kelamin</label>
					<div>
						<div class="uk-margin uk-grid-small uk-child-width-auto uk-grid uk-flex uk-flex-center" style="margin: 0px;">
							<label class="form-radio"><input class="uk-radio" type="radio" name="jk" v-on:click="jkChoice('Laki-Laki')"> Laki-laki</label>
							<label class="form-radio"><input class="uk-radio" type="radio" name="jk" v-on:click="jkChoice('Perempuan')"> Perempuan</label>
						</div>
					</div>
					
					<v-flex xs12>
						<v-dialog ref="dialog" persistent v-model="modalPicker" lazy full-width width="290px" :return-value.sync="date">
							<input class="uk-input form-input" type="text" placeholder="tanggal lahir" slot="activator" v-bind:value="inputData.ttl">
							<v-date-picker color="light-green" header-color="light-green" v-model="inputData.ttl" scrollable>
								<v-spacer></v-spacer>
								<v-btn flat @click="modalPicker = false">Cancel</v-btn>
								<v-btn flat color="light-green" @click="$refs.dialog.save(date)">OK</v-btn>
							</v-date-picker>
						</v-dialog>
					</v-flex>

					<input class="uk-input form-input" type="password" placeholder="password" v-model="inputData.password">
				</form>
			</div>

			<div style="margin-top: 42px;" class="uk-flex uk-flex-center">
				<sync-loader v-bind:loading="submitLoading.show" :color="submitLoading.color" size="10"></sync-loader>
				<button class="uk-button uk-width-1-1" v-bind:style="bottonSubmitStyle" v-on:click="registerClick()">
					lanjutkan
				</button>
			</div>

			<div style="margin-top: 64px;" class="uk-flex uk-flex-center">
				<button class="uk-button uk-button-small uk-width-1-3" style="font-size: 12px; font-family: Gibson Regular;" v-on:click="$emit('change-screen', 'Login')">masuk</button>
				<button class="uk-button uk-button-small uk-width-1-3" style="background-color: #8BC34A; color: white; font-size: 12px; font-family: Gibson Regular;">daftar</button>
			</div>

			<div style="margin-top: 42px; margin-bottom: 24px">
				<div class="uk-text-center" style="font-size: 12px; font-family: Gibson Regular Italic">
					Dengan mengklik lanjutkan anda setuju dengan <b>persyaratan layanan</b> kami
				</div>
			</div>
    	</div>
  	</div>
</template>

<script>
const axios = require('axios');
const SyncLoader = require('vue-spinner/dist/vue-spinner.min').SyncLoader;

module.exports = {
   data(){
      return{
			//untuk status pikcer kalender
         modalPicker: false,
			//untuk menyimpan form input data
         inputData:{
				nama: null,
				email: null,
				username: null,
				ttl: null,
				jenisKelamin: null,
				password: null
			},
			//untuk status dan data allert
			allert:{
				type: null,
				typeArr: ['success', 'error'],
				message: null,
				status: false
			},
			//untuk status dan style loading spinner
			submitLoading:{
				show: false,
				color: '#8BC34A'
			},
			//untuk status dan style button lanjutkan
			bottonSubmitStyle:{
				'background-color': '#8BC34A',
				'color': 'white',
				'display': null
			}
      }
   },
   methods:{
		//fungsi dipanggil pilih jenis kelamin
      jkChoice: function(jenisKelamin){
         this.inputData.jenisKelamin = jenisKelamin;
		},
		//fungsi dipanggil saat tombol lanjutkan
		registerClick: function(){
			this.startSubmitLoading();
			axios.post('/users/registration', this.inputData)
			.then(response => {
				this.finishSubmitLoading();
				console.log(JSON.stringify(response.data));
				this.allert.message = 'Registerasi berhasil';
				this.allert.type = this.allert.typeArr[0];
				this.allert.status = true;

				//redirect ke login
				this.$emit('change-screen', 'Login');
			})
			.catch(error => {
				this.finishSubmitLoading();
				this.allert.message = 'Data tidak diisi dengan benar';
				this.allert.type = this.allert.typeArr[1];
				this.allert.status = true;
				console.log(JSON.stringify(error.response.data));
			});
		},
		//saat mulai loading request
		startSubmitLoading: function(){
			this.submitLoading.show = true;
			this.bottonSubmitStyle.display = 'none';
		},
		//saat loading selesai
		finishSubmitLoading: function(){
			this.submitLoading.show = false;
			this.bottonSubmitStyle.display = null;
		}
	},
	components:{
		'sync-loader': SyncLoader
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
.temuin{
   font-size: 30px;
}
.main-content{
   margin-top: 62px; 
   margin-right: 64px;
   margin-left: 64px;
   max-width: 412px;
}
.form-input{
   font-family: Gibson Regular;
   font-size: 12px;
   margin-top: 8px;
}
.picker__body, .picker__actions{
   background-color: white;
}
.form-radio{
   font-family: Gibson Regular;
   font-size: 12px;
}
.success{
	background-color: #4caf50;
}
.error{
	background-color: #ff5252;
}
</style>
