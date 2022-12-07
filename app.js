//!Por el momento, todos los resultados deben ser mostrados por consola
//!Por el momento, se debe poder jugar por consola
//TODO Proximamente, cambiar el funcionamiento de arrays por un funcionamiento con objetos


let score=0
playBtn=document.querySelector("#Start");
playBtn.addEventListener("click", Play);

stopBtn=document.querySelector("#Stop");
stopBtn.addEventListener("click", Reset);


//*Array con valores y simbolos de las cartas
Cards=["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
Symbols=["Picas", "Rombos", "Diamantes", "Treboles"]
CardValue=[]


//*Obtener y mostrar al jugador una carta al azar
function GiveCard(){
    cardNumber=Cards[Math.floor(Math.random()*12)]
    cardSymbol=Symbols[Math.floor(Math.random()*3)]
    console.log("Tu carta es un"+" "+cardNumber+" "+"de"+" "+cardSymbol)
}
//GiveCard();


//*Decidir valor de A segun conveniencia
function AsValue(){
    if (cardNumber=="A") {
        if (CardValue==10) {
            cardNumber=11
        }
        else{cardNumber=1}
    }
    else{}
}


//*Guardar valor de cada carta obtenida
function SaveCard(){
    AsValue()
    CardValue.push(cardNumber)
}
//SaveCard();


//*Dejar de dar carta al jugador
function NoCard() {
    for (let i of CardValue) {
	    score += i;
    }
    console.log("Tienes"+" "+score+" "+"puntos")
}
//NoCard()


//*Verificar si tiene BlackJack (x=21 if numOfCards=2)
function CheckBlackjack() {
    if (CardValue[0]+CardValue[1]==21) {
        console.log("¡BLACKJACK!")
    }
    else {};
}


//*Verificar si puede seguir jugando (x<21)
function KeepPlaying(){
        if (score>20) {
            console.log("Perdiste, pero puedes volver a intentarlo");
        }
        else{
            score = CardValue.reduce((a, b) => a + b, 0);
            console.log("Tienes"+" "+score+" "+"puntos")

    }
}


//*Funcion integral para jugar
function Play(){
    GiveCard();
    SaveCard();
    CheckBlackjack();
    KeepPlaying();
};

function Reset() {
    CardValue=[];
    score=0;
}