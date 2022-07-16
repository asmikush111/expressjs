const express =require("express");
const requests=require("requests");
const path=require("path");
const hbs=require("hbs");
const app=express();

const viewpath=path.join(__dirname,"../templates/views");
const partialpath=path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",viewpath);
hbs.registerPartials(partialpath);

app.get("/",(req,res)=>{
 res.render("index",{name:"Asmita",});
});

app.get("/about",(req,res)=>{
     requests(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=825e537b5be11a4fa63676ed01cc715e`
        )
      .on("data", (chunk) => {
        const obj=[JSON.parse(chunk)];
        //const realTimeData = obj.map((val) => replaceVal(homePage,val)).join("");
        res.write(obj[0].name);
      })

     .on("end",(err) => {
        if(err) return console.log("connection closed due to errors",err);
        res.end();
      });
});

app.listen(8000);