import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../model/user.model.js';
import { errorHandler } from '../utils/error.js';

const signup = async (req, res, next) => {
   const { username, password, email } = req.body;
   try {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await new User({
         username,
         email,
         password: hashedPassword,
      }).save();
      res.status(201).json(`user ${username} created`);
   } catch (error) {
      next(error);
   }
};

const login = async (req, res, next) => {
   const { email, password } = req.body;
   try {
      const findUser = await User.findOne({ email });
      if (!findUser) return next(errorHandler(404, 'User not found'));

      const isMatch = bcryptjs.compareSync(password, findUser.password);
      if (!isMatch) return next(errorHandler(400, 'invalid credentials'));

      // create token
      const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);

      // take out password from user object
      const { password: pass, ...rest } = findUser._doc;
      res.status(200)
         .cookie('access_token', token, { httpOnly: true })
         .json(rest);
   } catch (error) {
      next(error);
   }
};

const googleAuth = async (req, res, next) => {
   try {
      const user = await User.findOne({ email: req.body.email });
      // * login with google
      if (user) {
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
         const { password: pass, ...rest } = user._doc;

         res.status(200)
            .cookie('access_token', token, { httpOnly: true })
            .json(rest);
      } else {
         // * sign up with google
         // ? generate 16 character long random password
         const generatePassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
         const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

         const newUser = await new User({
            // ? generate username from name
            username:
               req.body.name.split(' ').join('').toLowerCase() +
               // adding 4 random characters to make username unique
               Math.random().toString(36).slice(-4),
            email: req.body.email,
            password: hashedPassword,
            avatar: req.body.photo,
         }).save();

         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
         const { password: pass, ...rest } = newUser._doc;

         res.status(200)
            .cookie('access_token', token, { httpOnly: true })
            .json(rest);
      }
   } catch (error) {
      next(error);
   }
};

export { signup, login, googleAuth };
