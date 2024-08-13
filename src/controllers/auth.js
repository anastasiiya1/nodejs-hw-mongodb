import { registerUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Succesfully registrated a user!',
    data: user,
  });
};


export const loginUserController = async(req,res) => {
	const user = await loginUser(req.body);
}