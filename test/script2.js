const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
require('@tensorflow/tfjs-node');
const knnClassifier = require('@tensorflow-models/knn-classifier');

const fs = require('fs');
const jpeg = require('jpeg-js');

const NUMBER_OF_CHANNELS = 3;

const readImage = path => {
  const buf = fs.readFileSync(path);
  const pixels = jpeg.decode(buf, true);
  return pixels;
};

const imageByteArray = (image, numChannels) => {
  const pixels = image.data;
  const numPixels = image.width * image.height;
  const values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++) {
    for (let channel = 0; channel < numChannels; ++channel) {
      values[i * numChannels + channel] = pixels[i * 4 + channel];
    }
  }

  return values;
};

// const imageToInput = (image, numChannels) => {
//   const values = imageByteArray(image, numChannels);
//   const outShape = [image.height, image.width, numChannels];
//   const input = tf.tensor3d(values, outShape, 'int32');

//   return input;
// };

const image2Input = (image, numChannels) => {
  const values = imageByteArray(image, numChannels);
  const outShape = [image.height, image.width, numChannels];
  const input = tf.tensor(values, outShape, 'int32');

  return input;
};

const setToClasify = async path => {
  const mobilenetModel = await mobilenet.load();
  const img = readImage(path);
  const input = image2Input(img, NUMBER_OF_CHANNELS);
  const logits = mobilenetModel.infer(input, 'conv_preds');

  classify(logits);
};

const classify = async logits => {
  const classifier = knnClassifier.create();
  const data = await fs.promises.readFile('./dataset.json', 'utf8', (err, data) => {
    if (err) throw err;
    return data;
  });
  classifier.setClassifierDataset(Object.fromEntries(JSON.parse(data).map(([label, data, shape]) => [label, tf.tensor(data, shape)])));

  const predictions = await classifier.predictClass(logits);

  // eslint-disable-next-line no-console
  console.log('classification results:', predictions);
};

module.exports = classify;

if (process.argv.length !== 3) throw new Error('incorrect arguments: node script.js <IMAGE_FILE>');

setToClasify(process.argv[2]);
