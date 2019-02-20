// const api = 'http://localhost:3000/'
const api = 'http://167.99.67.238:7000/'
const firebase = require('firebase')
const config = {
  storageBucket: "cellymut-staging.appspot.com",
  projectId: "cellymut-staging",
};
firebase.initializeApp(config);

const storage = firebase.storage()
export {
  api, storage
}
