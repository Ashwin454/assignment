const express = require('express');
const { showUsers, addUser, deleteUser, editUser } = require('../controller/personController');

const router = express.Router();

router.route("/getPersons").get(showUsers);
router.route("/addUser").post(addUser);
router.route("/deleteUser/:id").delete(deleteUser);
router.route("/editUser/:id").put(editUser);

module.exports = router;