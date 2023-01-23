//!Por el momento, todos los resultados deben ser mostrados como texto
//TODO Proximamente, cambiar el funcionamiento de arrays por un funcionamiento con objetos


let score=0
let dealerScore=0

playBtn=document.querySelector("#Start");
playBtn.addEventListener("click", Start);

drawBtn=document.querySelector("#DrawCard");
drawBtn.addEventListener("click", Play);

stayBtn=document.querySelector("#StayHere")
stayBtn=addEventListener("onclick", noCard);

resetBtn=document.querySelector("#Reset");
resetBtn.addEventListener("click", Reset);

Player=document.querySelector("#Player");


//*Array con valores y simbolos de las cartas
Cards=["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
Symbols=["Picas", "Rombos", "Diamantes", "Treboles"]
CardValue=[]


//*Iniciar el juego
function Start() {
    cardNumber=Cards[Math.floor(Math.random()*12)]
    cardSymbol=Symbols[Math.floor(Math.random()*3)]
    Player.innerHTML+='<p> Tu carta es un'+' '+cardNumber+' '+'de'+' '+cardSymbol+'</p>'
    SaveCard()
    AsValue()
    cardNumber=Cards[Math.floor(Math.random()*12)]
    cardSymbol=Symbols[Math.floor(Math.random()*3)]
    Player.innerHTML+='<p> Tu carta es un'+' '+cardNumber+' '+'de'+' '+cardSymbol+'</p>'
    SaveCard()
    AsValue()
    CheckBlackjack()
    noMore()
    Player.innerHTML+="Tienes"+" "+score+" "+"puntos"
    dealerFirstCard()
    playBtn.disabled=true

}


//? SISTEMA DE JUEGO DEL PLAYER

//*Obtener y mostrar al jugador una carta al azar
function GiveCard(){
    cardNumber=Cards[Math.floor(Math.random()*12)]
    cardSymbol=Symbols[Math.floor(Math.random()*3)]
    Player.innerHTML+='<p> Tu carta es un'+' '+cardNumber+' '+'de'+' '+cardSymbol+'</p>'
    
}


//*Decidir valor de A segun conveniencia
function AsValue(){
    if (cardNumber=="A") {
        if (CardValue<=10) {
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
};


//*Dejar de dar carta al jugador
function noCard() {
    Player.innerHTML+='<p> Te plantas ante el crupier con '+score+' puntos! </p>'
    playBtn.disabled=true, drawBtn.disabled=true

}


//*Verificar si tiene BlackJack (x=21 if numOfCards=2)
function CheckBlackjack() {
    if (CardValue[0]+CardValue[1]==21) {
        Player.innerHTML+=' '+" ¡BLACKJACK! "
        playBtn.disabled=true
    }
    else {};
}


//*Verificar si puede seguir jugando (x<21)
function KeepPlaying(){
        if (score>21) {
            Player.innerHTML+="Tienes"+" "+score+" "+"puntos. ¡Te Pasaste! "
            Player.innerHTML+="Perdiste, pero puedes volver a intentarlo";
            playBtn.disabled=true, drawBtn.disabled=true, stayBtn.disabled=true
        }
        else{
            Player.innerHTML+="Tienes"+" "+score+" "+"puntos"

    }
}


//*Deshabilitar btn #DrawCard
function noMore() {
    if (score==21) {
        playBtn.disabled=true, drawBtn.disabled=true
    }
}


//*Funcion integral para jugar
function Play(){
    GiveCard();
    SaveCard();
    KeepPlaying();
    noMore();
    CheckBlackjack();
};


//*Funcion para resetear el juego
function Reset() {
    CardValue=[];
    score=0;
    dealerCardValue=[]
    dealerScore=0
    Player.innerHTML="Tu eres el Jugador"
    Crupier.innerHTML="Este es el Crupier"
    playBtn.disabled=false
    drawBtn.disabled=false
}




//? SISTEMA DE JUEGO DEL CRUPIER

dealerCardValue=[]


//*Repartir la 1ra carta al Dealer
function dealerFirstCard (){
    dealerCardNumber=Cards[Math.floor(Math.random()*12)]
    dealerCardSymbol=Symbols[Math.floor(Math.random()*3)]
    Crupier.innerHTML+='<p> La carta del crupier es un '+' '+dealerCardNumber+' de '+dealerCardSymbol+'</p>'
    saveDealerCards();
}


//*Repartir el resto de cartas al Dealer
function dealerCards() {
    while (dealerScore<=16) {
        dealerCardNumber=Cards[Math.floor(Math.random()*12)]
        dealerCardSymbol=Symbols[Math.floor(Math.random()*3)]
        Crupier.innerHTML+='<p> La carta del crupier es un '+dealerCardNumber+' de '+dealerCardSymbol+'</p>'
        saveDealerCards()
    }

    Crupier.innerHTML+='<p> El crupier tiene '+dealerScore+' puntos </p>'
}


//*Guardar el valor de la carta del Dealer
function saveDealerCards() {
    dealerAsValue();
    dealerCardValue.push(dealerCardNumber) 
    dealerScore = dealerCardValue.reduce((a, b) => a + b, 0)
}


//*Determinar el valor del As del Dealer
function dealerAsValue(){
    if (dealerCardNumber=="A") {
        if (dealerCardValue<=10) {
            dealerCardNumber=11
        }
        else{dealerCardNumber=1}
    }
    else{}
}


//*Verificar si el Dealer tiene BlackJack (x=21 if numOfCards=2)
function checkDealerBlackjack() {
    if (dealerCardValue[0]+dealerCardValue[1]==21) {
        Crupier.innerHTML+=' '+" ¡BLACKJACK! "
    }
    else {};
}


//* Determinar victoria o derrota del PLayer vs Crupier
function winOrLose() {
    if (dealerScore<=21) {
        if (dealerScore==score) {
            Player.innerHTML+= "¡EMPATE!"
        }
        else{
            if (dealerScore<score) {
                Player.innerHTML+="¡TU GANAS ANTE EL CRUPIER! ¡FELICIDADES!"
        }
        else{
            Crupier.innerHTML+="¡EL CRUPIER GANA! Lo sentimos"}}

        
    }
    else{Crupier.innerHTML+="¡El crupier se pasó de 21!", Player.innerHTML+= "¡TU GANAS!"}

    
}

//*Funcion integral del Dealer
function dealerPlay () {
    dealerCards();
    checkDealerBlackjack();
    winOrLose();
}