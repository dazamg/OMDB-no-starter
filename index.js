require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
const fs=require('fs')
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(ejsLayouts);
app.get('/', (req, res) =>{
    res.render('index')
})
app.get('/movies', (req, res)=> {
    let seachTerm = req.query.q
    console.log(req.query)
    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY}&s=${seachTerm}`)
    .then(response=>{
    let results = response.data.Search
        res.render('show', {result: results})
        // res.send(results)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.get('/movies/:idx', (req, res) => {
    let movieLinks = req.params.idx
    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY}&s=${movieLinks}`)
    .then(response=>{
    
        res.send('show', response.data)
    })
})

app.listen(process.env.PORT)

