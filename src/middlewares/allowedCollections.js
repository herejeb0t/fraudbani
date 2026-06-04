const collectionVal = (req, res, next) => {
  const { collection } = req.params
  const allowedCollections = [ 'fraudbani', 'fuckbani' ]
        
        if ( !allowedCollections.includes(collection) ) {
          return res.status(400).json ({msg: 'Colección invalida!'})
        }
  next()
}

export default collectionVal