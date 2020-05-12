const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');
const https = require('https');
const fs = require('fs');

async function loadImg(buffer) {
  return Jimp.read(buffer).then(
    (image) => {
      const p = [];
      image.resize(150, 150);

      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function test(
        x,
        y,
        idx
      ) {
        p.push(this.bitmap.data[idx + 0]);
        p.push(this.bitmap.data[idx + 1]);
        p.push(this.bitmap.data[idx + 2]);
      });
      return tf.tensor4d(p, [1, image.bitmap.width, image.bitmap.height, 3]);
    }
    ).catch(
    (err) => {
      console.log(err);
    }
  )
}

async function predict(buffer) {
  const input = await loadImg(buffer);

  predictions = await model.predict(input);

  // console.log(predictions.dataSync());

  const prediction = predictions
      .reshape([766])
      .argMax()
      .dataSync()[0];
  const accuracy = predictions
      .reshape([766])
      .max()
      .dataSync()[0];
  return { prediction: prediction, accuracy: accuracy };
}

async function writeOut(buffer) {
  prediction = await predict(buffer);
  console.log(prediction);
  let index;
  let side = 'obverse';
  for(let i = 0; i < obverseCodes.length; i++) {
    if(obverseCodes[i] == prediction.prediction) {
      index = i;
    }
  }
  for(let key in reverseCodes) {
    if(reverseCodes[key] == prediction.prediction) {
      index = key;
      side = 'reverse';
    }
  }
  return { index: index, side: side, accuracy: prediction.accuracy }
}

async function getCoin(buffer, res) {
  item = await writeOut(buffer);
  // console.log(item);
  let api = "https://euro-coin-418c3.firebaseio.com/euroc_v1/" + item.index + ".json";
  https.get(api, 
    response => {
      response.setEncoding('utf8');
      
      let output = '';
      response.on('data', (chunk) => {
        output += chunk;
      });
      
      response.on('end', () => {
        let obj = JSON.parse(output);
        let image = '';
        if (item.side == "obverse") {
          image = obj.obverse
        } else {
          image = obj.reverse;
        }
        response = {
          index: obj.index,
          name: obj.name,
          year: obj.year,
          image: image,
          accuracy: item.accuracy,
          country: obj.country,
          desc: obj.desc,
          specifications: {
              diameter: obj.diameter,
              material: obj.material,
              obv_codes: obj.obv_codes,
              rev_codes: obj.rev_codes,
              shape: obj.shape,
              thickness: obj.thickness,
              alignment: obj.alignment,
              weight: obj.weight,
          },
          price: obj.prices,
        };
        res.status(200).send(response);
      });

    }
  );
}

const predictImage = (req,res,next) => {
  var buffer = Buffer.from(req.body.image, 'base64');
  getCoin(buffer, res);
};

module.exports = predictImage;