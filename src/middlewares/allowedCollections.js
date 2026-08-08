const collectionVal = (req, res, next) => {
  const { bits, collection } = req.params
  const allowedCollections = [ 'fraudbani', 'fuckbani', '32', '64']
        if ( !allowedCollections.includes(collection) && !allowedCollections.includes(bits) ) {
          return res.status(400).json ({msg: 'Colección invalida!'})
        }
  next()
}

export default collectionVal