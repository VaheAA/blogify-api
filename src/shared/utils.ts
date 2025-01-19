import { Request } from 'express'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'

const scrypt = promisify(_scrypt)

function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? []
  return type === 'Bearer' ? token : undefined
}

async function hashPassword(password: string) {
  const salt = randomBytes(8).toString('hex')
  const hash = (await scrypt(password, salt, 32)) as Buffer
  return salt + '.' + hash.toString('hex')
}

async function comparePassword(password: string, storedPassword: string) {
  const [salt, storedHash] = storedPassword.split('.')

  const hash = (await scrypt(password, salt, 32)) as Buffer

  return hash.toString('hex') === storedHash
}

export { extractTokenFromHeader, hashPassword, comparePassword }
