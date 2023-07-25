const { FieldValue } = require("@google-cloud/firestore");
const { db } = require("../firestore_db");
const moment = require('moment');
const MomentRange = require('moment-range');

module.exports.getAll = async (req, res) => {
    // console.log("getting");
    // console.log(req.body)
    const { email } = req.body;
    try {
        const comm = await db.collection("Community").get();
        // console.log(comm)
        const start = new Date(req.body.trip.arrivalDate);
        const end = new Date(req.body.trip.departureDate)

        // const range = moment.range(start, end);
        // console.log(range)
        commArr = []
        comm.forEach((doc) => {

            const community = {}


            community.imageUrl = doc.data().imageUrl
            community.title = doc.data().title
            community.desc = doc.data().desc
            community.date = doc.data().date
            community.place = doc.data().location.place
            community.status = doc.data().members.includes(email) ? "joined" : "not joined"
            if (doc.data().mod.email === email) {
                community.status = "admin"
            }
            // console.log(doc.data().location.locality, req.body.trip.destination.locality)
            if (doc.data().location.locality === req.body.trip.destination.locality) {
                const eventDate = new Date(doc.data().date)
                // console.log(start, end, eventDate)
                // console.log(start <= eventDate, eventDate <= end )
                if (start <= eventDate && eventDate <= end) {
                    commArr.push(community)
                }
            }
        })
        // commArr.push(doc.data())
        // console.log(doc.data())

        // console.log(new Date())
        // console.log(commArr)
        res.json({
            "Communities": commArr
        });
    } catch (e) {
        console.log(e);
        res.json({
            "status": 0,
            "message": "Error occurred."
        });
    }
}

module.exports.createCommunity = async (req, res) => {

    try {
        const { title, desc, date, imageUrl, email, location } = req.body;
        // const commExists = await db.collection("Community").doc(title).get()
        // console.log(commExists);
        // if(commExists.createTime !== undefined){
        //     return res.json({
        //         "status": -1, 
        //         "message": `${title}`
        //     })
        // }   
        const comm = await db.collection("Community").doc(title).set({ title, location, desc, date, imageUrl, mod: email, members: [] });
        res.json({
            "status": 1,
            "message": `Added to ${title} community`
        });
    } catch (error) {
        console.log(error);
        res.json({
            "status": 0,
            "message": "Error occurred."
        });

    }

}

module.exports.leaveCommunity = async (req, res) => {
    try {
        const { title, email } = req.body;
        const comm = await db.collection("Community").doc(title).update({
            members: FieldValue.arrayRemove(email)
        });
        res.json({
            "status": 1,
            "message": "Successfully left community"
        });
    } catch (error) {
        res.json({
            "status": 0,
            "message": "Error occurred. sdfds"
        });
    }

}

module.exports.joinCommunity = async (req, res) => {
    try {
        const { title, email } = req.body;
        const comm = await db.collection("Community").doc(title).update({
            members: FieldValue.arrayUnion(email)
        });
        res.json({
            "status": 1,
            "message": "Successfully joined community"
        });
    } catch (error) {
        res.json({
            "status": 0,
            "message": "Error occurred. sdfds"
        });
    }
}

//get all comms
module.exports.get = async (req, res) => {
    console.log("getting");
}