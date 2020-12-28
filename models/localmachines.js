const { Schema, model } = require('mongoose');
const schema = new Schema(
    {
        platform: {
            type: String,
        },
        osname: {
            type: String,
        },
        arch: {
            type: String,
        },
        uptime: {
            type: Number,
        },
        freesysmem: {
            type: String,
        },
        totalmem: {
            type: String,
        },
        cpu: {
            type: String,
        },
        domainID: {
            type: Number,
            required: true,
        },
        kasse: {
            type: Number,
            required: true,
        },
        diskСSpace: {
            type: String,
        },
        diskСFreeSpace: {
            type: String,
        },
        extip: {
            type: String,
        },
        phpLastLine: {},
        terminalLastLine: {},
        FiscalLastLine: {},
        externalUrl: {
            type: String,
        },
        FFVersion: {
            type: String,
        },
        ChVersion: {
            type: String,
        },
        mysqlversion: {
            type: String,
        },
        domainName: {
            type: String,
        },
    },
    { timestamps: true }
);
schema.index({ domainID: 1, kasse: 1 }, { unique: true });
module.exports = model('localmachines', schema);
