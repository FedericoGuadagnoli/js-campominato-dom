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


//^ OPERAZIONI PRELIMINARI ------------------------------------

// Prendo gli elementi dal DOM
const form = document.getElementById('minefiled-form');
const submit = document.getElementById('submit');
const select = document.getElementById('select');
const grid = document.getElementById('grid');


// Impostazioni iniziali




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
            cell.classList.toggle('clicked');
            console.log(cell);
        });

        //Appendo in pagina
        grid.appendChild(cell);
    }
    
    
});