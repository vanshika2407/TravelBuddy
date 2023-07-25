const { FieldValue } = require("@google-cloud/firestore");
const { db } = require("../firestore_db");

module.exports.get_friends = async (req, res) => {
    // console.log(req.body)
    try {

        const userEmail = req.body.data.email
        const userRef = db.collection("Users").doc(userEmail);
        const userData = await userRef.get()
        const userDataObj = userData.data()
        if ("friends" in userDataObj) {
            const friendsArr = userData.data().friends
            let friendCount = friendsArr.length
            let totalRating = 0
            let getFriends = []
            console.log(friendsArr)
            friendsArr.forEach((item) => {
                if (item.status === "accepted" && item.rating == -999) {
                    getFriends.push(item)
                    friendCount--;
                }
                else {
                    totalRating = totalRating + item.rating
                }
            })
            console.log(friendsArr)
            res.send({
                friendList: getFriends,
                avgRating: !friendCount ? 0 : totalRating / friendCount
            })
        }
        else {
            res.send({
                friendList: [],
                avgRating: 0    
            })
        }
    }
    catch (e) {
        console.log(e)
        res.json({
            status: "0",
            message: "Error occurred.",
            error: `${e}`,
        });
    }

}
module.exports.send_friend_req = async (req, res) => {
    // console.log(req.body);
    try {
        console.log(req.body);
        const {to, from} = req.body;
        const fromUserRef = await db.collection("Users").doc(from);
        const fromUserData = await fromUserRef.get()
        const fromUserDataObj = fromUserData.data()

        
        const toUserRef = db.collection("Users").doc(to);
        const toUserData = await toUserRef.get()
        const toUserDataObj = toUserData.data()

        const fromFriends = {
            email: to,
            rating: -999,
            review: "",
            status: "pending",
            profilePhoto: toUserDataObj.profile_photo,
            username: toUserDataObj.name
        }

        if (!("friends" in fromUserDataObj)) {
            const fromUserData = await fromUserRef.update(
                { friends: [fromFriends] }
            )
        }
        else {
            const fromUserData = await fromUserRef.update({ friends: [...fromUserDataObj.friends, fromFriends] })
        }
 


        const toFriends = {
            email: from,
            rating: -999,
            review: "",
            status: "received",
            profilePhoto: fromUserDataObj.profile_photo,
            username: fromUserDataObj.name 
        }

        if (!("friends" in toUserDataObj)) {
            const toUserData = await toUserRef.update(
                { friends: [toFriends] }
            )
        }
        else {
            const toUserData = await toUserRef.update({ friends: [...toUserDataObj.friends, toFriends] })
        }
        res.json({
            "status": 1,
            "message": "Added Successfully"
        });

    }
    catch (e) {
        console.log(e) 
        res.json({
            status: "0",
            message: "Error occurred.",
            error: `${e}`,
        });
    }
}

module.exports.send_received_list = async (req, res) => { 
    console.log(req.body)
    try {
        const userRef = await db.collection("Users").doc(req.body.email);
        const userData = await (await userRef.get()).data()
        const userFriends = []
        userData.friends.forEach((item) => {
            if (item.status == "received") {
                    userFriends.push(item)
                }
            })
        res.json({"list": userFriends});
    } catch (error) {
        res.json({
            status: 0,
            message: "Error occurred.",
            error: `${e}`,
        });
    }
}

module.exports.send_pending_list = async (req, res) => {
    //console.log(req.body)
    try {
        const userRef = await db.collection("Users").doc(req.body.email);
        const userData = await (await userRef.get()).data()
        const userFriends = []
        userData.friends.forEach((item) => {
            if (item.status == "pending") {
                    userFriends.push(item)
                }
            })
        res.json({"list": userFriends});
    } catch (error) {
        res.json({
            status: 0,
            message: "Error occurred.",
            error: `${e}`,
        });
    }
}

module.exports.accept_friend_req = async (req, res) => {
    // console.log(req.body)
    try {
        const {user, target} = req.body;
        const userRef = await db.collection("Users").doc(user);
        const userData = await (await userRef.get()).data()

        const targetRef = await db.collection("Users").doc(target);
        const targetData = await (await targetRef.get()).data()

        const userFriends = []
        userData.friends.forEach((item) => {
            if (item.email == target) {
                userFriends.push({
                    ...item,
                    status: "accepted"
                })
            }
            else {
                userFriends.push(item)
            }
        })

        const userDataObj = userRef.update({ friends: userFriends })


        const targetFriends = []
        targetData.friends.forEach((item) => {
            if (item.email == user) {
                targetFriends.push({
                    ...item,
                    status: "accepted"
                })
            }
            else {

                targetFriends.push(item)
            }
        })

        const targetDataObj = targetRef.update({ friends: targetFriends })
        res.json({
            "status": 1
        })
    }
    catch (e) {
        console.log(e)
        res.json({
            status: "0",
            message: "Error occurred.",
            error: `${e}`,
        });
    }

}
module.exports.remove_friend = async (req, res) => {
    //console.log(req.body);
    try {
        const {user, target} = req.body;
        const userRef = await db.collection("Users").doc(user);
        const userData = await (await userRef.get()).data()

        const targetRef = await db.collection("Users").doc(target);
        const targetData = await (await targetRef.get()).data()

        const userFriends = []
        userData.friends.forEach((item) => {
            if (item.email == target) {
                return 
            }
            else {
                userFriends.push(item)
            }
        })

        const userDataObj = userRef.update({ friends: userFriends })


        const targetFriends = []
        targetData.friends.forEach((item) => {
            if (item.email == user) {
                return
            }
            else {
                targetFriends.push(item)
            }
        })

        const targetDataObj = targetRef.update({ friends: targetFriends })
        res.json({"status": 1})
    }
    catch (e) {
        console.log(e)
        res.json({
            status: "0",
            message: "Error occurred.",
            error: `${e}`,
        });
    }
}
module.exports.review_friend = async (req, res) => {
    try {
        
        const data = req.body.data

        const userRef = await db.collection("Users").doc(data.user);
        const userData = await (await userRef.get()).data()

        const targetRef = await db.collection("Users").doc(data.target);
        const targetData = await (await targetRef.get()).data()

        const userFriends = []
        userData.friends.forEach((item) => {
            if (item.email == data.target) {
                userFriends.push({
                    ...item,
                    review : data.review,
                    rating : data.rating
                })
            }
            else {

                userFriends.push(item)
            }
        })

        const userDataObj = userRef.update({ friends: userFriends })

        res.send("updated")

    }
    catch (e) {
        console.log(e)
        res.json({
            status: "0",
            message: "Error occurred.",
            error: `${e}`,
        });
    }
}
module.exports.block_friend = async (req, res) => {
    try {
        const data = req.body.data
        const userRef = await db.collection("Users").doc(data.user);
        const userData = await (await userRef.get()).data()

        const targetRef = await db.collection("Users").doc(data.target);
        const targetData = await (await targetRef.get()).data()

        const userFriends = []
        userData.friends.forEach((item) => {
            if (item.email == data.target) {
                userFriends.push({
                    ...item,
                    status: "blocked"
                })
            }
            else {

                userFriends.push(item)
            }
        })

        const userDataObj = userRef.update({ friends: userFriends })

        res.send("updated")
    }
    catch (e) {
        console.log(e)
        res.json({
            status: "0",
            message: "Error occurred.",
            error: `${e}`,
        });
    }

}