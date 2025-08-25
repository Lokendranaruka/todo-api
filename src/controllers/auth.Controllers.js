const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req,res) =>{
    try{
        const {username, email,password}= req.body;

        const existing =   await User.findOne({email});
        if(!existing) return res.status(400).json({message:"User Already exists"});

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({username,email, password:hashed});
    
        res.status(201).json({message:"User registerd",userId:newUser._id});
    }catch (error){
        res.status(constants.HTTP_CODES.CREATED).json({
            status: constants.STATUS.SUCCESS,
            data: todo,
    })
    }   

};


exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message:"Invalid credentials"});

        const valid = await bcrypt.compare(password,user.password);
        if(!valid) return res.status(400).json({message:"Invalid credentials"});

        const token =jwt.sign({id:user._id,role:user.role},process.env.JWT_SECERET,{expiresIn:"1h"});
        res.json({token});

    }catch(error){
        res.status(500).json({message:error.message});
    }
};