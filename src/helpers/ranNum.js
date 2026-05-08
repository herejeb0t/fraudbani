const ranNum = () => {

  const resto = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, '0');

  return '81' + resto;
}

export default ranNum