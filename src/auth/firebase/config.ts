
const firebaseConfig1 = {
  apiKey: process.env.FR_API_KEY,
  authDomain: process.env.FR_AUTH_DOMAIN,
  projectId: process.env.FR_PROYECT_ID,
  storageBucket: process.env.FR_STORAGE_BUCKET,
  messagingSenderId: process.env.FR_MESSAG,
  appId: process.env.FR_APP_ID,
  measurementId: process.env.FR_MESURMENT_ID
};

const firebaseConfig ={
  type: process.env.FR_TYPE,
  project_id: process.env.FR_PROYECT_ID,
  private_key_id: process.env.FR_PRIVATE_KEY_ID,
  private_key: process.env.FR_PRIVATE_KEY,
  client_email: process.env.FR_CLIENT_EMAIL,
  client_id: process.env.FR_CLIENT_ID,
  auth_uri: process.env.FR_AUTH_URL,
  token_uri: process.env.FR_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FR_AUTH_PROVIDER_X509,
  client_x509_cert_url: process.env.FR_CLIENT_X509,
  universe_domain: process.env.FR_UNIVERSE_DOMAIN
}
const firebaseConfig2 ={
  "type": process.env.FR_TYPE,
  "project_id": process.env.FR_PROYECT_ID,
  "private_key_id": process.env.FR_PRIVATE_KEY_ID,
  "private_key": process.env.FR_PRIVATE_KEY,
  "client_email": process.env.FR_CLIENT_EMAIL,
  "client_id": process.env.FR_CLIENT_ID,
  "auth_uri": process.env.FR_AUTH_URL,
  "token_uri": process.env.FR_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FR_AUTH_PROVIDER_X509,
  "client_x509_cert_url": process.env.FR_CLIENT_X509,
  "universe_domain": process.env.FR_UNIVERSE_DOMAIN
}
export { 
  firebaseConfig2
};

