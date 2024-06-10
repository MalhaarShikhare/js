const express= require ('express');
const app=express();

var users=[{
    firstName:"Malhaar",
    kidneys: [{
        healthy :false
    },{
        healthy:true
    }]

},{
    firstName:"Tapu",
    kidneys: [{
        healthy :true
    },{
        healthy:true
    }]

},{
    firstName:"Harry",
    kidneys: [{
        healthy :false
    }]

}];

//! During get send we user data through query paramters
app.get("/",function(req,res){
    let name=req.query.n;
    let kidneyCount=0,healthyKc=0,unhealthyKc=0;

    users.forEach(element => {
        if(name==element.firstName)
            {
                kidneyCount=element.kidneys.length;
                element.kidneys.forEach((val)=>{
                    if(val.healthy)
                        healthyKc++;
                    else
                    unhealthyKc++;
                })
            }
    });
    // res.send("Your kidneyCount is "+ kidneyCount +
    //        "Healthy :"+healthyKc +
    //        " Unhealthy :"+unhealthyKc
    // )
    res.json({
        kidneyCount,healthyKc,unhealthyKc
    })

})
//* Middlewares
app.use(express.json());

//! During Post we send data via body
app.post("/",function(req,res){
  
    const naav=req.body.name
    const status=req.body.healthy
    users.forEach(element=>{
        if(naav===element.firstName)
            {    
                element.kidneys.push({
                    healthy:status
                })
            console.log(element.kidneys)
            }
    })
    res.send("Organ has been added successfully!")

})
app.put("/",function(req,res){
    const naav=req.body.name
    if(check(naav))
        {
            users.forEach(element=>{
                if(naav===element.firstName)
                    {    
                       element.kidneys.forEach((val)=>{
                             if(!val.healthy)
                                val.healthy=true;
                       })
                    }
            })
            res.send("valid input tysm");
        }
        else
        {
            res.status(411).json({
                msg:"You have no Bad kidneys"
            })
        }
   
})
app.delete("/",function(req,res){
    const naav=req.body.name
     if(check(naav))
        {
            const newKidneys=[]
            
            users.forEach(element=>{
                if(naav===element.firstName)
                    {    
                       element.kidneys.forEach((val)=>{
                             if(val.healthy)
                               newKidneys.push({
                            healthy:true
                            })
                       })
                       element.kidneys=newKidneys
                    }
            })
            res.json({Cleaning:"done"});
        }
        else
        {
            res.status(411).json({
                msg:"Cant delete the kidney which dont exist"
            })
        }
})

function check(naav)
{  
    let flag=false;
    users.forEach(element => {
        if(naav==element.firstName)
            {
                element.kidneys.forEach((val)=>{
                    if(!val.healthy)
                      flag=true;
                })
            }
    });
    return flag;
}
// function sum(n)
// {
//     let ans=0;
//     for(let i=1;i<=n;i++)
//         {
//             ans+=i;
//         }
//         return ans;
// }
// app.get("/",function(req,res){
//     const n=req.query.temp;
//     const s=sum(n);
//     res.send("hi your ans is "+(s.toString())); //? Sending numbers might cause an issue
// })
app.listen(3000)

//! GET : Asking something from the server

//!PUT  : Request to update your data on the server,Update a resource at a specific URL, or create it if it doesn't exist at that URL.

//!POST :POST is strictly for creating new resources.Multiple identical POST requests will create multiple resources.

//!DELETE :To remove a specific resource.

//! 411 status code :wrong input by the user