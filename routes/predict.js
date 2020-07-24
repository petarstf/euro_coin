const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');
const https = require('https');

const fs = require('fs');

async function cropImg(image) {
  return Jimp.read('crop1.png').then(async img => {
    await image.composite(img, 0, 0).write('cropped.png');
    console.log('Cropped');
    return true;
  });
}

async function loadImg(buffer) {
  return Jimp.read(buffer).then(
    async (image) => {
      // await cropImg(image);
      console.log('Uncropped');
      // image.write('uncropped.png');
      const p = [];
      image.resize(150, 150);
      // image.write('uncropped150.png');

      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function test(
        x,
        y,
        idx
      ) {
        p.push(this.bitmap.data[idx + 0]/255.0);
        p.push(this.bitmap.data[idx + 1]/255.0);
        p.push(this.bitmap.data[idx + 2]/255.0);
      });

      return tf.tensor4d(p, [1, image.bitmap.width, image.bitmap.height, 3]);
    }
    ).catch(
    (err) => {
      console.log(err);
    }
  )
}

async function checkIfCoin(buffer) {
  const input = await loadImg(buffer);

  predictions = await modelL1.predict(input);

  var type = ['Not a coin', 'Coin'];

  const prediction = predictions
        .flatten()
        .dataSync()[0];
  console.log('Type of input: ', type[prediction]);
  return prediction;
}

async function checkWhichCoin(buffer) {
  const input = await loadImg(buffer);
  predictions = await modelL2.predict(input);
  const prediction = predictions
        .flatten()
        .argMax()
        .dataSync()[0];
  const accuracy = predictions
        .flatten()
        .max()
        .dataSync()[0];
  return { prediction, accuracy };
}

async function predCoin(buffer, model) {
  const input = await loadImg(buffer);
  predictions = await model.predict(input);

  const prediction = predictions.flatten().argMax().dataSync()[0];
  const accuracy = predictions.flatten().max().dataSync()[0];

  return { prediction: prediction, accuracy: accuracy };
}

async function writeOut(buffer, model, coinClass) {
  prediction = await predCoin(buffer, model);

  var side = 'obverse';
  var newCoin;

  coins.forEach(coin => {
    if(coin.obvCodes == prediction.prediction && coin.class == coinClass) {
      index = coin.index;
      newCoin = coin;
    } else if(coin.revCodes == prediction.prediction && coin.class == coinClass) {
      index = coin.index;
      side = 'reverse';
      newCoin = coin;
    }
  });

  return { coin: newCoin, side: side, accuracy: (prediction.accuracy*100).toFixed(2) }
}

async function getCoin(buffer, model, coinClass, res) {
  item = await writeOut(buffer, model, coinClass);
  res.status(200).send(item);
}

const predictImage = async (req,res,next) => {
  var buffer = Buffer.from(req.body.image, 'base64');

  if(await checkIfCoin(buffer)) {
    
      var coinClass = await checkWhichCoin(buffer);
      var classes = ['Other', '1 Euro', '2 Euro']
      
      console.log("Coin class: ", classes[coinClass.prediction], '\nAccuracy: ', (coinClass.accuracy*100).toFixed(2));

      switch (coinClass.prediction) {
        case 1:
          // 1EuroModel
          getCoin(buffer, model1e, coinClass.prediction, res);
          break;
        case 2:
          // 2EuroModel
          getCoin(buffer, model2e, coinClass.prediction, res);
          break
        case 0:
          // OtherEuroModel
          getCoin(buffer, modelOther, coinClass.prediction, res);
          break;
        default:
          console.log("Something went wrong!");
          break;
      }

  } else {
    res.status(200).send({ accuracy: 0.00, message: 'Coin was not recognized' });
  }

};

module.exports = predictImage;