require('dotenv').config(); // Load ENV Variables
const express = require('express'); //import express
const methodOverride = require('method-override'); 
const mongoose = require('mongoose')

const app = express();

const Logs = require('./models/logs');
const jsxViewEngine = require('jsx-view-engine');

//global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// // Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

//MiddleWare
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near top, around the other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('<h1>this is my Captains log</h1>');
    
});

// I - INDEX - dsiplays a list of all fruits
// app.get('/index',  (req, res) => {
//     res.send('<h1>Index</h1>');
// })
app.get('/index', async (req, res) => {
    // res.send(fruits);
    try {
        const foundLogs = await Logs.find({});
        res.status(200).render('Index', {logs: foundLogs});
    } catch (err) {
        res.status(400).send(err);
    }
    
});

// N - NEW - Route
app.get('/new', (req, res) => {
    res.render('New')
});


// D - DELETE - PERMANENTLY removes fruit from the database
// app.delete('/fruits/:id', async (req, res) => {
//     // res.send('deleting...');
//     try {
//         const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);
//         console.log(deletedFruit);
//         res.status(200).redirect('/fruits');
//     } catch (err) {
//         res.status(400).send(err);
//     }
// })

// U - UPDATE - makes the actual changes to the database based on the EDIT form
// app.put('/fruits/:id', async (req, res) => {
//     if (req.body.readyToEat === 'on') {
//         req.body.readyToEat = true;
//     } else {
//         req.body.readyToEat = false;
//     }

//     try {
//         const updatedFruit = await Fruit.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true },
//         );
//         console.log(updatedFruit);
//         res.status(200).redirect(`/fruits/${req.params.id}`);
//     } catch (err) {
//         res.status(400).send(err);
//     }
//  })
// CREATE -

app.post('/logs', async (req, res) => {
    // res.send('data received');
    if(req.body.shipIsBroken === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.shipIsBroken = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.shipIsBroken = false;
    }

    try {
        const createdLog = await Logs.create(req.body);
        res.status(200).redirect('/Show');
    } catch (err) {
        res.status(400).send(err);
    }

    //console.log(req.body);
    //res.send( req.body);
    //res.send('data received)

    
});

// E - EDIT - allow the user to provide the inputs to change the log
// app.get('/fruits/:id/edit', async (req, res) => {
//     try {
//         const foundFruit = await Fruit.findById(req.params.id);
//         console.log('foundFruit');
//         console.log(foundFruit)
//         res.status(200).render('Edit', {fruit: foundFruit});
//     } catch (err) {
//         res.status(400).send(err);
//     }
// })

// S - SHOW - Show route displays details of an individual 
app.get('/show', async (req, res) => {
    //res.send('<h1>Show Page</h1>');
    try {
        const foundLogs = await Logs();
        res.render('Show', {logs: foundLogs});
    } catch (err) {
        res.status(400).send(err);
    }
});


app.listen(3001, () => {
    console.log('listening');
})