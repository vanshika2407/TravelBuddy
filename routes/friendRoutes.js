const express = require("express")
const router = express.Router()
const friend = require("../contollers/friend");
        //add, remove(accepted, blocked, reject)

router.post('/friends', friend.get_friends )
router.post("/friend_req_send", friend.send_friend_req);
router.post("/friend_req_accept", friend.accept_friend_req);
router.post("/friend_remove", friend.remove_friend );

router.post("/friend_block", friend.block_friend);
router.post("/friend_review", friend.review_friend);

router.post("/get_recv_list", friend.send_received_list);
router.post("/get_pending_list", friend.send_pending_list);

module.exports = router
