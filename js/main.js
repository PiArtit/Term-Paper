// Temporary array, just to check the working capacity, later will be graphical images instead
var card_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];    
var card_value = [];  
var card_ID = [];   
var card_flipped = 0;  //counter

// Method for card shuffle for card_array
Array.prototype.card_shuffle = function () {    
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));  
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

// Method for card flipping on click
function FlipCard(card, val) {
    if (card.innerHTML == "" && card_value.length < 2) { 
        card.style.background = '#FFF';                
        card.innerHTML = val;
        if (card_value.length == 0) {           // No card is open
            card_value.push(val);
            card_ID.push(card.id);
        } else if (card_value.length == 1) {    // One card is open
            card_value.push(val);
            card_ID.push(card.id);
            if (card_value[0] == card_value[1]) {
                card_flipped += 2;
                card_value = [];    // Clear both arrays
                card_ID = [];
                if (card_flipped == card_array.length) {  // Check if the whole board is cleared
                    alert("Game complete! Push the 'OK' button to create a new game.");
                    document.getElementById('board').innerHTML = "";
                    newBoard();
                }
            } else {
                 // Flip 2 cards back over
                function FlipBack() {
                    var card_1 = document.getElementById(card_ID[0]);   
                    var card_2 = document.getElementById(card_ID[1]);
                    card_1.style.background = 'url(images/tile_bg.jpg) no-repeat';
                    card_1.innerHTML = "";
                    card_2.style.background = 'url(images/tile_bg.jpg) no-repeat';
                    card_2.innerHTML = "";
                    card_value = [];     // Clear both arrays
                    card_ID = [];
                }
                setTimeout(FlipBack, 500);
            }
        }
    }
}

// Create new board
function newBoard() {
    card_flipped = 0;
    var output = '';
    card_array.card_shuffle();
    for (var i = 0; i < card_array.length; i++) {
        output += '<div id="card_' + i + '"onclick = "FlipCard(this,\'' + card_array[i] + '\')" ></div > ';
    }
    document.getElementById('board').innerHTML = output;
}
