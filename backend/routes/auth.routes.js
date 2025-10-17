import express from'express';
import {signup, login, logout, homePage, checkAuthorized} from '../controllers/auth.controller.js';
import {verifyAuth} from '../middleware/verifyauth.js';

const router = express.Router();

router.get('check-authorized', verifyAuth, checkAuthorized);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

//authorized pages
router.get('/home', verifyAuth, homePage);
// router.get('create-')


export default router;