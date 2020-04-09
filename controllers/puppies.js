const Puppy = require('../models/puppy');

module.exports = {
    index,
    create,
    show,
    update,
    delete: deleteOne,
    indexAll
};

// index

async function index(req, res) {
    try{
        const puppies = await Puppy.find({user: req.params.userId}).populate('user');
        res.status(200).json(puppies);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// create

async function create(req, res) {
    try{
        await Puppy.create(req.body);
        const puppies = await Puppy.find({user: req.body.user}).populate('user');
        res.status(201).json(puppies);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// show

async function show(req, res) {
    try{
        const puppy = await Puppy.findById(req.params.id).populate('user');
        res.status(200).json(puppy);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// update

async function update(req, res) {
    try{
        await Puppy.findByIdAndUpdate(req.params.id, req.body, {new: true});
        const puppies = await Puppy.find({user: req.body.user}).populate('user');
        res.status(200).json(puppies);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// delete

async function deleteOne(req, res) {
    try{
        const deletedPuppy = await Puppy.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedPuppy);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// indexByUser

async function indexAll(req, res) {
    try{
        const puppiesByUser = await Puppy.find({}).populate('user');
        res.status(200).json(puppiesByUser);
    }
    catch(err){
        res.status(500).json(err);
    }
}