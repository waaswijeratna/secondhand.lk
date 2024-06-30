const admin = require('firebase-admin');
const serviceAccount = require('./secondhand-d92df-firebase-adminsdk-1lx9o-1a7a5e8da0.json'); // Update with your service account key path

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://secondhand-d92df.appspot.com' // Replace with your Firebase project ID
});

const bucket = admin.storage().bucket();

const uploadToFirebase = (file) => {
    return new Promise((resolve, reject) => {
        if (file.size === 0) {
            console.log('Already uploaded:', file.size, "file name", file.originalname);
            const fileUrl = `https://storage.googleapis.com/${bucket.name}/${file.originalname}`;
            resolve(fileUrl); // Just return the URL directly
        } else {
            console.log('Uploading:', file.originalname, "size", file.size);
            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.originalname}`;
            const fileUpload = bucket.file(fileName);

            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('error', (error) => {
                reject(error);
            });

            blobStream.on('finish', async () => {
                try {
                    await fileUpload.makePublic(); // Make the file publicly accessible
                    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                    resolve(fileUrl);
                } catch (error) {
                    reject(error);
                }
            });

            blobStream.end(file.buffer);
        }
    });
};

module.exports = { uploadToFirebase };
