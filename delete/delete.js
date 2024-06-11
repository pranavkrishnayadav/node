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
router.delete("/", (req, res) => {
    const obj = {
        "p_id": req.body.p_id
    };

    // Connect to MongoDB
    mcl.connect(url, (err, conn) => {
        if (err) {
            console.error('Error in Connection:', err);
            return res.status(500).json({ 'delete': 'Error in connection' });
        }
        if (!conn) {
            return res.status(500).json({ 'delete': 'Error: Connection not established' });
        }

        const db = conn.db("nodedb");
        db.collection('products').deleteOne(obj, (err, result) => {
            if (err) {
                console.error('Error deleting data:', err);
                res.status(500).json({ 'delete': 'Error: ' + err });
            } else {
                if (result.deletedCount != 0) {
                    console.log('Data Deleted');
                    res.json({ 'delete': 'Success' });
                } else {
                    console.log('Data Not Deleted');
                    res.json({ 'delete': 'Record not found' });
                }
            }
            conn.close();
        });
    });
});

// Export router
module.exports = router;
