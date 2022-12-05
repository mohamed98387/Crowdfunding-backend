const express = require("express")
const app = express()
const mongoose = require("mongoose")


//init midllware
app.use(express.json())

//Connect DB
const db = "mongodb+srv://mohamed123:mohamed123@app.lvvimut.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db,{useUnifiedTopology:true,useNewUrlParser:true},(err)=>{
    if(err) throw err
    console.log("Database connected!!!...")
})
app.use((req, res, next)=> {
    res.setHeader('Access-Controll-Allow-Origin','*')
    res.setHeader(
        'Access-Controll-Allow-Headers',
        'Origin, X-Requested-With,Content-type,Accept,Authorization'
    );
    res.setHeader('Access-Controll-Allow-Methodes','GET,POST,PATCH,DELETE');
    next();
});
app.use('/api/favorite', require('./routes/favorite'))
app.use('/api/user', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/project', require('./routes/project'))
app.use('/api/comment', require('./routes/comment'))
app.use('/api/question', require('./routes/question'))
app.use('/api/answer', require('./routes/answer'))
app.use('/api/faq', require('./routes/faq'))
app.use("/public", express.static("public"));

app.listen(5000,()=>console.log("server is listening on port 5000 ..."))