const express = require("express")
const bodyParser=require("body-parser")
const date = require(__dirname + "/date.js")

const app = express()
//setting ejs templates
//put this thing right on top like this.. to avoid errors
app.set("view engine","ejs")

// to get input from website...
app.use(bodyParser.urlencoded({extended:true}))
// by default express only has access to current level files and views folder. to make access to another specific folder(in our case its the css file inside public folder) we use
app.use(express.static("public"))

var items=[];
var workItems=[];

app.get("/",(req,res)=>{
    // // res.send("hello")
    // //gets the browser's date of client
    // var today = new Date();
    // var currentDay = today.getDay();
    // var day = "";
    // //getDay() returns integer form 0 to 6, where 0 is sunday and 6 is saturday
    // //chekcing for weekend
    // if (today.getDay()==0){
    //     day = "monday"
    //     // res.write("Yay its the weekend")
    //     // res.sendFile(__dirname + "/index.html")
    //     //we are rendering and sending list.ejs file
    //     //res.render is used with templates, in this case list.ejs file, we are trying to add content to the var setted in the ejs file
    //     // we really need the list folder in order to make this work
    //     // we are looking into views folder(by default) and list file...
        
    // }
    // else if(today.getDay()==1){
    //     day = "tuesday"
    //     //kindOfDay is the var we have in the list.ejs file
        

    //     // res.write("Boo! I have to work!" + today.getDay())
    // }
    // else if(today.getDay()==2){
    //     day="wednesday"
    // } else if(today.getDay()==3){
    //     day="thursday"
    // } else if(today.getDay()==4){
    //     day="friday"
    // } else if(today.getDay()==5){
    //     day="saturday"
    // } else if(today.getDay()==6){
    //     day="sunday"
    // }
    let day = date()
    


    res.render("list",{listTitle: day,newListItems:items})
})


app.post("/",(req,res)=>{
    var item = req.body.newItem

    if(req.body.list == "work"){
        workItems.push(item)
        res.redirect("/work")
    }
    else{
        items.push(item);
        // jumps to get request above
        res.redirect('/');
        
    }
    //try to have res.render in get requests only... redirect from post requests if we are getting input from user, like here we are getting input of newListItem
    // res.render("list",{newListItem:item})

    // we are having the newListItem as a list.. to add multiple lists in the webpage
    // for loop in .ejs file will also help add more <li> tags for the same
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/work",(req,res)=>{
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})
app.post("/work",(req,res)=>{
    let item = req.body.newItem
    workItems.push(item) 
    res.redirect("/work")
})



app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})