const router = require('express').Router();
const {registerUser} = require('../Controllers/User-controller');


router.post('/register', registerUser);


module.exports = router;