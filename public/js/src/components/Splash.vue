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
module.exports = {
   created: function(){
      console.log('dibuat');

      //sementara
      var timer = 3000;
      var countDown = setInterval(() => {
         timer = timer - 1000;
         if(timer == 0){
            clearInterval(countDown);
            this.$emit('change-screen', 'Login');
         }
      }, 1000);
   }
}
</script>

