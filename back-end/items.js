const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  offrating: Number,
  defrating: Number,
  created: {
    type: Date,
    default: Date.now
  },
});

const Item = mongoose.model('Item', itemSchema);

router.post('/', validUser, async (req, res) => {
  const item = new Item({
    user: req.user,
    title: req.body.title,
    offrating: req.body.offrating,
    defrating: req.body.defrating,
  });
  try {
    await item.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/', validUser, async (req, res) => {
  try {
    let items = await Item.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');
    return res.send(items);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/all', async (req, res) => {
  try {
    let items = await Item.find().sort({
      created: -1
    }).populate('user');
    return res.send(items);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', validUser, async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/:id', validUser, async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.offrating = req.body.offrating;
    item.defrating = req.body.defrating;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

module.exports = {
  model: Item,
  routes: router,
}
