const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
require('@tensorflow/tfjs-node');
const knnClassifier = require('@tensorflow-models/knn-classifier');
const path = require('path');

const fs = require('fs');
const jpeg = require('jpeg-js');
const Jimp = require('jimp');

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

const image2Input = (image, numChannels) => {
  const values = imageByteArray(image, numChannels);
  const outShape = [image.height, image.width, numChannels];
  const input = tf.tensor(values, outShape, 'int32');

  return input;
};

const datasetPath = path.join(__dirname, 'dataset.json');

const classify = async path => {
  if (path.split('.').includes('png')) {
    Jimp.read(path, function (err, image) {
      if (err) {
        console.error(err);
      } else {
        path = path.split('.')[0] + '.jpg';
        image.write(path);
      }
    });
  }
  const mobilenetModel = await mobilenet.load();
  const img = readImage(path);
  const input = image2Input(img, NUMBER_OF_CHANNELS);
  const logits = mobilenetModel.infer(input, 'conv_preds');

  const classifier = knnClassifier.create();
  const data = await fs.promises.readFile(datasetPath, 'utf8');
  const parseData = JSON.parse(data);
  const tensors = parseData.map(([label, data, shape]) => {
    return { [label]: tf.tensor2d(data, shape, 'float32') };
  });

  const dataset = Object.assign({}, ...tensors);
  classifier.setClassifierDataset(dataset);

  // eslint-disable-next-line no-console

  const predictions = await classifier.predictClass(logits);

  return predictions;
};

module.exports = classify;
