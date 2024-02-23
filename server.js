const express = require('express');
const { MongoClient } = require('mongodb');
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// connecting to mongoDB:
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        // assigning database connection to express so it can be accessed in route handlers
        app.locals.db = client.db("otomeIsekaiDB");

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
          });          
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

// endpoint to get titles based on filters
app.get('/titles', async (req, res)=> {
    const db = req.app.locals.db;
    const collection = db.collection('titles');
    // extract query parameters from the request
    const { publishedYear, mediaType, femaleLeadTraits, maleLeadTraits, miscellaneous, filter } = req.query;
    // building the query dynamically based on filters
    let query = {};
    if (publishedYear) {
        query.publishedYear = publishedYear;
    }
    if (mediaType) {
        query.mediaType = {$in: Array.isArray(mediaType) ? mediaType : [mediaType] };
    }
    if (femaleLeadTraits) {
        query.femaleLeadTraits = { $all: Array.isArray(femaleLeadTraits) ? femaleLeadTraits : [femaleLeadTraits] };
    }
    if (maleLeadTraits) {
        query.maleLeadTraits = { $all: Array.isArray(maleLeadTraits) ? maleLeadTraits : [maleLeadTraits] };
    }
    if (miscellaneous) {
        query.miscellaneous = { $in: Array.isArray(miscellaneous) ? miscellaneous : [miscellaneous] };
    }
    if (filter) {
        query.filter = { $in: Array.isArray(filter) ? filter : [filter] };
    }

    try {
        const titles = await collection.find(query).toArray();
        res.json(titles);
    } catch (err) {
        res.status(500).json({ message: "Error fetching titles", error: err});
    }
});

run();

process.on()