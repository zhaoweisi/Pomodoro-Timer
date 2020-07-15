/* global gapi */

// This is your plugin object. It can be exported to be used anywhere.
const LogoutPlugin = {
    // The install method is all that needs to exist on the plugin object.
    // It takes the global Vue object as well as user-defined options.
    install(Vue) {

        Vue.directive('google-signout-button', {
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
                    OnsignOut
                  )
                })
              }
              

              function OnsignOut(googleUser) {
                vnode.context.OnGoogleAuthSignOut(googleUser.disconnect())
              }

              function CheckComponentMethods() {
                if (!vnode.context.OnGoogleAuthSignOut) {
                  throw new Error('The method OnGoogleAuthSignOut must be defined on the component')
                }
              }
            }
          })  

      // We call Vue.mixin() here to inject functionality into all components.
        Vue.mixin({
        // Anything added to a mixin will be injected into all components.
        // In this case, the mounted() method runs when the component is added to the DOM.
        mounted() {
          console.log('Mounted 2!');
        }
      });
    }
  };
  
  export default LogoutPlugin;
