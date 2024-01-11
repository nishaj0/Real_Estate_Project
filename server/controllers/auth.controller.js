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

export { signup, login };
