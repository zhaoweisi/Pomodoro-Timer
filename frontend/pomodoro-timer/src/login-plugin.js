/* global gapi */

// This is your plugin object. It can be exported to be used anywhere.
const LoginPlugin = {
    // The install method is all that needs to exist on the plugin object.
    // It takes the global Vue object as well as user-defined options.
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
        // Anything added to a mixin will be injected into all components.
        // In this case, the mounted() method runs when the component is added to the DOM.
        mounted() {
          console.log('Mounted!');
        }
      });
    }
  };
  
  export default LoginPlugin;
