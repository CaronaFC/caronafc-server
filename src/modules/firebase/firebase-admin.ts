import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Or use a service account key
});

export default admin;