var express = require('express');
var router = express.Router();
var registercontroller = require('../controller/loginregister');
var auth = require('../middleware/auth');


router.post('/register',registercontroller.register);
router.post('/login',registercontroller.login);

router.get('/',registercontroller.get_data);
router.get('/mail',registercontroller.send_mail);




module.exports = router;
