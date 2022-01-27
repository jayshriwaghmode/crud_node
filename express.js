const express=require('express');
const app=express();
const Joi = require('joi');
// import bodyParser from 'body-parser'
// app.use(bodyParser.json());    use the json data
app.use(express.json());
let courses=[
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"},
    {id:4,name:"course4"},
]
app.get('/',(req,res)=>{
    res.send('Helllo express data');
});
app.get('/api/customer',(req,res)=>{
    res.send([1,2,3]);
});

// pass id in api
app.get('/api/customer/:id',(req,res)=>{
    res.send(req.params.id);
});

// pass 2parameter
// app.get('/api/posts/:year/:month',(req,res)=>{
//     res.send(req.params);
// });

// query param
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});

// using data
app.get('/api/courses',(req,res)=>{
    res.send(courses);

});
app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    console.log(course);
    if(!course) res.status(404).send("Course Id is not found");
    res.send(course);
    
});


// using post method

app.post('/api/courses',(req,res)=>{
  
    const result=validateCourse(req.body)
    console.log(result)
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return
    }
    const course={
        id:courses.length + 1,
        name:req.body.name
    }
    courses.push(course)
    res.send(course);

});


// put method

app.put('/api/courses/:id',(req,res)=>{
     result=validateCourse(req.body)
    console.log(result)
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return
    }
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    console.log(course);
    if(!course) res.status(404).send("Course Id is not found");
    course.name=req.body.name;
    res.send(course)

});


// delete method
app.delete('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    console.log(course);
    if(!course) res.status(404).send("Course Id is not found");
    let index=courses.indexOf(course);
    console.log('index',index)
    courses.splice(index,1)
    res.send(course);
})


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening  on port ${port}...`)
})

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string()
            .min(3)  
            .required(),
    })
    return schema.validate(course)
}