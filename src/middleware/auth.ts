import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

// 🔐 Authenticate User
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      email: string
      role: string
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    })

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'User not found or inactive' })
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' })
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    return res.status(500).json({ error: 'Authentication failed' })
  }
}

// 🛡️ Role Authorization
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    next()
  }
}