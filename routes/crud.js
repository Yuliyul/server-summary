const { Router } = require('express');
const localmachines = require('../models/localmachines');
const router = Router();
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
    const NewPC = new localmachines({
        ip: req.body.ip,
    });
    await NewPC.save();
    res.redirect('/');
});
router.post('/restart', async (req, res) => {
    const PC = await localmachines.findById(req.body.id);
    res.redirect('/');
});
module.exports = router;
