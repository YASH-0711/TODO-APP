const mongoose = require('mongoose')
const express = require('express');
const multer = require('multer')
const app  = express();

const DB = "mongodb+srv://yash:12345@cluster0.wpwahzr.mongodb.net/mernstack?retryWrites=true&w=majority"

const { json } = require('express');

const imgconfig = multer.diskStorage({
    destination:(req,file,callback) => {
        callback(null,"./uploads")
    },
    filename:(req,file,callback) => {
        callback(null,`image-${Date.now()}. ${file.originalname}`)
    }
})

const isImage = (req, file, callback) => {
    if(file.mimeType.startsWith("image")){
        callback(null, true)
    }else{
        callback(new Error("only image is allowed"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

app.use(express.json());
// app.use(require('./router/auth'));

mongoose.connect(DB).then(() => {
    console.log("connection successful")
}).catch((err) => console.log("no connection"))

// const User = require('./model/userSchema');
const userSchema =  mongoose.model('REGISTRATION',{
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    Cpassword: {
        type:String,
        required:true
    },
    imgpath:{
        type:String,
        required:true,
    }
})

app.post('/register',  upload.single("photo"), async (req, res) => {

    // const {filename} = req.file;

    const {name, email ,  password, Cpassword, imgpath} = req.body;

    if(!name || !email  || !password || !Cpassword ){
        return res.status(400).json({error:"Plz fill all fields"});
    }

    try{
        // console.log("inside")
        const userExist = await userSchema.findOne({email:email});

        if(userExist){
            return res.status(422).json({error:"Email alread exist"})
        };

        if(password !== Cpassword){
            return res.status(420).json({error:"Password and Confirm password are not matching."})
        };


        const user = new userSchema({name, email, password, Cpassword, imgpath});

        await  user.save();
  
        res.status(201).json({message:"message successful"});         

    }catch (err){
        console.log(err)
    }
})

app.post('/signin', async (req, res) => {
    console.log(req.body)
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Plz fill  email and password"})
        }
        

        const userLogin = await userSchema.findOne({email:email});
        const userPassword = await userSchema.findOne({password:password});

        if(!userLogin || !userPassword){
            return res.status(422).json({error:"usererror"})
        }else{
            return res.status(420).json({message:"user sign successfully"})
        }
    } catch{
        console.log(err) 
    }
})


app.listen(5000, () => {
    console.log("server is running at port no. 5000")

})