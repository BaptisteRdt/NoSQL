const userModel = require('../models/userModel');
const {hashPassword, comparePassword} = require('../../services/auth')
const jwt = require('jsonwebtoken')



// Inscription 

async function signin (req, res) {
    try {
        const {email, password} = req.body;

        // User null
        if (email === null || password === null) {
            return res.status(503).json({message : 'Email or Paswword are null'})
        }
        // User exist 
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.status(404).json({message: 'User already exists'});
        }

        // insérer dans la db les information
        const hashedPassword = await hashPassword(password);

        const newUser = new userModel ({
            email,
            password : hashedPassword
        });

        await newUser.save();

        // renvoyer l'utilisateur 
        const user = newUser.toObject();
        delete user.password
        res.json(user) 
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Login 
async function login (req, res) {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) return res.status(404).send('wrong email');

        const match = await comparePassword(password, user.password);
        if(!match) return res.status(400).send("wrong password");

        const token = jwt.sign({user}, process.env.SECRET, {
            expiresIn: '3600s',
            algorithm: 'HS256'
        });

        res.setHeader('Authorization', token);
        const userToreturn = user.toObject();
        delete userToreturn.password;
        res.json(userToreturn)
    } catch (error) {
        res.status(500).json({message : error.message}) 
    }
}


// Déconnexion 


module.exports = {
    signin,
    login
}