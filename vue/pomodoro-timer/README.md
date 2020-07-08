# pomodoro-timer

## Project prerequest
```
sudo npm install -g @vue/cli 
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Edit File
In file `keys.js`
change `googleClientID`

In `vue/node_modules/vue-google-signin-button-directive/index.js`
change line 27 to `vnode.context.OnGoogleAuthSuccess(googleUser.getBasicProfile())`