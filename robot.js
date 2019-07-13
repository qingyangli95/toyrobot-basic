var state = {
    robotPosition: 0,
    mapSize: 5,
    icon: 'R',
    elementBlock: 9999
}

var temppos=0

var histories = [];

function availablePosition(newPosition, mapSize) {
    if (newPosition >= 0 && newPosition < mapSize) {
        return true;
    } else {
        return false;
    }
}

function move(newPosition) {
    if (availablePosition(newPosition, state.mapSize)) {
        temppos=state.robotPosition;
        histories.push(temppos);
        state.robotPosition = newPosition;
        render();
        return true;
    } else {
        //return false;
        onExpand(newPosition);
        onCommandRight()
    }
}

function render() {
    var mapCells = document.querySelectorAll('.map-cell');
    mapCells.forEach((aCell, index) => {
        if (index === state.robotPosition) {
            aCell.innerHTML = state.icon;
        } else {
            aCell.innerHTML = '';
        }
    })
}

function onCommandRight() {
    move(state.robotPosition + 1);
}

function onReverse() {
    state.robotPosition = histories.pop();
    render();
}

function onExpand(newPosition){
    var para = document.createElement("div");
    para.className = "map-cell";
    para.index = newPosition;
    para.onclick = onclick(para.index);
    document.getElementById("row0").appendChild(para);
    state.mapSize++;

}

function onChangeIcon(){
    if(state.icon == 'R'){
        state.icon = "Robot";
    }else{
        state.icon = 'R';
    }
    render();
}

function onBlock(id){
    if(robotPosition!=id){
        elementBlock = id;
        document.getElementById(id).innerHTML='B';
    }


}

render();