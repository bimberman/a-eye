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
  const image = readImage(path);
  const input = imageToInput(image, NUMBER_OF_CHANNELS);

  const mn_model = await mobilenet.load();
  const predictions = await mn_model.classify(input);

  console.log('classification results:', predictions);
};

const tryToAddExample = async () => {
  // Create the classifier.
  const classifier = knnClassifier.create();

  // Load mobilenet.
  const mn_model = await mobilenet.load();

  // Add MobileNet activations to the model repeatedly for all classes.
  const img0 = readImage('./images/golden.jpg');
  const input0 = image2Input(img0, NUMBER_OF_CHANNELS);
  const logits0 = mn_model.infer(input0, 'conv_preds');
  classifier.addExample(logits0, 'golden retriever');

  const img1 = readImage('./images/dalmatian.jpg');
  const input1 = image2Input(img1, NUMBER_OF_CHANNELS);
  const logits1 = mn_model.infer(input1, 'conv_preds');
  classifier.addExample(logits1, 'dalmatian');

  const img2 = readImage('./images/golden2.jpg');
  const input2 = image2Input(img2, NUMBER_OF_CHANNELS);
  const logits2 = mn_model.infer(input2, 'conv_preds');
  classifier.addExample(logits2, 'golden retriever');

  const img3 = readImage('./images/golden3.jpg');
  const input3 = image2Input(img3, NUMBER_OF_CHANNELS);
  const logits3 = mn_model.infer(input3, 'conv_preds');
  classifier.addExample(logits3, 'golden retriever');

  const img4 = readImage('./images/dalmatian2.jpg');
  const input4 = image2Input(img4, NUMBER_OF_CHANNELS);
  const logits4 = mn_model.infer(input4, 'conv_preds');
  classifier.addExample(logits4, 'dalmatian');

  const img5 = readImage('./images/dalmatian3.jpg');
  const input5 = image2Input(img5, NUMBER_OF_CHANNELS);
  const logits5 = mn_model.infer(input5, 'conv_preds');
  classifier.addExample(logits5, 'dalmatian');

  const img6 = readImage('./images/pug.jpg');
  const input6 = image2Input(img6, NUMBER_OF_CHANNELS);
  const logits6 = mn_model.infer(input6, 'conv_preds');
  classifier.addExample(logits6, 'pug');

  const img7 = readImage('./images/pug2.jpg');
  const input7 = image2Input(img7, NUMBER_OF_CHANNELS);
  const logits7 = mn_model.infer(input7, 'conv_preds');
  classifier.addExample(logits7, 'pug');

  const img8 = readImage('./images/pug3.jpg');
  const input8 = image2Input(img8, NUMBER_OF_CHANNELS);
  const logits8 = mn_model.infer(input8, 'conv_preds');
  classifier.addExample(logits8, 'pug');

  const img9 = readImage('./images/frenchie.jpg');
  const input9 = image2Input(img9, NUMBER_OF_CHANNELS);
  const logits9 = mn_model.infer(input9, 'conv_preds');
  classifier.addExample(logits9, 'frenchie');

  const img11 = readImage('./images/frenchie2.jpg');
  const input11 = image2Input(img11, NUMBER_OF_CHANNELS);
  const logits11 = mn_model.infer(input11, 'conv_preds');
  classifier.addExample(logits11, 'frenchie');

  const img12 = readImage('./images/frenchie3.jpg');
  const input12 = image2Input(img12, NUMBER_OF_CHANNELS);
  const logits12 = mn_model.infer(input12, 'conv_preds');
  classifier.addExample(logits12, 'frenchie');

  const img13 = readImage('./images/pug4.jpg');
  const input13 = image2Input(img13, NUMBER_OF_CHANNELS);
  const logits13 = mn_model.infer(input13, 'conv_preds');
  classifier.addExample(logits13, 'pug');

  const img14 = readImage('./images/frenchie4.jpg');
  const input14 = image2Input(img14, NUMBER_OF_CHANNELS);
  const logits14 = mn_model.infer(input14, 'conv_preds');
  classifier.addExample(logits14, 'frenchie');

  const img15 = readImage('./images/pug4.jpg');
  const input15 = image2Input(img15, NUMBER_OF_CHANNELS);
  const logits15 = mn_model.infer(input15, 'conv_preds');
  classifier.addExample(logits15, 'pug');

  // Make a prediction.
  const img10 = readImage('./images/pug4.jpg');
  const input10 = image2Input(img10, NUMBER_OF_CHANNELS);
  const xlogits = mn_model.infer(input10, 'conv_preds');
  // console.log('Predictions:');
  // console.log(classifier.predictClass(xlogits));
  let predictions;
  try {
    predictions = await classifier.predictClass(xlogits);
  } catch (err) {
    process.stdout.write(err);
  }

  // console.log('classification results:', predictions)
  // conole.log("Classifier dataset:", classifier.getClassifierDataset())

  const str = JSON.stringify(Object.entries(classifier.getClassifierDataset()).map(([label, data]) => [label, Array.from(data.dataSync()), data.shape]));

  fs.writeFile('./dataset.json', str, 'utf8', err => {
    if (err) { console.error(err); }
  });
};

const addImage = async (url, label) => {
  const mn_model = mobilenet;
};

// if (process.argv.length !== 3) throw new Error('incorrect arguments: node script.js <IMAGE_FILE>')

// classify(process.argv[2])
tryToAddExample();
