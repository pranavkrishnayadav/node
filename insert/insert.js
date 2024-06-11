// Import modules
const express = require('express');
const mongodb = require('mongodb');

// Import URL
const url = require('../url'); // Ensure this is the correct path to your MongoDB URL module/file

// Create Mongo client
const mcl = mongodb.MongoClient;

// Create router instance
const router = express.Router();

// Create REST API
router.post("/", (req, res) => {
    const obj = req.body;

    // Connect to MongoDB
    mcl.connect(url, (err, conn) => {
        if (err) {
            console.error('Error in connection:', err);
            res.status(500).json({ 'insert': 'Error in connection' });
        } else {
            const db = conn.db('nodedb');
            db.collection('products').insertOne(obj, (err, result) => {
                conn.close(); // Ensure the connection is closed after operation
                if (err) {
                    console.error('Error inserting data:', err);
                    res.status(500).json({ 'insert': 'Error' });
                } else {
                    console.log('Data Inserted:', result.ops);
                    res.json({ 'insert': 'Success' });
                }
            });
        }
    });
});

// Export router
module.exports = router;
