const { Schema, model } = require('mongoose');
const schema = new Schema({
    ip: {
        type: String,
        required: true,
    },
    CPU: {
        type: String,
        required: false,
    },
    memory: {
        type: String,
        required: false,
    },
    domain: {
        type: String,
        required: false,
    },
    kasse: {
        type: Number,
        required: false,
    },
});
module.exports = model('localmachines', schema);
