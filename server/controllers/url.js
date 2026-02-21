const {Url, Visit} = require('../models/connect');
const shortid = require('shortid');

async function handleURLFetch(req, res){
    try{
        const urls = await Url.findAll({
            where: {
                createdBy: req.user.id
            },
            include: [{
                model: Visit,
                as: 'visitHistory'
            }]
        });
        return res.json(urls);
    } catch(err){
        console.error('Error fetching URLs: ', err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

async function handleCreateShortID(req, res){
    const body = req.body;
    const shortID = shortid();
    await Url.create({
        shortId: shortID,
        redirectId: body.URL,
        createdBy: req.user.id
    })

    return res.send(shortID);
}

async function handleDeleteURL(req, res){
    const shortID = req.params.id;

    await Url.destroy({
        where:{
            shortId: shortID
        }
    });

    return res.send('Success');
}

async function handleURLUpdate(req, res){
    const {redirectURL} = req.body;
    const shortID = req.params.id;
    await Url.update(
        {redirectId: redirectURL},
        {where: {shortId: shortID}}
    );

    const url = await Url.findOne({where: {shortId: shortID}});

    return res.send(url);
}

async function handleURLRedirect(req, res){
    const shortID = req.params.id;

    const entry = await Url.findOne({
        where: {shortId: shortID}  
    });
    await Visit.create({
        urlId: entry.id,
        timeStamp: Date.now()
    });
    return res.redirect(entry.redirectId);
}

module.exports = {
    handleURLFetch,
    handleCreateShortID,
    handleURLRedirect,
    handleDeleteURL,
    handleURLUpdate
}