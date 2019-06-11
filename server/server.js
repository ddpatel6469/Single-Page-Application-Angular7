const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dbconn = "mongodb://localhost:27017/marlabs";
const jwt = require("jsonwebtoken");

console.log(app.get("env"));
console.log(process.env.NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:"http://localhost:4200"
}));

app.use((req,res,next) => {
    console.log("Custom Middleware");
    next();
})


mongoose.connect(dbconn, {useNewUrlParser:true}).then(() => {
    console.log("mongo connected");
}).catch(() => {
    console.log("Error connecting database");
});

app.post("/authenticate",(req,res) => {
    if(req.body.username=="admin" && req.body.password=="admin"){
        const token = jwt.sign({
            "username":req.body.username,
            "org":"Marlabs"
        }, "marlabssecretkey",{
            expiresIn: '1h'
        });
        res.send({
            isLoggedIn:true,
            msg:"Valid Login Details",
            token:token
        })
    }
    else{
        res.send({
            isLoggedIn:false,
            msg:"Invalid Login Details",
            token:null
        })
    }
})

app.use((req,res,next) => {
    const token = req.body.token || req.query.token || req.headers.token;
    if(!token){
        res.send({
            isLoggedIn:false,
            msg:"Invalid Token"
        });
    }
    else{
        jwt.verify(token, "marlabssecretkey", (err,decoded) => {
            if(err){
                res.send({
                    isLoggedIn:false,
                    msg:"Token not verified"
                });
            }
            else{
                next();
            }
        });
    }
});

const productsSchema = mongoose.Schema({
    "productId": Number,
    "productName": String,
    "productCode": String,
    "releaseDate": Date,
    "description": String,
    "cost": Number,
    "price": Number,
    "category": String,
    "rating":Number,
    "imageUrl": String
})

const productsModel = mongoose.model("products",productsSchema);

app.post("/saveProducts",(req,res) => {
    const productsDocument = productsModel(req.body);
    productsDocument.save(function(err){
        if(!err){
            res.send({
                status:1,
                msg:"Product Saved!!!"
            })
        }else{
            res.status(403).send(err);
        }
    });
});

app.get("/products", async (req,res) => {
    // productsModel.find({}, (err,doc) => {
    //     if(!err){
    //         res.send(doc);
    //     }else{
    //         res.status(403).send(err);
    //     }
    // });

    try{
        const result = await productsModel.find();
        res.send(result);
    }
    catch(ex){
        res.status(403).send(ex.message);
    }
    
});

// const port = process.env.port || 3000;

app.listen(port, () => {
    console.log("server running @ localhost: 3000");
})