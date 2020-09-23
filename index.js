const aws = require("aws-sdk");
var fs = require('fs');

var s3 = new aws.S3({
    accessKeyId: `AKIA3D7N######BVJ24L`,  // replace with your access key ID
    secretAccessKey: `F4Pd/NuDaEiWGs#####7uqiqMjEK8qtBGW`  // replace with your secret access key
});

var getParams = {
    Bucket: 'example-bucket-data123', //replace example bucket with your s3 bucket name
    Key: 'folder1/object.json', // replace file location with your s3 file location
}

// ----------------------CREATE----------------------------------
function uploadToS3(bucketName, key, filePath) {

    var fileStream = fs.createReadStream(filePath);

    return new Promise(function(resolve, reject) {
        fileStream.once('error', reject);
        s3.upload({
            Bucket: bucketName,
            Key: key,
            Body: fileStream
        })
            .promise()
            .then(resolve, reject);
    });
}

var filePath = './object.json';   // local file`s address

uploadToS3('example-bucket-data123', 'folder1/object.json', filePath).then(function(result) {
    console.info('Success! Uploaded ' + filePath + ' to ' + result.Location);
});

// ----------------------READ----------------------------------
s3.getObject(getParams, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data.Body.toString(), `data`); //this will log data to console
    }
})

// ----------------------DELETE------------------------------------
s3.deleteObject(getParams, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(`deleted successfully`); //this will log data to console
    }
})
