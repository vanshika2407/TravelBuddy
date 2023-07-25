const { FieldValue } = require("@google-cloud/firestore");
const { db } = require("../firestore_db");
const request = require("request");

const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
const { UserBindingContextImpl } = require("twilio/lib/rest/ipMessaging/v2/service/user/userBinding");
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.apiKeyOpenAi
});
const openai = new OpenAIApi(configuration);

// {
//     "email": "semic@gmail.com",
//     "end_date": "March 10, 2023 at 12:00:00 AM UTC+5:30",
//     "mode_of_transport": "Bus",
//     "start_date": "March 4, 2023 at 12:00:00 AM UTC+5:30",
//     "status":  "Completed",
//     "stops": [
//         {
//             "lat": 46,
//             "long": 56,
//             "loc_name": "Mumbai"
//         }
//     ]
// }


//reverse geocoding
const getSublocality = (lat, lng) => {
    console.log(lat, lng);
    const requestOptions = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDtnPmw3rJGTqdCbNl_GAHvNK6XHEO-0aU`,
        method: 'GET'
    };
    console.log(requestOptions.url);
    request(requestOptions, (err, response, body) => {
        if (err) {
            console.log(err);
        } else if (response.statusCode === 200) {
            const result = JSON.parse(body).results;
            result[0].address_components.forEach(doc => {
                if (doc.types[0] === "neighborhood") {
                    //console.log(doc);
                    return doc;
                }
            });
        } else {
            console.log(response.statusCode);
        }
    });
}
module.exports.addTrip = async (req, res) => {
    let { email, noOfDays, arrivalDate, interests, location, prompt, place } = req.body
    // console.log(req.body);
    try {
        const userRef = db.collection("Users").doc(email);
        const userDataRef = await userRef.get();
        const userDataObj = userDataRef.data();

        let departureDate = new Date(arrivalDate);
        departureDate.setDate(departureDate.getDate() + noOfDays);
        departureDate = departureDate.toDateString();

        arrivalDate = new Date(arrivalDate).toDateString()

        const tripDetails = {
            arrivalDate,
            departureDate,
            interests,
            location: { lat: location.lat, lng: location.long, prompt, neighborhood: place }

        }

        // console.log(tripDetails)

        if (!("tripDetails" in userDataObj)) {
            const userData = await userRef.update(
                { tripDetails: [tripDetails] }
            )
        }
        else {
            const fromUserData = await userRef.update({ tripDetails: [...userDataObj.tripDetails, tripDetails] })
        }
        res.json({
            "status": 1,
            "message": "Added Successfully"
        });
    } catch (e) {
        console.log(e);
        res.json({
            status: 0,
            message: "Error occurred. sdfds"
        });
    }
}

module.exports.getTrips = async (req, res) => {
    // const trips = await db.collection("Users").get()
    // const getUser = await db.collection("Users").doc(req.body.email).get()
    // const userLoc = getUser.data().tripDetails[0];
    // const userStops = []
    // const nearby = []
    // userLoc.forEach(stop => {
    //     userStops.push(stop.location_name);
    // })
    // trips.forEach(doc => {
    //     if (doc.data().email != req.body.email) {
    //         stopsArr = []
    //         //console.log(doc.data())
    //         if (doc.data().tripDetails) {
    //             doc.data().tripDetails.forEach(trips => {
    //                 stopsArr.push(trips.stops[0].location_name);
    //                 userStops.forEach(stop => {
    //                     //console.log(stop);
    //                     if (trips.stops[0].location_name === stop) {
    //                         //console.log("matched");
    //                         console.log(trips.start_date);
    //                         nearby.push({ user: doc.data().email, name: doc.data().name, start_location: userStops[0], end_location: userStops[userStops.length - 1], start_date: trips.start_date })
    //                     }
    //                 })

    //             })

    //         }

    //     }
    // })
    // console.log(req.body);
    const trips = await db.collection("Users").get()
    const user = await (await db.collection("Users").doc(req.body.email).get()).data()
    const {gender} = req.body
    matchArr = []
    trips.forEach(doc => {
        // console.log(doc.data().email, req.body.email)
        if (doc.data().email != req.body.email) {
            const person = doc.data()
            // console.log(person, user)
            if ("tripDetails" in person && person.tripDetails.length > 0) {
                if (person.tripDetails[0].location.neighborhood == user.tripDetails[0].location.neighborhood) {
                    if (!(user.tripDetails.departureDate < person.tripDetails.arrivalDate || user.tripDetails.arrival > person.tripDetails.departureDate)) {
                        userInterests = user.tripDetails[0].interests
                        // console.log(userInterests)
                        personInterests = person.tripDetails[0].interests
                        interestMatch = []

                        userInterests.forEach(interest => {
                            if (personInterests.includes(interest)) {
                                interestMatch.push(interest)
                            }
                        })

                        
                        if (interestMatch.length > 0) {
                            // console.log(person.gender, gender)  
                            if (gender == "Any") {
                                matchArr.push({ name: person.name, email: person.email, interests: interestMatch, profilePhoto : person.profile_photo })
                            }
                            else if (gender == person.gender) { 
                                matchArr.push({ name: person.name, email: person.email, interests: interestMatch, profilePhoto : person.profile_photo })
                            }
                        }
                    }
                }
            }
        }
        
    })
    res.json(
        {
            "status": 1,
            "message": "Success",
            "data": matchArr
        }
    )

}
module.exports.getTripDetails = async (req, res) => {
    const getUser = await db.collection("Users").doc(req.body.email).get()
    tripDets = []
    getUser.data().tripDetails.forEach(doc => {
        const { start_date } = doc;
        //console.log(doc.stops[0])
        tripDets.push({ start_date, start_location: doc.stops[0].location_name, end_location: doc.stops[doc.stops.length - 1].location_name })
    })
    res.json({ "list": tripDets })
}

module.exports.tripImages = async (req, res) => {
    const getUser = await db.collection("Users").doc(req.body.email).get()
    const start_loc = getUser.data().tripDetails[0].stops[0].location_name
    const end_loc = getUser.data().tripDetails[0].stops[getUser.data().tripDetails[0].stops.length - 1].location_name
    const response = await openai.createImage({
        prompt: `Popular spots at ${start_loc}`,
        n: 5,
        size: "1024x1024",
    })

    //console.log(response.data);
    imageArr = []
    response.data.data.forEach(url => {
        imageArr.push(url);
    })
    //   console.log(imageArr);
    res.json({ "arr": imageArr })

}

module.exports.getUser= async (req, res) => {
    const getUser = await db.collection("Users").doc(req.body.email).get()
    // console.log(getUser)
    const userData = getUser.data()
    res.json({ username: userData.name, profilePhoto: userData.profile_photo })
}