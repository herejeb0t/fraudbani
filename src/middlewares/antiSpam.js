import rateLimit from 'express-rate-limit'

const commentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: 'Skc alv! .l.'
})

const userV2Limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 1,
  message: 'Skc alv! .l.'
})

export { commentLimiter, userV2Limiter }
