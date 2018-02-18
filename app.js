require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');

// setup
const index = require('./routes/index');

const bucketList = require('./routes/bucketList');
const getBucketList = require('./routes/getBucketList');

const bucketPage = require('./routes/bucketPage');
const getBucketFiles = require('./routes/getBucketFiles');

const upload = require('./routes/upload');
const uploadToBucketList = require('./routes/uploadToBucketList')

const download = require('./routes/download');
const downloadBucketListFile = require('./routes/downloadBucketListFile');

const deleteFile = require('./routes/deleteFile');
const deleteBucketListFile =require('./routes/deleteBucketListFile');

const createBucket = require('./routes/createBucket');
const createNewBucket = require('./routes/createNewBucket');

const deleteBucket = require('./routes/deleteBucket');
const deleteBucketList = require('./routes/deleteBucketList');


const shareFile = require('./routes/shareFile');
const downloadWithToken = require('./routes/downloadWithToken');

const app = express();

// setup storj environment
const { Environment } = require('storj');
const storj = new Environment({
  bridgeUrl: "https://api.storj.io",
  bridgeUser: "pavansai.n@gmail.com",
  bridgePass: "23437927",
  encryptionKey: "disagree prosper person grow believe check spend soup bottom usual will hen moral over scene warfare knee name judge clock hobby awesome photo cable",
  logLevel: 4
});

mongoose.connect('mongodb://localhost:27017/storj-sender')
  .then(() => console.log('connected to mongoose'))
  .catch((err) => console.error('error connecting to mongo', err));

// view engine setup
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// passes storj in middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.storj = storj;
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);

app.get('/bucketList', bucketList);
app.get('/getBucketList', getBucketList);

app.get('/bucketList/:bucketId', bucketPage);
app.get('/getBucketFiles/:bucketId', getBucketFiles);

app.post('/bucketList/:bucketId', upload);
app.post('/uploadToBucketList/:bucketId', uploadToBucketList);

app.get('/bucketList/:bucketId/:fileId', download);
app.get('/downloadBucketListFile/:bucketId/:fileId/:name', downloadBucketListFile);


app.get('/bucketList/:bucketId/:fileId/deleteFile', deleteFile);
app.get('/deleteBucketListFile/:bucketId/:fileId', deleteBucketListFile);

app.get('/bucketList/:bucketId/deleteBucket', deleteBucket);
app.get('/deleteBucketList/:bucketId/deleteBucket', deleteBucketList);

app.get('/createBucket', createBucket);
app.get('/createNewBucket/:name', createNewBucket);

app.get('/share/:bucket_id/:file_id', shareFile);
app.get('/download/:token', downloadWithToken);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
