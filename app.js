const express = require("express");
const https = require("https");


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",(req,res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;



const data  = {
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
};

const jsonData = JSON.stringify(data)

const url = "https://us13.api.mailchimp.com/3.0/lists/7fefc87afb"


const options = {
    method: "POST",
    auth: "vismaad1:41623c638559fbb0fcfa42955d478bb8-us13"
}


const request = https.request(url, options,(response)=>{




    if(res.statusCode ===200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.send(__dirname + "/failure.html");
    }
    response.on("data",(data)=>{
        console.log(JSON.parse(data));
    })


})
request.write(jsonData);
request.end();








})



app.post("/failure",(req,res)=>{
    res.redirect("/");
})





app.listen(3000,()=>{
    console.log("Server is running on port " + port);
})








//    api key              41623c638559fbb0fcfa42955d478bb8-us13


//list id                  7fefc87afb.












// fetch('https://us13.api.mailchimp.com/3.0/lists/7fefc87afb.' , {
//     method: 'POST',
//     auth:   "vismaad1:41623c638559fbb0fcfa42955d478bb8-us13",
//     body: jsonData,
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then((response) => response.on("data"),function(data){
//         console.log(JSON.parse(data));
//     })
//     .then((json) => console.log(json));



// req.rawListeners(jsonData);
