import bcryptjs from 'bcryptjs';
import User from '../model/user.model.js';

const signup = async (req, res, next) => {
   const { username, password, email } = req.body;
   try {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await new User({ username, email, password: hashedPassword }).save();
      res.status(201).json(`user ${username} created`);
   } catch (error) {
      next(error);
   }
};

export { signup };
