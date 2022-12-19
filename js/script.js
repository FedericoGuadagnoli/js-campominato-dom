console.log( 'JS OK');

// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata
// si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// MILESTONE 1
// Prepariamo l'HTML ed il CSS per ottenere il risultato grafico che vediamo nell'immagine allegata.
// MILESTONE 2
// Rimuoviamo le celle che abbiamo inserito nell'HTML in modo da generarle tramite JS. Al click del bottone play, vengono generate 100 celle in 10 righe da 10 celle ciascuna.
// MILESTONE 3
// In ogni cella, deve comparire il numero corrispondente, in ordine da 1 a 100;
// #MILESTONE 4
// Al click sulla cella, stampiamo il numero della cella cliccata in console, poi coloriamo la cella d'azzurro!
// BONUS
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;


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
    
    // 
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

    // Creo un ciclo per reeindirizzare le celle
    for ( let i = 0; i < totalCells; i++ ) {
           
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
        const number = parseInt(i + 1);

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