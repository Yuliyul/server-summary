const { Router } = require('express');
const localmachines = require('../models/localmachines');
const router = Router();
const axios = require('axios');
router.get('/', async (req, res) => {
    const PCList = await localmachines.find({}).lean();
    res.render('index', {
        title: 'local machins',
        isIndex: true,
        PCList: PCList,
    });
});
router.get('/add', async (req, res) => {
    res.render('add', {
        title: 'add PC',
        isAdd: true,
    });
});
router.post('/add', async (req, res) => {
    let data = null;
    try {
        data = JSON.parse(req.body);
    } catch (e) {
        data = req.body;
    }
    const filter = { domainID: data.domainID, kasse: data.kasse };
    const update = {};
    for (var field in localmachines.schema.paths) {
        if (field !== '_id' && field !== '__v') {
            if (data[field] !== undefined) {
                update[field] = data[field];
            }
        }
    }
    let doc = await localmachines.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true, // Make this update into an upsert
    });
    res.json({
        success: true,
    });
});
router.post('/restart', async (req, res) => {
    if (typeof req.body.delete != 'undefined') {
        const del = await localmachines.deleteOne({ _id: req.body.id });
    } else {
        const PC = await localmachines.findById(req.body.id);
        if (typeof PC.externalUrl != 'undefined') {
            var config = {
                method: 'post',
                url: PC.externalUrl + '/restart',
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    res.redirect('/');
});

module.exports = router;
