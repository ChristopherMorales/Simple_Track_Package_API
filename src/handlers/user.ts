import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const hash = await hashPassword(req.body.password);

    try {
      const user = await prisma.user.create({
        data: {
          username: req.body.username.toLowerCase(),
          password: hash,
        },
      });

      const token = createJWT(user);
      res.json({ token });

    } catch (error) {
      console.log(error)
      error.type='input'
      next(error)
    }

  } catch (error) {
    error.type = 'input'
    next(error.message)
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username.toString().toLowerCase() },
    });
  
    if (!user) {
      res.status(404).json({ message: "Invalid username or password" });
    }
  
    const isValid = await comparePasswords(req.body.password, user.password);
  
    if (!isValid) {
      res.status(401);
      res.send("Invalid username or password");
      return;
    }
  
    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    next(error)
  }
};