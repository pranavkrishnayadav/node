// Import Modules 
const express = require('express');
const mongodb = require('mongodb');

// Import URL 
const url = require('../url'); // Ensure this is the correct path to your MongoDB URL module/file

// Create Mongo client 
const mcl = mongodb.MongoClient;

// Create Router instance 
const router = express.Router();

// Create a REST API 
router.get('/', (req, res) => {
    // Connect to MongoDB 
    mcl.connect(url, (err, conn) => {
        if (err) {
            console.error('Error in Connection:', err);
            res.status(500).json({ 'error': 'Error in connection' });
        } else {
            const db = conn.db('nodedb');
            db.collection('products').find().toArray((err, array) => {
                conn.close(); // Ensure the connection is closed after operation
                if (err) {
                    console.error('Error:', err);
                    res.status(500).json({ 'error': 'Error fetching data' });
                } else {
                    console.log('Data sent');
                    res.json(array);
                }
            });
        }
    });
});

// Export router
module.exports = router;
