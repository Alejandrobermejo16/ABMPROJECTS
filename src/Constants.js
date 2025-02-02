// Declara la constante data fuera de la clase
const LENGUAJESDEPROGRAMACION = [
    { name: 'Javascript', nivel_Lenguaje: 20, color: '#FFBB28' },
    { name: 'Java', nivel_Lenguaje: 5, color: '#00C49F' },

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
    { name: 'ANGULAR/DEVTOOLS', nivel_Libreria: 10, color: '#00C49F' },
    { name: 'Lit', nivel_Libreria: 20, color: '#d89f13' },

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

   
  
   function validacionPass(password){
     let longMin = 8;
     let mayus = /[A-Z]/.test(password);
     let minus = /[a-z]/.test(password);
     let CaracterEspecial = /[^a-zA-Z0-9]/.test(password);
     let tieneNumero = /\d/.test(password);

     if(password.length <= 0){
      return 'Deben de rellenarse todos los campos del formulario'
    }
    else if(password.length < longMin){
      return 'La contraseña debe de contener al menos 8 caracteres'
    } else if( !mayus) {
      return 'La contraseña debe de contener al menos una Mayuscula'

    }else if( !minus) {
      return 'La contraseña debe de contener al menos una Minuscula'
    }
      else if( !CaracterEspecial) {
        return 'La contraseña debe de contener al menos un caracter especial'
      }
      else if( !tieneNumero) {
        return 'La contraseña debe de contener al menos un Numero'
      }

      return true;
  } 
 

  function  protectedShow(cadena) {
    // Crea una variable para almacenar el nuevo string
    let resultado = '';

    // Define la longitud del string
    const longitud = cadena.length;

    for (let i = 0; i < longitud; i++) {
        if (i < 4 || i >= longitud - 4) {
            // Mantiene los primeros 4 y los últimos 4 caracteres
            resultado += cadena.charAt(i);
        } else if (!isNaN(cadena.charAt(i))) {
            // Si es un número, reemplázalo por '*'
            resultado += '*';
        } else {
            // Mantiene los caracteres que no son números
            resultado += cadena.charAt(i);
        }
    }

    return resultado;
}

function datosCuenta(numero_Cuenta, nombre) {
  let nombreTit = nombre;
  let cuenta = numero_Cuenta;
  let limite_Credito = 2500 + "€";  
  let saldo_Actual = (Math.random() * 2500).toFixed(2) + "€";
  let EstadoCuenta = "Activo";
  
  let dataCuenta = {
    titular: nombreTit,
    num_cuenta: cuenta,
    lim_credito: limite_Credito,
    Saldo_Actual: saldo_Actual,
    Estado_Cuenta: EstadoCuenta,
  };
  
  return dataCuenta;
}


function datosTarjeta(numero_Tarjeta, nombre) {
  let nombre_Tit = nombre;
  let tarjeta = numero_Tarjeta;
  let limite_Credito = 1500 + "€";  // Agregar el símbolo de euro
  let saldo_Actual = (Math.random() * 1500).toFixed(2) + "€";  // Agregar el símbolo de euro
  let CVV = Math.trunc(Math.random() * (999 - 100) + 100);
  let typeCard = ["Visa", "Mastercard", "American Express"];
  let randomCard = typeCard[Math.trunc(Math.random() * typeCard.length)];
  let fech_caducidad = getRandomMonthAndYear();

  let dataTarjeta = {
    titular: nombre_Tit,
    num_tarjeta: tarjeta,
    lim_credito: limite_Credito,
    Saldo_Actual: saldo_Actual,
    CVV: CVV,
    typeCard: randomCard,
    fech_caducidad: fech_caducidad
  };
  
  return dataTarjeta;
}


function getRandomMonthAndYear() {
  // Generar un año aleatorio entre 2024 y 2030
  const year = Math.floor(Math.random() * (31 - 24)) + 24; // 2024 a 2030

  // Generar un mes aleatorio entre 0 y 11 (0 es enero, 11 es diciembre)
  const month = Math.floor(Math.random() * 12);

  // Retornar el mes y el año en formato "MM/YYYY"
  return `${String(month + 1).padStart(2, '0')}/${year}`;
}

module.exports = {validacionPass,protectedShow,datosCuenta,datosTarjeta,getRandomMonthAndYear,  LENGUAJESDEPROGRAMACION, FRAMEWORKS, OTROS, LIBRERIAS, GALERIARESERVASHIPICA, GALERIARESERVASHIPICA2 };

