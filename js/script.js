console.log( 'JS OK');

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.


//^ FUNZIONI --------------------------------------------------
const createCell = () => {
    const cell = document.createElement('div');
    cell.classList.add ('cell');
    
    return cell;
}

// Genero un numero random senza ripetizioni
const generateBombs = (maxNumber, totalNumbers) => {
    const bombs = [];
    
    
    while (bombs.length < totalNumbers) {
      let random;

      do {
        random = Math.floor(Math.random() * maxNumber) + 1;
      } while (bombs.includes(random));
      bombs.push(random);
    }
    
    return bombs;
}

// Creo una funzione per stabilire se vinco o perdo
const GameOver = (score, hasHitBomb) => {
    const message = hasHitBomb ? `Hai perso: Hai totalizzato ${score}` : `Hai vinto: Hai totalizzato ${score}`;
    alert(message); 
}
//^ OPERAZIONI PRELIMINARI ------------------------------------

// Prendo gli elementi dal DOM
const form = document.getElementById('minefiled-form');
const submit = document.getElementById('submit');
const select = document.getElementById('select');
const grid = document.getElementById('grid');
const scoreElement = document.getElementById('display-score');


//^ EVENTI DINAMICI -----------------------------------------

// Aggiungo un evento al click del bottone
form.addEventListener('submit', function(event){
    
    // Blocco il riavvio della pagina
    event.preventDefault();
    

    // Svuoto la griglia
    grid.innerHTML = '';
    
    // Decido il numero delle celle in base alla difficoltà
    const mode = select.value;
    console.log(mode);
    let rows = 10;
    let cols = 10;

    if (mode === 'medium'){
        rows = 9;
        cols = 9;   
    } else if (mode === 'hard') {
        rows = 7;
        cols = 7;
    }

    const totalCells = rows * cols; // 100

     // Preparo un contatore del punteggio dell'utente
     let score = 0;
     // Segno le bombe 
     const totalBombs = 16;

     // Prepareo il massimo del punteggio
     const maxScore = totalCells - totalBombs;

     // Genero le bombe 
     const bombs = generateBombs(totalCells, totalBombs);
     console.log(bombs);
    
    //^ OPERAZIONI DI AVVIO -----------------------------------------

    // Creo un ciclo per reindirizzare le celle
    for ( let i = 1; i <= totalCells; i++ ) {
        
        // Creo una cella
        let cell = createCell();

        // Verifico quante celle ci devono essere in base alla scelta dell'tente
        cell.classList.add('easy');
        if (mode === 'medium') {
            cell.classList.add('medium');
        } else if ( mode === 'hard') {
            cell.classList.add('hard');
        }
        
        // Creo il numero
        const number = parseInt(i);


        //Aggancio il numero alla cella
        cell.append(number);

       

        // Aggiungo un evento al click della cella
        cell.addEventListener('click', function(){
            if(cell.classList.contains('clicked')) {
                return;
            }
            cell.classList.add('clicked');
            
            // Verifico se vinco o perdo e quanti punti totalizzo
            const hasHitBomb = bombs.includes(parseInt(this.innerText));
            console.log(hasHitBomb);
            if (hasHitBomb) {
                cell.setAttribute('style', 'background-color: red', ' color:yellow');
                GameOver(score, hasHitBomb);
            } else {
                scoreElement.innerText = `Punteggio: ${++score}`;
                if (score === maxScore) {
                  GameOver(score, hasHitBomb);
                }
            }         
        });

        //Appendo in pagina
        grid.appendChild(cell);
    }
});