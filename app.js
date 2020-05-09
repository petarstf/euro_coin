const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const Jimp = require('jimp');
const math = require('mathjs');
const https = require('https');

const predict = require('./routes/predict');

// const options = {
//   host: 'https://euro-coin-418c3.firebaseio.com/',
//   port: 443,
//   path: '/some/path',
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// };

let bottleneckModel;
model;

reverseCodes = {"0":602,"1":603,"24":660,"25":661,"26":664,"27":668,"28":669,"29":670,"30":671,"31":672,"32":673,"33":674,"34":684,"35":685,"36":689,"37":690,"38":691,"39":692,"40":693,"41":694,"42":695,"43":696,"44":698,"45":699,"46":700,"47":704,"48":705,"49":706,"50":710,"51":711,"52":712,"53":713,"89":730,"90":731,"91":732,"140":604,"141":605,"142":606,"143":607,"144":608,"145":609,"146":610,"147":611,"148":612,"149":613,"150":614,"151":615,"152":616,"153":617,"154":618,"155":619,"156":620,"157":621,"158":622,"159":623,"160":624,"161":625,"162":626,"163":627,"164":628,"165":629,"166":630,"167":631,"168":632,"169":633,"170":634,"171":635,"172":636,"173":637,"174":638,"175":639,"176":640,"177":641,"178":642,"179":643,"180":644,"181":645,"214":646,"215":647,"216":648,"217":649,"218":650,"219":651,"220":652,"221":653,"222":654,"223":655,"224":656,"225":657,"226":658,"227":659,"258":662,"259":663,"260":665,"261":666,"262":667,"330":675,"331":676,"332":677,"333":678,"334":679,"335":680,"336":681,"337":682,"338":683,"353":686,"354":687,"355":688,"430":697,"460":701,"461":702,"462":703,"493":707,"494":708,"495":709,"559":714,"560":715,"561":716,"562":717,"563":718,"564":719,"565":720,"566":721,"567":722,"568":723,"569":724,"570":725,"597":726,"598":727,"599":728,"600":729};
obverseCodes = [0,1,112,223,334,441,525,569,580,591,2,13,24,35,46,57,68,79,90,101,113,124,135,146,157,168,179,190,201,212,224,235,246,257,268,279,290,301,312,323,335,346,357,368,379,390,401,412,423,434,442,443,444,448,459,470,481,492,503,514,526,537,548,559,563,564,565,566,567,568,570,571,572,573,574,575,576,577,578,579,581,582,583,584,585,586,587,588,589,590,592,593,594,595,596,597,598,599,600,601,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,36,37,38,39,40,41,42,43,44,45,47,48,49,50,51,52,53,54,55,56,58,59,60,61,62,63,64,65,66,67,69,70,71,72,73,74,75,76,77,78,80,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99,100,102,103,104,105,106,107,108,109,110,111,114,115,116,117,118,119,120,121,122,123,125,126,127,128,129,130,131,132,133,134,136,137,138,139,140,141,142,143,144,145,147,148,149,150,151,152,153,154,155,156,158,159,160,161,162,163,164,165,166,167,169,170,171,172,173,174,175,176,177,178,180,181,182,183,184,185,186,187,188,189,191,192,193,194,195,196,197,198,199,200,202,203,204,205,206,207,208,209,210,211,213,214,215,216,217,218,219,220,221,222,225,226,227,228,229,230,231,232,233,234,236,237,238,239,240,241,242,243,244,245,247,248,249,250,251,252,253,254,255,256,258,259,260,261,262,263,264,265,266,267,269,270,271,272,273,274,275,276,277,278,280,281,282,283,284,285,286,287,288,289,291,292,293,294,295,296,297,298,299,300,302,303,304,305,306,307,308,309,310,311,313,314,315,316,317,318,319,320,321,322,324,325,326,327,328,329,330,331,332,333,336,337,338,339,340,341,342,343,344,345,347,348,349,350,351,352,353,354,355,356,358,359,360,361,362,363,364,365,366,367,369,370,371,372,373,374,375,376,377,378,380,381,382,383,384,385,386,387,388,389,391,392,393,394,395,396,397,398,399,400,402,403,404,405,406,407,408,409,410,411,413,414,415,416,417,418,419,420,421,422,424,425,426,427,428,429,430,431,432,433,435,436,437,438,439,440,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,445,446,447,449,450,451,452,453,454,455,456,457,458,460,461,462,463,464,465,466,467,468,469,471,472,473,474,475,476,477,478,479,480,482,483,484,485,486,487,488,489,490,491,493,494,495,496,497,498,499,500,501,502,504,505,506,507,508,509,510,511,512,513,515,516,517,518,519,520,521,522,523,524,527,528,529,530,531,532,533,534,535,536,538,539,540,541,542,543,544,545,546,547,549,550,551,552,553,554,555,556,557,558,560,561,562];


app.use(cors());
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/predict', predict);

async function start() {
  model = await tf.node.loadSavedModel('tf/model');
}

// function get_bottleneck_features(input_imgs) {
//   features = bottleneckModel.predict(input_imgs, verbose=0);
//   return features;
// }

// async function loadImg(buffer) {
//   return Jimp.read(buffer).then(
//     (image) => {
//       const p = [];
//       image
//       .resize(150, 150)
//       image.scan(0, 0, image.bitmap.width, image.bitmap.height, function test(
//         x,
//         y,
//         idx
//       ) {
//         p.push(this.bitmap.data[idx + 0]);
//         p.push(this.bitmap.data[idx + 1]);
//         p.push(this.bitmap.data[idx + 2]);
//       });
//       return tf.tensor4d(p, [1, image.bitmap.width, image.bitmap.height, 3]);
//     }
//     ).catch(
//     (err) => {
//       console.log(err);
//     }
//   )
// }

// async function predict(buffer) {
//   const input = await loadImg(buffer);
//   // input = await get_bottleneck_features(img);
//   predictions = await model.predict(input);
//   console.log(predictions.reshape([766]).dataSync(  ));
//   const prediction = predictions
//       .reshape([766])
//       .argMax()
//       .dataSync()[0];
//   const accuracy = predictions
//       .reshape([766])
//       .max()
//       .dataSync()[0];
//   return { prediction: prediction, accuracy: accuracy };
// }

// async function writeOut(buffer) {
//   prediction = await predict(buffer);
//   console.log(prediction);
//   let index;
//   let side = 'obverse';
//   for(let i = 0; i < obverseCodes.length; i++) {
//     if(obverseCodes[i] == prediction.prediction) {
//       index = i;
//     }
//   }
//   for(let key in reverseCodes) {
//     if(reverseCodes[key] == prediction.prediction) {
//       index = key;
//       side = 'reverse';
//     }
//   }
//   return { index: index, side: side, accuracy: prediction.accuracy }
// }

// async function getCoin(buffer, res) {
//   item = await writeOut(buffer);
//   let api = "https://euro-coin-418c3.firebaseio.com/" + item.index + ".json";
//   https.get(api, 
//     response => {
//       response.setEncoding('utf8');
      
//       let output = '';
//       response.on('data', (chunk) => {
//         output += chunk;
//       });
      
//       response.on('end', () => {
//         let obj = JSON.parse(output);
//         let image = '';
//         if (item.side == "obverse") {
//           image = obj.obverse
//         } else {
//           image = obj.reverse;
//         }
//         response = {
//           index: obj.index,
//           name: obj.name,
//           year: obj.year,
//           image: image,
//           accuracy: item.accuracy,
//           country: obj.country,
//           desc: obj.desc,
//           specifications: {
//               diameter: obj.diameter,
//               material: obj.material,
//               obv_codes: obj.obv_codes,
//               rev_codes: obj.rev_codes,
//               shape: obj.shape,
//               thickness: obj.thickness,
//               alignment: obj.alignment,
//               weight: obj.weight,
//           },
//           price: obj.prices,
//         };
//         res.status(200).send(response);
//       });

//     }
//   );
// }
    
start();

   

app.post('', (req, res, next) => {
  // b64 = req.body.image;
  
  // var buffer = Buffer.from(b64, 'base64');
  // // fs.writeFileSync('temp.png', buffer);

  // getCoin(buffer, res);
});

module.exports = app;
