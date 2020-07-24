const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const Jimp = require('jimp');
const math = require('mathjs');
const https = require('https');
const fbServiceAcount = require('./utils/config').fbServiceAcount;
const fbConfig = require('./utils/config').fbConfig;
const predict = require('./routes/predict');

const admin = require('firebase-admin');

var serviceAccount = require("./euro-coin-418c3-firebase-adminsdk-qggms-a302e91c17.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: fbConfig.databaseURL,
  storageBucket: fbConfig.storageBucket
});


var db = admin.database();

var bucket = admin.storage().bucket();

var links = [];

const config = {
  action: 'read',
  expires: '03-17-2025'
};

var getFiles = async () => {
  
}



async function writeLinks() {
  var stream = fs.createWriteStream('storageLinks.csv');
  var pathName = stream.path;

  stream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
  });
  stream.on('finish', () => {
    console.log(`Wrote all the array data to file ${pathName}`);
  });

  await bucket.getFiles().then(
    files => {
      files[0].forEach(async file => {
        await file.getSignedUrl(config).then(url => {
          links.push({ name: file.metadata.name, url: url });
          stream.write(`${file.metadata.name}, ${url}\n`);
          console.log({ name: file.metadata.name, url: url });
          
        });
      });
    }
  );
}

global.coins;
global.modelL1;
global.modelL2;
global.model1e;
global.model2e;
global.modelOther;
global.model;

classesL1 = { 0: 'nocoin', 1: 'coin' };


async function init() {
  // writeLinks();
  modelL1 = await tf.node.loadSavedModel('tf/l1');
  modelL2 = await tf.node.loadSavedModel('tf/l2');
  model1e = await tf.node.loadSavedModel('tf/1e');
  model2e = await tf.node.loadSavedModel('tf/2e');
  modelOther = await tf.node.loadSavedModel('tf/other');
}
async function getCoins() {
  coins = await db.ref('/coins').once('value').then(snapshot => snapshot.val());
  console.log('Coins loaded');
}

getCoins();
init();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

app.get('', (req, res, next) => {
  res.send('Welcome to coinsrec');
})
app.post('/predict', predict);


    

module.exports = app;
