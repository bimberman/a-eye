
const path = require('path');
const fetch = require('node-fetch');
const download = require('image-downloader');
fetch(`https://dog.ceo/api/breed/${process.argv[2]}/images`)
  .then(result => result.json())
  .then(data => getPics(data.message, process.argv[2]));

function getPics(urlArray, breed) {
  for (let urlIndex = 0; urlIndex < urlArray.length; urlIndex++) {
    getPic(urlArray[urlIndex], urlIndex, breed);
  }
}

function getPic(url, index, breed) {
  download.image({
    url: url,
    dest: path.join(__dirname, `/images/dog/image${index}.jpg`)
  })
    .then(({ filename }) => {
      // eslint-disable-next-line no-console
      console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
    })
    .catch(err => console.error(err));
}
