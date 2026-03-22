import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "zr_secret";
const API_KEY = "SUA_API_KEY";

/* login */
app.post("/login",(req,res)=>{
 const token=jwt.sign({user:req.body.username},SECRET);
 res.json({token});
});

/* chat */
app.post("/chat", async (req,res)=>{
 try{
  let decoded=jwt.verify(req.body.token,SECRET);

  let r=await fetch("https://api.openai.com/v1/chat/completions",{
   method:"POST",
   headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+API_KEY
   },
   body:JSON.stringify({
    model:"gpt-4o-mini",
    messages:req.body.messages
   })
  });

  let data=await r.json();
  res.json(data);

 }catch(e){
  res.json({error:"erro"});
 }
});

app.listen(3000,()=>console.log("rodando"));