const express = require('express');
const router = express.Router();

// creates bucket page
module.exports = (req, res, next) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;

  // gets files inside bucket
  storj.listFiles(bucketId, (err, bucketFiles) => {
    if (err) {
      return next(err);
    }
    var data ={
      bucketId: bucketId,
      files: bucketFiles
    };
    res.json(data);
  });
}
