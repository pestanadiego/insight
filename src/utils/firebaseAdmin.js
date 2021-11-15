var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const eliminateUser = (uid) => {
admin.auth().deleteUser(uid).then(() => {
        console.log('El usuario ha sido eliminado');
    }).catch((error) => {
        console.log('Error'. error);
    });
}
