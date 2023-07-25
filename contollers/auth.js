const { db } = require("../firestore_db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const twilio = require('twilio');

dotenv.config();

const nodemailer = require("nodemailer");

const sendMessage = (phone, location, username) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    phone.forEach((number) => {
        // console.log(number) 
        client.messages
            .create({
                body: `SOS Alert! I need help at this location : ${location}`,
                from: '+16073182789',
                to: `+91 ${number}`
            })
    })
    //   .then(message => console.log);
}
const sendMobileVerification = (phone, link) => {
    try {
        
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        // console.log(number) 
        
        client.messages
        .create({
            body: `Verify Phone : ${link}`,
            from: '+16073182789',
            to: `+91 ${phone}`
        })
            .then(message => console.log(message));
        
        console.log("Message sent successfully")
        
    }
    catch (e) {
        console.log("Message not sent")
        console.log(e);
    }
        
}

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

module.exports.verify_mail = (req, res) => {
    try {

        const email = req.params.email
        const userRef = db.collection("Users").doc(email)
        const userData = userRef.update({ verified_mail: true })
        res.json("Email verified Successfully");
    }
    catch (e) {
        console.log(e);
        res.json({
            status: "0",
            message: "Error occurred.",
            error: `${e}`,
        });
    }

    res.send("<h1>Mail Verified successfully<h1>")
}
module.exports.verify_phone = (req, res) => {
    try {

        const email = req.params.email
        const userRef = db.collection("Users").doc(email)
        const userData = userRef.update({ verified_phone: true })

        res.send(res.json({
            status: "1",
            message: "Phone number verified",
        }))
    }
    catch (e) {
        console.log(e);
        res.json({
            status: "0",
            message: "Error occurred.",
            error: `${e}`,
        });
    }

    res.send("<h1>Mail Verified successfully<h1>")
}

// module.exports.SignUp = async (req, res) => {
//     try {
//         const { email, name, password, dob, interests, phone } = req.body;
//         const saltRounds = 10;
//         // hash(password, saltRounds, (err, hash) => {
//         const userRef = db.collection("Users").doc(email).set({ email, name, password, dob, interests, tripDetails: [] });
//         // }).then(() => {
//         const token = jwt.sign({ email: email }, process.env.password, {
//             expiresIn: "1111h"
//         });



//         res.json({
//             status: "1",
//             message: "SignedIn Successfully",
//             token: token
//         });


//         const { email, name, password, dob, interests } = req.body;
//         const salt = 10;
//         const hashed = await bcrypt.hash(password, salt);
//         console.log(hashed)
//         const userRef = await db.collection("Users").doc(email).set({email, name, password: hashed, dob, interests, tripDetails: []});
//             const token = jwt.sign({email: email}, process.env.password, {
//                 expiresIn: "1111h"
//             });

//             res.json({
//                 status: "1",
//                 message: "SignedIn Successfully",
//                 token: token});
//         // })

//     } catch (e) {
//         console.log(e);
//         res.json({
//             status: "0",
//             message: "Error occurred.",
//             error: `${e}`,
//         });
//     }
// }

module.exports.login = async (req, res) => {
    // console.log(req.body);

    try {
        const { email } = req.body;
        const salts = 10;
        const user = await db.collection("Users").doc(email).get();

        if (!user.exists) {
            return res.json({
                status: 0,
                message: "No user present" 
            })
        }

        // bcrypt.compare(req.body.password, user.data().password).then((result) => {
        // if(result){
        //     const token = jwt.sign({email: email}, process.env.password, {
        //         expiresIn: "1111h"
        //     });   
        // console.log(user.data().password, req.body.password)
        if (req.body.password === user.data().password) {
            return res.json({
                status: 1,
                message: "LoggedIn Successfully",
                // token: token
            });
        } else {
            return res.json({
                status: "0",
                message: "Passwords do not match"
            });
        }

    } catch (e) {
        console.log(e)
        res.json({
            "status": 0,
            "message": `${e}`
        });
    }
}

module.exports.create_account = (req, res) => {

    const data = req.body
    console.log(data)
    let email = data.email
    let phone = data.phone

    try {
        const userRef = db.collection("Users").doc(email)
        const userDataObj = userRef.set(data)

        const randId = uuidv4();
        const verify_mail_link = `https://ab4d-2409-4040-d0d-7c-bcb3-3991-4ce1-6bd7.in.ngrok.io/verify_mail/${email}/${randId}`
        sendEmail(email, "Verify your Mail", `${verify_mail_link}`)

        const randId2 = uuidv4();
        const verify_phone_link = `https://ab4d-2409-4040-d0d-7c-bcb3-3991-4ce1-6bd7.in.ngrok.io/verify_phone/${email}/${randId2}`
        sendMobileVerification(phone, verify_phone_link)

        res.json({
            status: 1,
            message: "success",
        });
    }
    catch (e) {
        res.json({
            status: 0,
            message: "Error occurred.",
            error: `${e}`
        });
    }
}

module.exports.sos = async (req, res) => {
    // console.log(req.) 
    const userRef = db.collection("Users").doc(req.body.email)
    const userDataObj = (await userRef.get()).data()
    try {
        // const data = req.body
        // console.log(data.emergency_phone_number[0])
        sendMessage(userDataObj.emergency_phone_number, `latitute: ${req.body.location.coords.latitude}, longitude: ${req.body.location.coords.longitude}`, req.body.username)
        // console.log(req.body)

        res.json({
            status: 1, 
            message: "success",
        })
    }
    catch (e) {
        console.log(e)
        res.json({
            status: 0, 
            message: "error",
        })
    }
}   