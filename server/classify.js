const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const knnClassifier = require('@tensorflow-models/knn-classifier');

const fs = require('fs');

const classify = async logits => {
  const classifier = knnClassifier.create();
  const data = await fs.promises.readFile('./dataset.json', 'utf8', (err, data) => {
    if (err) throw err;
    return data;
  });
  classifier.setClassifierDataset(Object.fromEntries(JSON.parse(data).map(([label, data, shape]) => [label, tf.tensor(data, shape)])));

  const predictions = await classifier.predictClass(logits);

  return predictions;
};

module.exports = classify;
