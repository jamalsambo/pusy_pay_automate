const AWS = require('aws-sdk');

exports.upload = async (key, body) => {
    const s3 = new AWS.S3({
        accessKeyId: 'AKIAQ7DSXTZEOGXUGJEJ',
        secretAccessKey: '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'
    });

    // Set the S3 bucket and file information.
    const BUCKET_NAME = "reports-crm-app";
    const KEY = key;
    const BODY = body;

    // Create a new PutObjectCommand to upload the file to S3.
    const params = {
        Bucket: BUCKET_NAME,
        Key: KEY,
        Body: BODY,
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });

}