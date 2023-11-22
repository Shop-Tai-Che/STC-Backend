const mongoose = require('mongoose');

const dotenv = require('dotenv');

const port = process.env.PORT || 5001;

const app = require("./app");
dotenv.config({ path: './.env' });

mongoose
    .connect(process.env.DATABASE_MONGODB)
    .then(() => {
        console.log('Order connected to MongoDB successfully');
    });

const server = app.listen(port, () => {
    console.log(`Order service is running on port ${port}...`);
});

// SOCKET
const socketIO = require('socket.io')(server, { cors: { origin: '*' } });
exports.onChangeStation = function (data) {
    socketIO.emit("status", data);
};

module.exports = socketIO;
