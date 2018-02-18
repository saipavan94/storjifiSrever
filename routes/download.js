const express = require('express');
const router = express.Router();


module.exports = (req, res, next) => {
  const storj = req.storj;
  const bucketId = req.params.bucketId;
  const fileId = req.params.fileId;
  const downloadFilePath = './downloads/test' + Date.now() + '.jpg';

  storj.resolveFile(bucketId, fileId, downloadFilePath, {
    progressCallback: (progress, downloadedBytes, totalBytes) => {
      console.log('Progress: %d, DownloadedBytes: %d, TotalBytes: %d',
          progress, downloadedBytes, totalBytes);
    },
    finishedCallback: (err) => {
      if (err) {
        return next(err);
      }
      console.log('file download complete!');
      res.download(downloadFilePath, fileId);
    }
  });
}
