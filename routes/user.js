import express from 'express';
import { getallUserDetails,logout, register, login, getMyProfile } from '../controllers/user.js';

import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();

router.get("/me",isAuthenticated, getMyProfile);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);


router.route("/userid/:id")
  .get(getallUserDetails);
  // .put(updateUser)
  // .delete(deleteUser);

router.get("/register", (req, res) => {
    res.send("Hello");  // Changed "res.response" to "res.send"
});

export default router;
