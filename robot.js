class Game {
    constructor(mapSize, initPosition, icon) {
        this.state = {
            robotPosition: initPosition,
            mapSize: mapSize,
            icon: icon
        };
    }

    availablePosition(newPosition, mapSize) {
        if (newPosition >= 0 && newPosition < mapSize) {
            return true;
        } else {
            return false;
        }
    }

    move(newPosition) {
        if (this.availablePosition(newPosition, this.state.mapSize)) {
            this.state.robotPosition = newPosition;
            this.render();
            return true;
        } else {
            this.state.mapSize++;
            this.move(newPosition);
            return true;
        }
    }

    render() {
        let gameMap = document.createElement("div");
        gameMap.className += "game-map";
        gameMap.setAttribute("id", "game-map");

        let row = document.createElement("div");
        row.className += " map-row";
        gameMap.appendChild(row);
        for (let x = 0; x < this.state.mapSize; x++) {
            let cell = document.createElement("div");
            cell.className += " map-cell"
            if (this.state.robotPosition === x) {
                cell.innerHTML = this.state.icon;
            }
            row.appendChild(cell);
        }
        
        let root = document.getElementById("game-map");
        root.replaceWith(gameMap);
    }

    onCommandRight() {
        this.move(this.state.robotPosition + 1);
    }

}

let game = new Game(10, 2, 'R');
game.render();
