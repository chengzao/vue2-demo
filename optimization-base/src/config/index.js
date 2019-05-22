const dotenv = require('dotenv')
dotenv.config()

export const baseURL = process.env.NODE_ENV === 'production' ? '/' : ''
export const isDev = process.env.NODE_ENV === 'development'
export const OUPUTDIR = process.env.VUE_APP_DIR || 'dist'
