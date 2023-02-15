const PORT=8000
const express=require("express")
const {MongoClient}=require('mongodb')

const {v4:uuidv4 }=require('uuid')

const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const cors=require("cors")
require("dotenv").config()
const { query } = require("express")

const app=express()
app.use(cors())
app.use(express.json())


const uri=process.env.MONGODB_URL




app.get("/",(req,res)=>{
    res.json('Hello to my app')

})



app.post("/signup", async (req,res)=>{
    console.log(req.body)
    const client= new MongoClient(uri)
    

    const {email,password}=req.body
    const generateduser=uuidv4()
    const hashpassword=await bcrypt.hash(password,10)
     try{

        await client.connect()
        const database=client.db("app-data")
        const users=database.collection('users')

        const existinguser=await users.findOne({email})
        if(existinguser){
            return res.status(409).send("User alerdy exist.Please login")
        }

        const sanitizedEmail=email.toLowerCase()
        const data={
            user_id:generateduser,
            password:hashpassword,
            email:sanitizedEmail,

        }
        const inserteduser=await users.insertOne(data)
        const token=jwt.sign(inserteduser,sanitizedEmail,{
            expiresIn:60*24,
        })

        res.status(201).json({token,userId:generateduser})

    }catch(err){
        console.log(err)
    }
})



app.post("/login",async (req,res)=>{
    const client= new MongoClient(uri)
    const {email,password}=req.body

    try{
        await client.connect()
        const database=client.db("app-data")
        const users=database.collection('users')

        const user=await users.findOne({email})

        const correctPassword= await bcrypt.compare(password,user.password)

        if(user && correctPassword){
            const token=jwt.sign(user,email,{
                expiresIn:60*24
            })
            res.status(201).json({token,userId:user.user_id})
        }else{
            return res.status(400).send("Invalid credential")
        }
        
    }catch(err){
        console.log(err)
    }
    
})



app.get("/users",async (req,res)=>{
    const client= new MongoClient(uri)
    const userIds=JSON.parse(req.query.userId)
  
    try{
        await client.connect()
        const database=client.db("app-data")
        const users=database.collection('users')
        const pipeline=
        [
                    {
                        '$match':{
                            'user_id':{
                                '$in':userIds
                            }
                        }
                    }
        ]

        const foundUsers=await users.aggregate(pipeline).toArray()
       
        res.send(foundUsers)

    }finally{
        client.close()
    }
})













app.get("/genered_users",async (req,res)=>{
   const client= new MongoClient(uri)
   const gender_interest=req.query.gender
    
   try{

    await client.connect()
    const database=client.db("app-data")
    const users=database.collection('users')

    const query={gender_identity:gender_interest}


    const findusers=await users.find(query).toArray()
    res.send(findusers)
   
   }finally{
    await client.close()
   }

})








app.get("/user",async (req,res)=>{
    const client= new MongoClient(uri)
    const userId=req.query.userId

    

    try{

        await client.connect()
        const database=client.db("app-data")
        const users=database.collection('users')

        const query={user_id:userId}
        const user=await users.findOne(query)
        res.send(user)

    }catch(err){
        console.log(err)
    }


})





app.put("/user", async (req,res)=>{
    const client= new MongoClient(uri)
    const formdata=req.body.formdata
    
    try{

        await client.connect()
        const database=client.db("app-data")
        const users=database.collection('users')
        
        const query={user_id:formdata.user_id}
        
        const updateDoc={
            $set :{
                first_name:formdata.first_name,
                dob_day:formdata.dob_day,
                dob_month:formdata.dob_month,
                dob_year:formdata.dob_year,
                gender_identity:formdata.gender_identity,
                show_gender:formdata.show_gender,
                gender_interest:formdata.gender_interest,
                url:formdata.url,
                about_me:formdata.about_me, 
                matches: formdata.matches
            },
        }
        
       const inserteduser= await users.updateOne(query,updateDoc)

       
       res.send(inserteduser)

    }finally{
        await client.close()
    }
})





app.put("/addMatches",async (req,res)=>{
    const client= new MongoClient(uri)
    const userId=req.body.userId
    const matchuserId=req.body.matchuserId

    try{
        await client.connect()
        const database=client.db("app-data")
        const users=database.collection('users')

        const query={user_id:userId}
        const updateDoc={
            $push :{
                matches:{user_id:matchuserId}
            }
        }
        const inserteduser= await users.updateOne(query,updateDoc)
        res.send(inserteduser)
    }finally{
        await client.close()
    }
})





app.get("/messages",async (req,res)=>{
    const client= new MongoClient(uri)
    const formatdata=req.query
    
    try{
        await client.connect()
        const database=client.db("app-data")
        const message=database.collection('messages')

        const query={
            from_userid:formatdata.userId,to_userid:formatdata.correspondinguser
        }
       // console.log(query) 
        const retrive=await message.find(query).toArray()
    
        res.send(retrive)

    }finally{
        client.close()
    }
})

app.post('/message', async (req, res) => {
    const client = new MongoClient(uri)
    const message = req.body.message

    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')

        const insertedMessage = await messages.insertOne(message)
        console.log(insertedMessage)
        res.send(insertedMessage)
    } finally {
        await client.close()
    }
})



app.listen(PORT,()=>console.log("server running on port "+PORT))