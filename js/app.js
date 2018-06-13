'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

$(document).ready(init);

function init() {
    if (localStorage.gQuestsTree){
        gQuestsTree =JSON.parse(localStorage.gQuestsTree) ;
    }
    else{
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
}

function startGuessing() {
    $('.box h1').text('Guess Who');
    $('.gameStart').hide();
    renderQuest();
    // TODO: show the gameQuest section
}

function renderQuest() {
    // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
    $('.gameQuest h2').text(gCurrQuest.txt);
    $('.gameQuest').show();
}

function userResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            $('.box h1').text('😃');
            restartGame();
            // TODO: improve UX
        } else {
            // TODO: hide and show gameNewQuest section
            $('.box h1').text('😢');
            $('.gameNewQuest').show();
            $('.gameQuest').hide(); 
        }
    } else {
        // TODO: update the prev, curr and res global vars
        gPrevQuest = gCurrQuest;
        if (res === 'yes') {
            gLastRes = 'yes'; 
            gCurrQuest = gCurrQuest.yes;
        } else {
            gLastRes = 'no';
            gCurrQuest = gCurrQuest.no;
        }
        renderQuest();
    }
}

function addGuess() {
    // TODO: create 2 new Quests based on the inputs' values
    var newQuest = createQuest($('#newQuest').val());
    var newGuess = createQuest($('#newGuess').val());
    // TODO: connect the 2 Quests to the quetsions tree
    if (gLastRes === 'yes'){
        gPrevQuest.yes = newQuest;
    }
    else {
        gPrevQuest.no = newQuest;
    }
    newQuest.yes = newGuess;
    newQuest.no = gCurrQuest;
    
    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() {
    localStorage.setItem('gQuestsTree',JSON.stringify( gQuestsTree));
    $('.gameNewQuest').hide();
    $('.gameQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}