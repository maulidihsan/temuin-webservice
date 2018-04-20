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
         <form>
            <input class="uk-input form-input" type="text" placeholder="nama" v-model="nama">
            <input class="uk-input form-input" type="email" placeholder="email" v-model="email">
            <input class="uk-input form-input" type="text" placeholder="username" v-model="username">
            <label class="form-input">jenis kelamin</label>
            <div>
               <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid uk-flex uk-flex-center" style="margin: 0px;">
                  <label class="form-radio"><input class="uk-radio" type="radio" name="jk" v-on:click="jkChoice('Laki-Laki')"> Laki-laki</label>
                  <label class="form-radio"><input class="uk-radio" type="radio" name="jk" v-on:click="jkChoice('Perempuan')"> Perempuan</label>
               </div>
            </div>
            
            <v-flex xs12>
               <v-dialog ref="dialog" persistent v-model="modalPicker" lazy full-width width="290px" :return-value.sync="date">
                  <input class="uk-input form-input" type="text" placeholder="tanggal lahir" slot="activator" v-model="ttl">
                  <v-date-picker color="light-green" header-color="light-green" v-model="ttl" scrollable>
                     <v-spacer></v-spacer>
                     <v-btn flat @click="modalPicker = false">Cancel</v-btn>
                     <v-btn flat color="light-green" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
               </v-dialog>
            </v-flex>

            <input class="uk-input form-input" type="password" placeholder="password" v-model="password">
         </form>
      </div>

      <div style="margin-top: 42px;">
         <button class="uk-button uk-width-1-1" style="background-color: #8BC34A; color: white;">lanjutkan</button>
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
</style>

<script>
module.exports = {
   data: function(){
      return{
         modalPicker: false,
         nama: null,
         email: null,
         username: null,
         ttl: null,
         jenisKelamin: null,
         password: null
      }
   },
   methods:{
      jkChoice: function(jenisKelamin){
         this.jenisKelamin = jenisKelamin;
      }
   }
}
</script>
