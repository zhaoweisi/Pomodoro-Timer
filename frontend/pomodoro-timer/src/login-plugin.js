/* global gapi */


const LoginPlugin = {
    
    install(Vue) {

        Vue.directive('google-signin-button', {
            bind: function (el, binding, vnode) {
              CheckComponentMethods()
              let clientId = binding.value
              let googleSignInAPI = document.createElement('script')
              googleSignInAPI.setAttribute('src', 'https://apis.google.com/js/api:client.js')
              document.head.appendChild(googleSignInAPI)
          
              googleSignInAPI.onload = InitGoogleButton
          
              function InitGoogleButton() {
                gapi.load('auth2', () => {
                  const auth2 = gapi.auth2.init({
                    client_id: clientId,
                    cookiepolicy: 'single_host_origin'
                  })
                  auth2.attachClickHandler(el, {},
                    OnSuccess,
                    Onfail
                  )
                })
              }
              function OnSuccess(googleUser) {
                vnode.context.OnGoogleAuthSuccess(googleUser.getBasicProfile())
                googleUser.disconnect()
              }
              function Onfail(error) {
                vnode.context.OnGoogleAuthFail(error)
              }
              function CheckComponentMethods() {
                if (!vnode.context.OnGoogleAuthSuccess) {
                  throw new Error('The method OnGoogleAuthSuccess must be defined on the component')
                }
          
                if (!vnode.context.OnGoogleAuthFail) {
                  throw new Error('The method OnGoogleAuthFail must be defined on the component')
                }
              }
            }
          })  

      // We call Vue.mixin() here to inject functionality into all components.
        Vue.mixin({
        
        mounted() {
          console.log('Mounted!');
        }
      });
    }
  };
  
  export default LoginPlugin;
