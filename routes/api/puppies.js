const router = require('express').Router();
const puppiesCtrl = require('../../controllers/puppies');

router.get('/', puppiesCtrl.index);
router.get('/:id', puppiesCtrl.show);
router.use(require('../../config/auth'));
router.post('/', puppiesCtrl.create);
router.put('/:id', puppiesCtrl.update);
router.delete('/:id', puppiesCtrl.delete);

module.exports = router;