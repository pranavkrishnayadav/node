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
router.put('/', (req, res) => {
    const p_id = req.body.p_id;
    const obj = {
        p_name: req.body.p_name,
        p_cost: req.body.p_cost // Corrected typo
    };

    if (!p_id) {
        return res.status(400).json({ 'update': 'Error: p_id is required' });
    }

    // Connect to MongoDB
    mcl.connect(url, (err, conn) => {
        if (err) {
            console.error('Error in Connection:', err);
            return res.status(500).json({ 'update': 'Error in connection' });
        } else {
            const db = conn.db('nodedb');

            db.collection('products').updateOne({ p_id: p_id }, {
                $set: obj
            }, (err, result) => {
                conn.close(); // Ensure the connection is closed after operation

                if (err) {
                    console.error('Error updating data:', err);
                    return res.status(500).json({ 'update': 'Error: ' + err });
                } else {
                    if (result.matchedCount != 0) {
                        console.log('Data Updated');
                        return res.json({ 'update': 'Success' });
                    } else {
                        console.log('Data Not Updated');
                        return res.status(404).json({ 'update': 'Record Not Found' });
                    }
                }
            });
        }
    });
});

// Export router
module.exports = router;
