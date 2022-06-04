/* 
KEIVYS JOSE RODRIGUEZ GONZALEZ
IG: _krod17
*/
//CONSTANTES OBTENIDAS DEL HTML
const numeroPregunta = document.querySelector(".numero-pregunta");
const textoPregunta = document.querySelector(".texto-pregunta");
const opcContenedor = document.querySelector(".contenedor-opc");
const answerIndicadorContenedor = document.querySelector(".indicador-respuesta");
const inicioBox = document.querySelector(".inicio");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".resultados");
const cronometro1 = document.querySelector(".cronometro");
const color_fondo = document.getElementById('color_fondo')
const topResultados = document.querySelector(".top");

// SONIDOS
const correctSound = new Audio('sound/correct-sound.mp3');
const incorrectSound = new Audio('sound/incorrect-sound.mp3');

//CONSTANTES PARA LOS NIVELES DE LAS PREGUNTAS
const nivel1 = quiz;
const nivel2 = quiz1;
const nivel3 = quiz2;
const nivel4 = quiz3;
const nivel5 = quiz4;

//VARIABLES 
let contadorPregunta = 0;
let preguntaActual;
let preguntaDisponible = [];
let opcDisponible = [];
let respuestaCorrecta=0;
let intentos = 1;
let level = 1;
let respuestaIncorrecta = 0;
let cuota = 200000;
let stopContador = 6;
let nombres = [];
let premios = [];

// CONTADOR DE PREGUNTAS
function getNuevaPregunta(){
	// NUMERO DE PREGUNTA
	numeroPregunta.innerHTML = "Pregunta " + (contadorPregunta + 1) + " de " + quiz.length;
	// OBTENER PREGUNTA ALEATORIA
	const indexPregunta = preguntaDisponible[Math.floor(Math.random() * preguntaDisponible.length)]
	preguntaActual = indexPregunta;
	textoPregunta.innerHTML = preguntaActual.q;
	// OBTENER LA POSICIÓN DEL INDEX DEL ARRAY
	const index1 = preguntaDisponible.indexOf(indexPregunta);
	// REMUEVE EL INDEX DE LA PREGUNTA DE LAS PREGUNTAS DISPONIBLES, LA PREGUNTA NO SE REPETIRÁ
	preguntaDisponible.splice(index1,1);
	const opcLen = preguntaActual.options.length
	// COLOCA LAS OPCIONES EN EL ARRAY DE OPCIONES DISPONIBLE
	for(let i=0;i<opcLen; i++){
		opcDisponible.push(i);
	}
	// CREAR LAS OPCIONES
	opcContenedor.innerHTML = '';
	let animacion = 0.2;
	// CREAR LAS OPCIONES EN HTML
	for(let i=0;i<opcLen;i++){
		// OPCION ALEATORIA
		const optionIndex = opcDisponible[Math.floor(Math.random() * opcDisponible.length)];
		// OBTIENE LA POSICION DE 'optionIndex' DE 'opcDisponible'
		const index2 = opcDisponible.indexOf(optionIndex);
		// REMUEVE EL 'optionIndex' DE 'disponiblePregunta', LA OPCION NO SE REPETIRÁ
		opcDisponible.splice(index2,1);
		const option = document.createElement("div");
		option.innerHTML = preguntaActual.options[optionIndex];
		option.id = optionIndex;
		option.style.animationDelay = animacion + 's';
		animacion = animacion + 0.5;
		option.className = "opcion";
		opcContenedor.appendChild(option)
		option.setAttribute("onclick","getResult(this)");
	}
		contadorPregunta++;
}
function getResult(element){
	const id = parseInt(element.id);
	if(id===preguntaActual.answer){
		// CAMBIAR A VERDE LA OPCION CORRECTA Y COLOCA UNA MARCA
		element.classList.add("correct");
		updateAnswerIndicador("correct");
		correctSound.play();
		respuestaCorrecta++;
		level++;
		subirDeCategoria();
	}
	else{	
		//CAMBIAR A ROJO LA OPCION ERRONEA Y COLOCA UNA MARCA
		element.classList.add("wrong");
		updateAnswerIndicador("wrong");
		incorrectSound.play();
		respuestaIncorrecta++;
		level++;
		subirDeCategoria();
	}
	gameOver();
	stopClick();	
}
// NO SE PUEDEN ELEGIR MAS OPCIONES
function stopClick(){
	const opcLen = opcContenedor.children.length;
	for(let i=0;i<opcLen;i++){
		opcContenedor.children[i].classList.add("respondida");
	}
}
//INDICADOR DE RESPUESTA
function answerIndicador(){
	answerIndicadorContenedor.innerHTML = '';
	const totalPregunta = quiz.length;
	for(let i=0;i<totalPregunta;i++){
		const indicador = document.createElement("div");
		answerIndicadorContenedor.appendChild(indicador);
	}
}
function updateAnswerIndicador(markType){
	answerIndicadorContenedor.children[contadorPregunta-1].classList.add(markType);
}
//FUNCION PARA CUANDO DAN CLICK EN "SIGUIENTE" 
function next(){
	if(contadorPregunta === quiz.length){
		quizFin();
	} else{	
		getNuevaPregunta();
	}
}
function quizFin(){
	//OCULTA LA CAJA DEL QUIZ
	quizBox.classList.add("hide");
	// MUESTRA LA CAJA DE RESULTADO
	resultBox.classList.remove("hide");
	quizResultado();
}
// OBTENER LOS RESULTADOS
function quizResultado(){
	resultBox.querySelector(".total-preguntas").innerHTML = quiz.length;
	resultBox.querySelector(".total-intentos").innerHTML = intentos;
	const ganancias = respuestaCorrecta * cuota;
	premios.push(ganancias);
	guardaPremio();
	//intentos++;
	resultBox.querySelector(".total-ganancias").innerHTML = "$ " + ganancias;
	resultBox.querySelector(".total-score").innerHTML = respuestaCorrecta + " / " + quiz.length;
	level=1;
	contadorPregunta=0;
	respuestaIncorrecta=0;
}

// FUNCION PARA EL BOTON DE RENDIRSE
function rendirse(){
	quizBox.classList.add("hide");
	resultBox.classList.remove("hide");
	quizResultado();
}

function volverAlInicio(){
	let resetIntentos = intentos;
	console.log(intentos);
	if(resetIntentos === 5){
		intentos=1;
		nombres = [];
		premios = [];
	}else{intentos++;}
	// OCULTA EL RESULTADO DE LA CAJA
	resultBox.classList.add("hide");
	// OCULTA EL TOP FIVE
	topResultados.classList.add("hide");
	// MUESTRA LA CAJA DE PREGUNTAS
	inicioBox.classList.remove("hide");
	contadorPregunta = 0;
	respuestaCorrecta=0;	
}
// FINALIZA EL JUEGO AL DAR CLICK EN LA TERCERA PREGUNTA ERRONEA
function gameOver(){
	if(respuestaIncorrecta === 3){
		cuota = 0;
		rendirse();
		respuestaIncorrecta = 0;
		contadorPregunta=0;
	}
}
function topFive(){
	topResultados.classList.remove("hide");
}

function showTop(){
	switch(intentos){
		case 1:
			topUsuarios.innerHTML = nombres[0];
			break;
		case 2:
			topUsuarios1.innerHTML = nombres[1];
			break;
		case 3:
			topUsuarios2.innerHTML = nombres[2];
			break;
		case 4:
			topUsuarios3.innerHTML = nombres[3];
			break;
		case 5:
			topUsuarios4.innerHTML = nombres[4];
			break;
	}
}

function guardaPremio(){
	switch(intentos){
		case 1:
			topPremio.innerHTML = premios[0] + " $";
			break;
		case 2:
			topPremio1.innerHTML = premios[1] + " $";
			break;
		case 3:
			topPremio2.innerHTML = premios[2] + " $";
			break;
		case 4:
			topPremio3.innerHTML = premios[3] + " $";
			break;
		case 5:
			topPremio4.innerHTML = premios[4] + " $";
			break;
	}
}

function startQuiz(){

	var txtValor = document.getElementById("txtNombre").value;
	nombres.push(txtValor);
	showTop();
	gameOver();
	// OCULTA LA CAJA DE INICIO
	inicioBox.classList.add("hide");
	// MUESTRA LA CAJA DEL QUIZ
	quizBox.classList.remove("hide");
	// CAMBIAREMOS TODAS LAS PREGUNTAS EN EL ARRAY
	subirDeCategoria();
	// LLAMAREMOS A LA NUEVA PREGUNTA
	getNuevaPregunta();
	// CREA INDICADORES DE RESPUESTA
	answerIndicador();
}

// COLOCAR LAS PREGUNTAS DISPONIBLES EN EL ARRAY
function subirDeCategoria(){
	switch(level){
		case 1:
			const categoria = quiz.length;
			for(let i=0;i<categoria;i++){
				preguntaDisponible.push(nivel1[i]);
				}
			break;
		case 2:
			const categoria1 = quiz.length;
			for(let i=0;i<categoria1;i++){
				preguntaDisponible.push(nivel2[i]);
			}
			break;
		case 3:
			const categoria2 = quiz.length;
			for(let i=0;i<categoria2;i++){
				preguntaDisponible.push(nivel3[i]);
				}
			break;
		case 4:
			const categoria3 = quiz.length;
			for(let i=0;i<categoria3;i++){
				preguntaDisponible.push(nivel4[i]);
				}
			break;
		case 5:
			const categoria4 = quiz.length;
			for(let i=0;i<categoria4;i++){
				preguntaDisponible.push(nivel5[i]);
				}
			break;
	}
}
/* 
KEIVYS JOSE RODRIGUEZ GONZALEZ
IG: _krod17
*/
