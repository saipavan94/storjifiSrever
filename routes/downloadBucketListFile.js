const express = require('express');
const router = express.Router();
var fs = require('fs')

module.exports = (req, res, next) => {
  const storj = req.storj;
  const bucketId = req.params.bucketId;
  const fileId = req.params.fileId;
  const name = req.params.name
  const downloadFilePath = './downloads/'+name;

  storj.resolveFile(bucketId, fileId, downloadFilePath, {
    progressCallback: (progress, downloadedBytes, totalBytes) => {
      console.log('Progress: %d, DownloadedBytes: %d, TotalBytes: %d',
          progress, downloadedBytes, totalBytes);
    },
    finishedCallback: (err) => {
      if (err) {
        return next(err);
      }
      console.log('file download complete!',downloadFilePath);
      res.download(downloadFilePath);
      res.on('finish',function(){
        console.log("deno");
         fs.unlinkSync(downloadFilePath)

      })
    //  fs.unlinkSync(downloadFilePath)
    //  res.sendFile(downloadFilePath);
    }
  });
}
