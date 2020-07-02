const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
require('@tensorflow/tfjs-node');
const knnClassifier = require('@tensorflow-models/knn-classifier');

const fs = require('fs');
const jpeg = require('jpeg-js');
const path = require('path');

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
let classifier;
let mobilenetModel;
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

const init = async () => {
  // Create the classifier.
  classifier = knnClassifier.create();
  // Load mobilenet.
  mobilenetModel = await mobilenet.load();
  // eslint-disable-next-line no-console
  if (process.argv[2] === 'train') {
    trainModel();
  } else {
    predict();
  }
};

async function trainModel() {
  // Add MobileNet activations to the model repeatedly for all classes.
  const data = await fs.promises.readFile(path.join(__dirname, 'dataset.json'), 'utf8');
  const parseData = JSON.parse(data);
  const tensors = parseData.map(([label, data, shape]) => {
    return { [label]: tf.tensor2d(data, shape, 'float32') };
  });
  const dataset = Object.assign({}, ...tensors);
  classifier.setClassifierDataset(dataset);

  let index = 0;

  while (fs.existsSync(path.join(__dirname, `/images/dog/image${index}.jpg`))) {
    const img = readImage(path.join(__dirname, `/images/dog/image${index}.jpg`));
    const input = image2Input(img, NUMBER_OF_CHANNELS);
    const logits = mobilenetModel.infer(input, 'conv_preds');
    classifier.addExample(logits, 'boxer');
    console.log(`image${index} added`);
    index++;
  }

  const str = JSON.stringify(Object.entries(classifier.getClassifierDataset()).map(([label, data]) => [label, Array.from(data.dataSync()), data.shape]));
  console.log(classifier.getClassifierDataset());
  fs.writeFile('./dataset.json', str, 'utf8', err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });
}

async function predict(imgUrl) {
  // Make a prediction.

  const img10 = readImage(path.join(__dirname, '/images/husky.jpg'));
  const input10 = image2Input(img10, NUMBER_OF_CHANNELS);
  const xlogits = mobilenetModel.infer(input10, 'conv_preds');

  const data = await fs.promises.readFile(path.join(__dirname, 'dataset.json'), 'utf8');
  const parseData = JSON.parse(data);
  const tensors = parseData.map(([label, data, shape]) => {
    return { [label]: tf.tensor2d(data, shape, 'float32') };
  });
  const dataset = Object.assign({}, ...tensors);
  classifier.setClassifierDataset(dataset);

  let predictions = null;
  try {
    predictions = await classifier.predictClass(xlogits);
  } catch (err) {
    process.stdout.write(err);
  }
  console.log(predictions);
}

init()
;
