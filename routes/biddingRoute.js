const express = require('express')
const router = express.Router();
const {protected, isAdmin, isSeller} = require('../middleware/authMiddleware');
const biddingController = require('../controllers/biddingController');


router.get('/', protected, biddingController.getMyBidsHistory);
router.get("/:productId", biddingController.getBiddingHistory);
router.post('/', protected, biddingController.placeBid);
router.post('/sell', protected, isSeller, biddingController.sellProduct);

// buyer delete own bid
router.delete('/:bidId', protected, biddingController.deleteMyBid);



module.exports = router;