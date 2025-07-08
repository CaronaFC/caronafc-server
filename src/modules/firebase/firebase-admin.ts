import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT

admin.initializeApp({
  credential: admin.credential.cert(String(serviceAccountPath)), // Or use a service account key
});

export default admin;