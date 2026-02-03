import { requests } from './index.js'

const getUrbiCoins = async(req, res, authorization, id) => {
      //req.body.add_urbicoins = 50
  //console.log(req.body)
  const uid = id || req.body.user_id
  console.log(`Recibe uid --> ${ uid || 'FALSO' }`)
  const body = { user_id: uid, add_urbicoins: 1 }
  //for (let i = 0; i < 15; i++) {
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/addPoints`,
      'POST',
      body,
      authorization || null
    );
    console.log(`Dentro da faltante --> ${resp.new_coins
    || 'FALSO'}`)
    return resp.new_coins

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
 // console.log('ap')
  }
  //} 
}

export default getUrbiCoins