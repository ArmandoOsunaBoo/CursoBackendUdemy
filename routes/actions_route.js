const express = require('express');
let actions_controller = require('../controllers/actions');
let router = express.Router();

router.route('/actions').get(actions_controller.see).post(actions_controller.create);

router.get('/actions/register',actions_controller.register);
//WildCard

 router.get('/actions/:id/change',actions_controller.change);

router.route('/actions/:id').get(actions_controller.pick).put(actions_controller.update).delete(actions_controller.destroy);
module.exports = router;
