/* 
KEIVYS JOSE RODRIGUEZ GONZALEZ
IG: _krod17
*/
const numeroPregunta = document.querySelector(".numero-pregunta");
const textoPregunta = document.querySelector(".texto-pregunta");
const opcContenedor = document.querySelector(".contenedor-opc");
const answerIndicadorContenedor = document.querySelector(".indicador-respuesta");
const inicioBox = document.querySelector(".inicio");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".resultados");

const nivel1 = quiz;
const nivel2 = quiz1;
const nivel3 = quiz2;
const nivel4 = quiz3;
const nivel5 = quiz4;

let contadorPregunta = 0;
let actualPregunta;
let disponiblePregunta = [];
let opcDisponible = [];
let respuestaCorrecta=0;
let intentos = 0;
let level = 1;
let badAnswer = 0;
let cuota = 200000;

// COLOCAR LAS PREGUNTAS DISPONIBLES EN EL ARRAY
function setDisponiblePregunta(){	
	upNivel();
}
// CONTADOR DE PREGUNTAS
function getNuevaPregunta(){
	// NUMERO DE PREGUNTA
	numeroPregunta.innerHTML = "Pregunta " + (contadorPregunta + 1) + " de " + quiz.length;
	// OBTENER PREGUNTA ALEATORIA
	const indexPregunta = disponiblePregunta[Math.floor(Math.random() * disponiblePregunta.length)]
	actualPregunta = indexPregunta;
	textoPregunta.innerHTML = actualPregunta.q;
	// OBTENER LA POSICIÓN DEL INDEX DEL ARRAY
	const index1 = disponiblePregunta.indexOf(indexPregunta);
	// REMUEVE EL INDEX DE LA PREGUNTA DE LAS PREGUNTAS DISPONIBLES, LA PREGUNTA NO SE REPETIRÁ
	disponiblePregunta.splice(index1,1);
	const opcLen = actualPregunta.options.length
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
		option.innerHTML = actualPregunta.options[optionIndex];
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
	if(id===actualPregunta.answer){
		// CAMBIAR A VERDE LA OPCION CORRECTA Y COLOCA UNA MARCA
		element.classList.add("correct");
		updateAnswerIndicador("correct");
		respuestaCorrecta++;
		level++;
		upNivel();
	}
	else{	
		//CAMBIAR A ROJO LA OPCION ERRONEA Y COLOCA UNA MARCA
		element.classList.add("wrong");
		updateAnswerIndicador("wrong");
		badAnswer++;
		level++;
		upNivel();
	}
	badFinished();
	stopClick();
	
}

// NO SE PUEDEN ELEGIR MAS OPCIONES
function stopClick(){
	const opcLen = opcContenedor.children.length;
	for(let i=0;i<opcLen;i++){
		opcContenedor.children[i].classList.add("respondida");
	}
}

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
	intentos++;
	resultBox.querySelector(".total-preguntas").innerHTML = quiz.length;
	resultBox.querySelector(".total-intentos").innerHTML = intentos;
	const ganancias = respuestaCorrecta * cuota;
	resultBox.querySelector(".total-ganancias").innerHTML = "$ " + ganancias;
	resultBox.querySelector(".total-score").innerHTML = respuestaCorrecta + " / " + quiz.length;
	level=1;
	contadorPregunta=0;
	badAnswer=0;
}

function resetQuiz(){
	contadorPregunta = 0;
	respuestaCorrecta=0;
}

function rendirse(){
	quizBox.classList.add("hide");
	resultBox.classList.remove("hide");
	quizResultado();
}

function goHome(){
	// OCULTA EL RESULTADO DE LA CAJA
	resultBox.classList.add("hide");
	// MUESTRA LA CAJA DE PREGUNTAS
	inicioBox.classList.remove("hide");
	resetQuiz();	
}

function badFinished(){
	if(badAnswer === 3){
		cuota = 0;
		rendirse();
		badAnswer = 0;
		contadorPregunta=0;
	}
}

function startQuiz(){
	badFinished();
	// OCULTA LA CAJA DE INICIO
	inicioBox.classList.add("hide");
	// MUESTRA LA CAJA DEL QUIZ
	quizBox.classList.remove("hide");
	// CAMBIAREMOS TODAS LAS PREGUNTAS EN EL ARRAY
	setDisponiblePregunta();
	// LLAMAREMOS A LA NUEVA PREGUNTA
	getNuevaPregunta();
	// CREA INDICADORES DE RESPUESTA
	answerIndicador();
}

function upNivel(){
	
	switch(level){
		case 1:
			const totalPregunta = quiz.length;
			for(let i=0;i<totalPregunta;i++){
				disponiblePregunta.push(nivel1[i]);
				}
			break;
		case 2:
			const totalPregunta1 = quiz.length;
			for(let i=0;i<totalPregunta1;i++){
				disponiblePregunta.push(nivel2[i]);
			}
			break;
		case 3:
			const totalPregunta2 = quiz.length;
			for(let i=0;i<totalPregunta2;i++){
				disponiblePregunta.push(nivel3[i]);
				}
			break;
		case 4:
			const totalPregunta3 = quiz.length;
			for(let i=0;i<totalPregunta3;i++){
				disponiblePregunta.push(nivel4[i]);
				}
			break;
		case 5:
			const totalPregunta4 = quiz.length;
			for(let i=0;i<totalPregunta4;i++){
				disponiblePregunta.push(nivel5[i]);
				}
			break;
	}
}
