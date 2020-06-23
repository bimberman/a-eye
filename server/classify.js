const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const knnClassifier = require('@tensorflow-models/knn-classifier');

const path = require('path');
const fs = require('fs');

const datasetPath = path.join(__dirname, 'dataset.json');

const classify = async (logits, shape) => {
  const classifier = knnClassifier.create();
  const data = await fs.promises.readFile(datasetPath, 'utf8');
  const parseData = JSON.parse(data);
  const tensors = parseData.map(([label, data, shape]) => {
    return { [label]: tf.tensor2d(data, shape, 'float32') };
  });

  const dataset = Object.assign({}, ...tensors);
  classifier.setClassifierDataset(dataset);

  const predictionTensor = tf.tensor(logits, shape, 'float32');

  // eslint-disable-next-line no-console
  console.log('predictionTensor', predictionTensor);
  // const predictions = await classifier.predictClass(predictionTensor);

  // return predictions;
};

module.exports = classify;
