const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
module.exports = (req, res, next) => {
  let storj = req.storj;

  Entry.findOne({
    uuid: req.params.token
  })
  .then((entry) => {
    console.log('found entry', entry);

    const bucketId = entry.bucket;
    const fileId = entry.file;
    const downloadFilePath = './downloads/' + req.params.token;

    storj.resolveFile(bucketId, fileId, downloadFilePath, {
      progressCallback: (progress, downloadedBytes, totalBytes) => {
        console.log(
          'Progress: %d, DownloadedBytes: %d, TotalBytes: %d',
          progress,
          downloadedBytes,
          totalBytes
        );
      },
      finishedCallback: (err) => {
        if (err) {
          return next(err);
        }
        console.log('file download complete!');
        const fileName = req.params.token;
        res.download(downloadFilePath, fileName);
      }
    });
  })
  .catch(err => console.log('Error finding Entry:' , err));
}
