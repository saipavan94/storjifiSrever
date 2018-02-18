const express = require('express');
const router = express.Router();
const url = require('url');
const Entry = require('../models/Entry');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

module.exports = (req, res, next) => {
  const bucket = req.params.bucket_id;
  const file = req.params.file_id;
  const uuid = guid();
  const hostname = process.env.HOSTNAME || 'localhost:9000'
  const fullUrl = url.format(`${hostname}/download/${uuid}`);

  const entry = new Entry({
    bucket: bucket,
    file: file,
    uuid: uuid,
    url: fullUrl
  });

  entry.save()
    .then((result) => {
      return res.render('share', {
        layout: 'layout',
        title: 'Share a file',
        uuid: uuid,
        bucket: bucket,
        file: file,
        url: fullUrl
      });

    })
    .catch((err) => console.log('Error saving entry: ', err));
};
