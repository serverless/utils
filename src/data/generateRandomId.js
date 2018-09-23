import crypto from 'crypto-extra'

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'

const generateRandomId = (length) => crypto.randomString(length, ALPHABET)

export default generateRandomId
