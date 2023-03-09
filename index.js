const core = require('@actions/core');
const exec = require('@actions/exec');
const https = require('https');
const fs = require('fs');

async function run() {
  try {
    const fileUrl = 'https://devpass-api-bucket.s3.amazonaws.com/testes/';
    const fileName = core.getInput('file_name');

    await downloadFile(fileUrl, fileName);
    await exec.exec('yarn test');
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function downloadFile(fileUrl, fileName) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(fileName);
    https.get(fileUrl, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', error => {
      fs.unlink(fileName);
      reject(error);
    });
  });
}

run();
