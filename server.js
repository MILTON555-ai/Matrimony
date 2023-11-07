const express = require('express')
const app = express()
const mongoose = require('mongoose')
const user = require('./model/user')
const User = require('./model/user')
mongoose.set('strictQuery', false)
app.use(express.urlencoded({ extended: false }))
app.set('view engine', "ejs")

const db = "mongodb://localhost:27017/users"
mongoose.connect(db).then(() => {
    console.log('users connection is established');
})

app.get('/',async (req, res) => {
     let users=await user.find()
    res.render('index',{users})
})
app.get('/new', (req, res) => {
    res.render('new')
})
app.post('/', async (req, res) => {
    let userData = new User({//adding data to model
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        religion: req.body.religion,
        profession: req.body.profession,
        location: req.body.location,
        interests: req.body.interests,
        about: req.body.about

    })
    try {
        await userData.save()
        res.redirect('/')
    }
    catch (err) {
        res.render('new')
    }
})
app.get('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndRemove(userId); 
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while deleting the user.');
    }
});
app.put('/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body; 

        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while updating the user' });
    }
});


app.listen(3000, () => {
    console.log('listening on port 3000');
})