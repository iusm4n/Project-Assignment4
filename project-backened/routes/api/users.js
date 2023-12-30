const express = require('express');
let router = express.Router();
var users = require("../../models/users");

//allusers
router.get('/', async (req, res) => {
    let user = await users.find();
    return res.json(user);
});
//specifi user
router.get('/:email', async (req, res) => {
    let user = await users.find({ email: req.params.email });
    if (user.length === 0) return res.status(404).send(`User with email ${req.params.email} not found`);
    return res.json(user);
});

//update a user
router.put('/:email', async (req, res) => {
    let user = await users.findOne({ email: req.params.email });
    if (!user) return res.status(404).send(`User with email ${req.params.email} not found`);
    user.name = req.body.name;
    user.email = req.body.email;
    user.address = req.body.address;
    await user.save();
    return res.json(user);
})


//delete a user
router.delete('/:email', async (req, res) => {
    let user = await users.findOneAndDelete({ email: req.params.email });
    if (!user) return res.status(404).send(`User with email ${req.params.email} not found`);
    return res.json(user);
})


//post a user
router.post('/', async (req, res) => {
    let user = new users();
    user.name = req.body.name;
    user.email = req.body.email;
    user.address = req.body.address;
    await user.save();
    return res.json(user);
})
module.exports = router;