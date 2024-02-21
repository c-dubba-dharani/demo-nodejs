const express = require("express");
const router = express.Router();
const User = require("../models/user");
//create user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//read users
router.get("/userList", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

//read user -find by id
router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const users = await User.findById(_id);
    if (!users) {
      return res.status(404).send("user not found");
    }
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

//update user by id
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "isActive"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    res.status("400").send({ error: "Invalid Updates!" });
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true,});

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Delete user API by id
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//filter users by isActive
router.get("/", async (req, res) => {
  const query = {};
  if (req.query.isActive) {
    query.isActive = req.query.isActive === "true";
  }
  try {
    const users = await User.find(query);
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
