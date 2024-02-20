require('dotenv').config();
const fs = require('fs').promises;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1
  });
  
  
async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
  
      // specifying database and collection names
        const database = client.db('otomeIsekaiDB');
        const collection = database.collection('titles');
  
      // loading documents from JSON file
      const data = await fs.readFile('./db/data.json', 'utf8');
      const documents = JSON.parse(data);
      
      // inserting document into collection
      const result = await collection.insertMany(documents);
      console.log(`${result.insertedCount} documents were inserted`);
    } catch (err) {
        console.error('Error inserting documents:', err);
    } finally {
      await client.close();
    }
  }
  run().catch(console.error);