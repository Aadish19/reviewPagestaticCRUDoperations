const express = require('express');
const port = 8000;

//Requirements
const path = require('path');
var methodOverride = require('method-override')

//Controller
const app = express();

//Middleware
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));
app.use(methodOverride('_method'));

const {v4:uuid} = require('uuid');

let blog = [
    {
        id:uuid(),
        username:"Adish Jain",
        review:"Hey Wassup sbdfisdbfkjbdfdsbfdskjfsdkjfndsfnsddkjfnd Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe ipsum numquam maxime perspiciatis harum corrupti labore officia, suscipit iusto sequi ab vitae eaque voluptatem explicabo quas magnam necessitatibus, aliquid quasi quos distinctio veniam dolore repellendus. Aliquid eligendi, eveniet quod maxime necessitatibus consequatur, optio doloribus qui eum magni placeat aut laboriosam voluptatibus ducimus voluptatem mollitia quo accusantium accusamus veniam repellendus debitis rerum consequuntur quaerat consectetur. Ex, voluptate. Laudantium voluptates voluptatum, illo ipsum ipsam quae libero ratione inventore qui error sed excepturi velit eligendi expedita nemo. Laudantium id culpa repellat a ut, accusantium magnam eius, assumenda in animi quisquam dolorum at? Quaerat?"
    },
    {
        id:uuid(),
        username:"Ayush",
        review:"Hey Wassup sbdfisdbfkjbdfdsbfdskjfsdkjfndsfnsddkjfnd"
    },
    {
        id:uuid(),
        username:"Anonymous",
        review:"Hey Wassup sbdfisdbfkjbdfdsbfdskjfsdkjfndsfnsddkjfnd"
    },
    {
        id:uuid(),
        username:"Stranger",
        review:"Hey Wassup sbdfisdbfkjbdfdsbfdskjfsdkjfndsfnsddkjfnd"
    }
]

app.get('/',function(req,res){
    return res.render('blogs',{
        title:'Blogs Page',
        blog:blog
    })
})

app.get('/:id/show',function(req,res){

    console.log(req.params)
    const {id} = req.params
    const findParticular = blog.find((c) => c.id===(id))
    res.render('show',{
        title:"Show Details",
        findParticular
    });
})

app.get('/AddMore',function(req,res){
    return res.render('AddMore',{
        title: 'Add_Comments'
    })
})

app.post('/',function(req,res){
    // console.log(req.body);

    const newComment = {
        id:uuid(),
        username:req.body.username,
        review:req.body.text
    }
    blog.push(newComment)

    res.redirect('/')
})

app.get('/:id/update',function(req,res){
    const {id} = req.params
    const contentToUpdate = blog.find((c) => c.id===(id))  // id comment username
    res.render('update',{
        title: "Update Review",
        contentToUpdate
    });
})

app.patch('/:id',function(req,res){
    const {id} = req.params
    console.log(req.body)
    const review = req.body.text
    const username = req.body.username
    //console.log(req.body)
    const updatedContent = blog.find((c) => c.id===(id))  // id comment username
    updatedContent.review=review;
    updatedContent.username=username
    res.redirect('/')
})

app.delete('/:id',function(req,res){

    const {id} = req.params;
    // console.log(id)
    const edited = blog.filter((b) => b.id!==id)
    blog = edited;
    res.redirect('/')
})



app.listen(port,(err)=>{
    if(err){
        console.log("Server is not up on ",port);
    }
    console.log("Server is up and running on port ",port);
})