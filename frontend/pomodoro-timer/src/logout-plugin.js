/* global gapi */


const LogoutPlugin = {

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

      
        Vue.mixin({
        
        mounted() {
          console.log('Mounted 2!');
        }
      });
    }
  };
  
  export default LogoutPlugin;
