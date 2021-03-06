const dotenv = require('dotenv').config();

const serverPort = process.env.SERVER_PORT;
const serverHost = process.env.SERVER_HOST;

const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;
const mysqlDatabase = process.env.MYSQL_DATABASE;
const mysqlPort = process.env.MYSQL_PORT;

const firebaseConfig = {
  apiKey: "AIzaSyCJqx-qNKMFiKrIg6YlpJ4dLxPebcuV83I",
  authDomain: "euro-coin-418c3.firebaseapp.com",
  databaseURL: "https://euro-coin-418c3.firebaseio.com",
  projectId: "euro-coin-418c3",
  storageBucket: "euro-coin-418c3.appspot.com",
  messagingSenderId: "305029027284",
  appId: "1:305029027284:web:20df89664e8d7c3e877241"
};

const serviceAccount = {
  "type": "service_account",
  "project_id": "euro-coin-418c3",
  "private_key_id": "a302e91c172311a6e49f574ed71343725cadd29b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCTcmHLuItnQ52M\nF3fQ0LEkfdT2vy9olG43wJPsldqsTJA3xZy5D7SUc4ibReiWmnejI8OUPZDOlSSf\nsCHN1wAd6tygkL4ff2NnTRvZHmxfyPlGkP/6lvbqL+jZMMTkBs8pgzFn1/V2AkJR\nmR3Rl5RSUyXREaMsfdFJYMnophdKotMDrrKxgmA7Qxden3IMRPa4JHMNVx/UOWAa\n1cmGLH+0QfYyqH9rcZsXGFEHczmhMQJZjSxAuY6xBVzle1Q+FG8sZGQqqS7BlILK\nqPA8K3uvfKwJmb/WSmI9XpJ8R6KOtUCr7OdqZpdE1qlNx/K1aWsJoXY2XhU40pgO\nDCJSRwwRAgMBAAECggEAC/aka7iqCvNoBZVj4dwE+36AOJMToCsm9DwaZIBWMVO3\nAed1S2i0ULU9GMgn0oxu95wvwsfqB3D/ezt5yq9OsZ68TwTfgEPAR4HwqAG5bl4q\np6idNHJqT18ayACWgR/yUB52dEQIBQ6y3dcMHdTsMm/PqjKBqFr/D7KcP1W2nxYO\naeGgvcsPRw0ikBgbno4BF5MeLSTswGdCorOvhBOq92aVAS981TRgW7rJInD42RNg\n1IsZv2fnYT72OLdhZd56wcW5mXk8w/TwK6nOuH2hn4Scp+4dDwUoifeWupuE4mRu\ngHRuzSaeCC31MWQRQf2xYNmogL6Z4dGdEHKnqkFFxwKBgQDQFHO2O476JhUAiuTw\n+edSSZybABGbc/Gb2MvWs6Upaf2T5OZ/eOuvNuTqafFIiovKX67XDfXunfcErxkm\n1ydVx8xkkLaiZOjf60eN/BGsM/NgnkctSDBtp731eqgmF7E9Ma87pM+0+QaTsrBN\nMQCSSXqMO8KZP4OdKvqFf42wrwKBgQC1Zz+smG5Bj5yYg1h/vW+LXpv6zGTjITA/\nN4ERVRVbSy30NknbteavhgWr7h4m0Ew0+IxCWZuzeAT1UXup3RMmbXPyEEplykg3\nBw0dfOmXAPP+ubwBissL2wTvCE2MHZlbqB/PXpdtxqZmFYHd48h2/osha5HZfs8e\nOI9ha0q/PwKBgGFRH2kcY9tUkkAFtduKVYjjyq2nk5SL3nUQKQ2KSXWcD6/qv27g\n5AG3f8qur91IhuaoZ4JHEj1+fbggGHhU6h2xa0OhdvlujoejZ3zdZnqOdYY7oHhq\nKdQvPqWfryLZs9g184nGpCo0ycGsMc54W5cPbJRHotS/otOP9UkYhfEbAoGANwyO\nFiJr0xlxvBaf1KP4JaMgUouUUhjQO17snAXl5T57Q5D1+ObKiplxPyuTmtO7TJfg\neIIY7e2OE6QWkwWzugWdGeg3q4wnPgu1vy0Y9eokITjcBNvJol9kr+UlI1AYKehr\nPtLFwVp3RKNiNaPaQcIdFpc+O3JwCAvB9x5IIKECgYB+rq6UOo9Gi2DSehzo2rau\n8BLkfyC6WBFZwSFtetEebZk7HMs0FaADPZv7xwhhTomyT8zaUgFKFThK03/dFUN5\nfaTHBnPQ+XDFGMZBOssZpDcICDbO47/I1UlwEdWP74kFN+I7/U8KIMsZu4Vj22id\nJxspcA0MzIFr6P+FUOMVxQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-qggms@euro-coin-418c3.iam.gserviceaccount.com",
  "client_id": "112036685700960459997",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qggms%40euro-coin-418c3.iam.gserviceaccount.com"
};

module.exports = {
  server: {
    port: serverPort,
    host: serverHost
  },
  mysql: {
    user: mysqlUser,
    password: mysqlPassword,
    database: mysqlDatabase,
    port: mysqlPort
  },
  fbConfig: firebaseConfig,
  fbServiceAcount: serviceAccount
}