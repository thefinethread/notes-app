const mongoose = require('mongoose');
require('colors');

const dbConnect = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.magenta.underline);
};

module.exports = dbConnect;
