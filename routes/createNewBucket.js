const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (req, res, next) => {
  const storj = req.storj;

  // assigns test bucket name
  let BucketName = req.params.name;

  // creates bucket
  storj.createBucket(BucketName, (err, bucket) => {
    if (err) {
      return next(err);
    }
    var data = {
      bucket_id: bucket.id,
      bucket_name: bucket.name,
      message: 'success'
    }

    return res.json(data)
  });
}
