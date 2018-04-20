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
        <div>
          <form>
            <input class="uk-input form-input" type="email" placeholder="email" v-model="email">
            <input class="uk-input form-input" type="password" placeholder="password" v-model="password">
          </form>
        </div>

        <div style="margin-top: 42px;">
          <button class="uk-button uk-width-1-1" style="background-color: #8BC34A; color: white;">lanjutkan</button>
        </div>

        <div style="margin-top: 64px;" class="uk-flex uk-flex-center">
          <button class="uk-button uk-button-small uk-width-1-3" style="background-color: #8BC34A; color: white; font-size: 12px; font-family: Gibson Regular;">masuk</button>
          <button class="uk-button uk-button-small uk-width-1-3" style="font-size: 12px; font-family: Gibson Regular;" v-on:click="$emit('change-screen', 'Register')">daftar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.login-content{
   margin-top: 36px; 
   margin-right: 64px;
   margin-left: 64px;
   max-width: 486px;
}
</style>

