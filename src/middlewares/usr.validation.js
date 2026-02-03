import { validationResult } from 'express-validator'

const fieldVal = (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json(result)
  }

  next()
}

export default fieldVal
