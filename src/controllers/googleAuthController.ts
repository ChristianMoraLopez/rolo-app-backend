import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    
    // Verificar el token de Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token payload');
    }

    // Buscar si el usuario ya existe
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      // Si no existe, crear nuevo usuario
      user = new User({
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
        password: 'google-auth', // Puedes generar una contraseña aleatoria
        role: 'registered'
      });
      await user.save();
    }

    // Generar JWT
    const jwtToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || '',
      { expiresIn: '7d' }
    );

    res.json({
      user,
      token: jwtToken
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
};