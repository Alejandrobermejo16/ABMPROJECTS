// Declara la constante data fuera de la clase
const LENGUAJESDEPROGRAMACION = [
    { name: 'Javascript', nivel_Lenguaje: 20, color: '#FFBB28' },
    { name: 'Java', nivel_Lenguaje: 15, color: '#00C49F' },

    { name: 'Php', nivel_Lenguaje: 10, color: '#FF0000' },
    { name: 'TypeScript', nivel_Lenguaje: 5, color: '#0000FF' },
];


const FRAMEWORKS = [
    { name: 'React', nivel_FrameWork: 20, color: '#0000FF' },
    { name: 'Angular', nivel_FrameWork: 7, color: '#FF0000' },
    { name: 'Android SDK', nivel_FrameWork: 4, color: '#00FF00' },

];

const OTROS = [
    { name: 'Git', otros: 20, color: '#FFA500' },
    { name: 'Jira', otros: 19, color: '#0000FF' },
    { name: 'BitBucket', otros: 19, color: '#0000FF' },
    { name: 'GCP', otros: 15, color: '#FF0000' },
    { name: 'Postman/Swagguer', otros: 10, color: '#FF6600' },
];

const LIBRERIAS = [
    { name: 'REDUX', nivel_Libreria: 20, color: '#00C49F' },
    { name: 'SAGAS', nivel_Libreria: 19, color: '#00C49F' },
    { name: 'EXT/REACT', nivel_Libreria: 15, color: '#00C49F' },
    { name: 'REACT/BOOTSTRAP', nivel_Libreria: 10, color: '#FF0000' },
    { name: 'ANGULAR DEVTOOLS', nivel_Libreria: 10, color: '#FF0000' },

];

const caballo = require('../src/img/2.png');
const caballo2 = require('../src/img/3.png');
const caballo3 = require('../src/img/4.png');

const GALERIARESERVASHIPICA = [
    { src: caballo, descripcion: 'Descripción de la imagen 1' },
    { src: caballo2, descripcion: 'Descripción de la imagen 2' },
    { src: caballo3, descripcion: 'Descripción de la imagen 3' }
];

const caballo5 = require('../src/img/5.jpg');
const caballo6 = require('../src/img/6.jpg');



const GALERIARESERVASHIPICA2 = [
    { 
      src: caballo5, 
      descripcion: 'Descripción de la imagen 1', 
      texto: 'Actividades y Horarios', 
      textoPosicion: 'derecha',
      volteada: true,
      textoVolteada: `Lunes a viernes de 9:00-22:00 \n☎️ tlf: 642034521\n Actividades Encuestres:\nPaseo Ladera Real => 09:00-12:00\nTaller Conocimiento del Caballo => 13:00-15:00\n
      Sesion de Fotos => 15:15-15:45\n Juegos para niños => 17:30-20:00   
      `},
    {
      src: caballo6, 
      descripcion: 'Descripción de la imagen 2', 
      texto: 'Sobre Nosotros', 
      textoPosicion: 'derecha',
      volteada: true, // Esta tarjeta estará volteada por defecto
      textoVolteada: 'Hípica Don Faustino\n\nUbicada en San Sebastián de los Reyes, en Camino Llano, la Hípica Don Faustino ha estado haciendo felices a experimentados jinetes desde 1961.\n\nCon más de seis décadas de tradición y excelencia, nuestra escuela ecuestre es un lugar donde la pasión por los caballos y la dedicación al arte de la equitación se unen para ofrecer una experiencia inolvidable' // Texto personalizado en la tarjeta volteada
    }
    
    
  ];
  


module.exports = {    LENGUAJESDEPROGRAMACION, FRAMEWORKS, OTROS, LIBRERIAS, GALERIARESERVASHIPICA, GALERIARESERVASHIPICA2 };

