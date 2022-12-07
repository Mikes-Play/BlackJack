//!Por el momento, todos los resultados deben ser mostrados por consola
//!Por el momento, se debe poder jugar por consola
//TODO Proximamente, cambiar el funcionamiento de arrays por un funcionamiento con objetos


let score=0
playBtn=document.querySelector("#Start");
playBtn.addEventListener("click", Play);

playBtn2=document.querySelector("#DrawCard");
playBtn2.addEventListener("click", Play);

resetBtn=document.querySelector("#Reset");
resetBtn.addEventListener("click", Reset);

Player=document.querySelector("#Player");


//*Array con valores y simbolos de las cartas
Cards=["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
Symbols=["Picas", "Rombos", "Diamantes", "Treboles"]
CardValue=[]


//*Obtener y mostrar al jugador una carta al azar
function GiveCard(){
    cardNumber=Cards[Math.floor(Math.random()*12)]
    cardSymbol=Symbols[Math.floor(Math.random()*3)]
    Player.innerHTML+='<p> Tu carta es un'+' '+cardNumber+' '+'de'+' '+cardSymbol+'</p>'
    
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
    score = CardValue.reduce((a, b) => a + b, 0);
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
        Player.innerHTML+="¡BLACKJACK!"
    }
    else {};
}


//*Verificar si puede seguir jugando (x<21)
function KeepPlaying(){
        if (score>21) {
            Player.innerHTML+="Tienes"+" "+score+" "+"puntos. ¡Te Pasaste! "
            Player.innerHTML+="Perdiste, pero puedes volver a intentarlo";
        }
        else{
            Player.innerHTML+="Tienes"+" "+score+" "+"puntos"

    }
}


//*Funcion integral para jugar
function Play(){
    GiveCard();
    SaveCard();
    KeepPlaying();
    CheckBlackjack();
};

function Reset() {
    CardValue=[];
    score=0;
    Player.innerHTML=" "
}