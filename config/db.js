const mongoose = require('mongoose');
const config =require('config');
const db = config.get('mongoURL');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
        
        console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;