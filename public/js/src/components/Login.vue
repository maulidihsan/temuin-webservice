<template>
  <div>
    <div class="uk-width-1-1" style="height: 162px; background-color: #8BC34A"></div>
    <div class="uk-flex uk-flex-center" style="margin-top: -88px;">
      <div class="uk-border-circle" style="padding: 14px; background-color: white;">
        <img src="/public/img/LogoColor.png" width="94" height="94">
      </div>
    </div>
    <div class="uk-flex uk-flex-center">
      <div class="login-content">
        <v-flex xs12>
					<v-alert :type="allert.type" v-model="allert.status" dismissible transition="scale-transition"> 
						<div class="uk-text-break" style="font-family: Gibson Regular; font-size: 12px">
							{{ allert.message }} 
						</div>
					</v-alert>
				</v-flex>

        <div>
          <form>
            <input class="uk-input form-input" type="text" placeholder="email atau username" v-model="loginData.usernameOrEmail">
            <input class="uk-input form-input" type="password" placeholder="password" v-model="loginData.password">
          </form>
        </div>

        <div style="margin-top: 42px;">
          <sync-loader v-bind:loading="submitLoading.show" :color="submitLoading.color" size="10"></sync-loader>
          <button class="uk-button uk-width-1-1" :style="bottonSubmitStyle" v-on:click="submitLogin">lanjutkan</button>
        </div>

        <div style="margin-top: 64px;" class="uk-flex uk-flex-center">
          <button class="uk-button uk-button-small uk-width-1-3" style="background-color: #8BC34A; color: white; font-size: 12px; font-family: Gibson Regular;">masuk</button>
          <button class="uk-button uk-button-small uk-width-1-3" style="font-size: 12px; font-family: Gibson Regular;" v-on:click="$emit('change-screen', 'Register')">daftar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
const SyncLoader = require('vue-spinner/dist/vue-spinner.min').SyncLoader;

module.exports = {
  data: function(){
    return{
      loginData:{
        usernameOrEmail: null,
        password: null
      },
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
    startLoading: function(){
      this.submitLoading.show = true;
      this.bottonSubmitStyle.display = 'none';
    },
    finishLoading: function(){
      this.submitLoading.show = false;
      this.bottonSubmitStyle.display = null;
    },
    submitLogin(){
      this.startLoading();
      var data = {
        usernameOrEmail: this.loginData.usernameOrEmail,
        password: this.loginData.password
      };

      axios.post('/users/authentication', data)
        .then(response => {
          var responseBody = response.data;
          console.log(JSON.stringify(responseBody.data));
          this.finishLoading();
          this.allert.type = this.allert.typeArr[0];
          this.allert.message = 'Login berhasil';
          this.allert.status = true;
          this.$emit('initSession', responseBody.data)
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          this.finishLoading();
          this.allert.type = this.allert.typeArr[1];
          this.allert.message = 'Login gagal, silahkan cek isian kembali';
          this.allert.status = true;
        });
    }
  },
  components:{
    'sync-loader': SyncLoader
  }
}
</script>


<style>
.login-content{
   margin-top: 36px; 
   margin-right: 64px;
   margin-left: 64px;
   max-width: 486px;
}
</style>

