import gameUi from '@ui';
gameUi.onBetClick((param) => {
    console.log(param);
})

let count = 0;
gameUi.onHigherBetClick(() => {
    console.log('higher');
    count++;
    if(count === 3){
        gameUi.winGame();
    }
})

gameUi.onLowerBetClick(() => {
    console.log('lower');
    count--;
    if(count === -3){
        gameUi.loseGame();
    }
})