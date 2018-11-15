// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD4yxbRne-zq2BSlUp1o0ja6F6jLIGrX3Q',
    authDomain: 'autohub-557b1.firebaseapp.com',
    databaseURL: 'https://autohub-557b1.firebaseio.com',
    projectId: 'autohub-557b1',
    storageBucket: 'autohub-557b1.appspot.com',
    messagingSenderId: '385445687853'
  },
  version: require('../../package.json').version
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
