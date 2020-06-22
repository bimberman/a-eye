const tf = require('@tensorflow/tfjs')
const mobilenet = require('@tensorflow-models/mobilenet');
require('@tensorflow/tfjs-node')
const knnClassifier = require('@tensorflow-models/knn-classifier');

const fs = require('fs');
const jpeg = require('jpeg-js');

import tf from '@tensorflow/tfjs';

const NUMBER_OF_CHANNELS = 3;
const targetImage = document.getElementById('target-image');
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

const imageToInput = (image, numChannels) => {
  const values = imageByteArray(image, numChannels);
  const outShape = [image.height, image.width, numChannels];
  const input = tf.tensor3d(values, outShape, 'int32');

  return input;
};

const image2Input = (image, numChannels) => {
  const values = imageByteArray(image, numChannels);
  const outShape = [image.height, image.width, numChannels];
  const input = tf.tensor(values, outShape, 'int32');

  return input;
};

const classify = async path => {

  classifier = knnClassifier.create();
  const mn_model = await mobilenet.load();
  const str = fs.readFileSync('./dataset.json', 'utf8');
  classifier.setClassifierDataset(Object.fromEntries(JSON.parse(str).map(([label, data, shape]) => [label, tf.tensor(data, shape)])));

  // let labels = Object.keys(modelObject)

  // labels.forEach(label => {
  //   console.log(logits[label].dataSync())
  const img = readImage(path);
  const input = image2Input(img, NUMBER_OF_CHANNELS);
  const xlogits = mn_model.infer(input, 'conv_preds');
  // console.log('Predictions:');
  // console.log(classifier.predictClass(xlogits));
  let predictions;
  try {
    predictions = await classifier.predictClass(xlogits);
  } catch (err) {
    process.stdout.write(err);
  }
  // const predictions = await modelObject.classify(input)

  console.log('classification results:', predictions);
};

if (process.argv.length !== 3) throw new Error('incorrect arguments: node script.js <IMAGE_FILE>');

classify(targetImage);
