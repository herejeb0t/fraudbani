const palabras = [
  'Estudiante',
  'Profesionista',
  'Emprendedor',
  'Desempleado',
  'Jubilado',
  'Ama de casa',
  'Actor porno',
  'Narcotraficante',
  'Extorsionador',
  'Asaltante',
  'Otro'
];

const ranOcc = () => {
  const indice = Math.floor(Math.random() * palabras.length);
  return palabras[indice];
}

export default ranOcc