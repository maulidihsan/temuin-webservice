<template>
   <div class="splash uk-flex uk-flex-middle uk-flex-center">
      <div>
         <img src="/public/img/LogoWhite.png" width="110">
         <h3 style="font-family: Nexa Bold; color: white;margin: 8px;" class="uk-text-center">
            TemuIn
         </h3>
      </div>
   </div>
</template>

<script>
const axios = require('axios');

module.exports = {
   data(){
      return{
         windowSupport:{
            cache: false
         }
      }
   },
   created: function(){
      //cek support cache
      if (!('caches' in self)) {
         this.windowSupport.cache = false;
      }else{
         this.windowSupport.cache = true;
      }

      if(this.windowSupport.cache){
         //cek cache data login
         caches.open('temuin-ch').then(cache => {
            cache.match(new Request('/users/authentication')).then(response => {
               if(!response){
                  return this.$emit('change-screen', 'Login');
               }
               //retrieve data cache
               response.json().then(data => {
                  var userData = data.data.data;
                  //console.log(JSON.stringify(userData));

                  axios.post('/users/authentication/refresh', {
                     usernameOrEmail: userData.user.username,
                     refreshToken: userData.refreshToken
                  }).then(response => {
                     //console.log(JSON.stringify(response.data.accessToken));
                     userData.accessToken = response.data.accessToken;

                     //userData sudah berbentuk data yang diperlukan pada sessionInit
                     this.$emit('initSession', userData);
                     return this.$emit('change-screen', 'MainFrame');
                  }).catch(err => {
                     return this.$emit('change-screen', 'Login');         
                  });
               });
            });
         });
      }else{
         return this.$emit('change-screen', 'Login');  
      }   
   }
}
</script>

