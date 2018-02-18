const express = require('express');
const router = express.Router();

module.exports = (req, res, next) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;

  // deletes bucket
  storj.deleteBucket(bucketId, (err) => {
    if (err) {
      console.log('error deleting bucket: ', err);
     return next(err);
    }
  });

  res.redirect('back');
}
