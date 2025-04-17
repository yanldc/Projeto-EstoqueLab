import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from './AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    console.error('JWT token is missing.');
    throw new AppError('JWT token is missing.', 'unauthorized', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, 'secret');
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: Number(sub),
    };
    return next();
  } catch (err) {
    console.error('Invalid JWT token.');
    throw new AppError('Invalid JWT token.', 'unauthorized', 401);
  }
}
