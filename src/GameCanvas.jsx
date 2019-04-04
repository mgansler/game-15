import * as React from "react";

export default class GameCanvas extends React.Component {
    empty = {x: 4, y: 4};

    constructor() {
        super()
        this.tiles = []

        for (let y = 0; y < 4; y++) {
            this.tiles[y] = []
            for (let x = 0; x < 4; x++) {
                this.tiles[y][x] = {x, y}
                if (x === 3 && y === 3) {
                    this.tiles[y][x] = this.empty
                }
            }
        }

        this.shuffle(100)
    }

    shuffle(steps) {
        for (let i = 0; i < steps; i++) {
            this.move(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), false)
        }
    }

    move(x, y, verifiy = true) {
        if (x > 0 && this.tiles[y][x - 1] === this.empty) {
            this.tiles[y][x - 1] = this.tiles[y][x];
            this.tiles[y][x] = this.empty
        }

        if (x < 3 && this.tiles[y][x + 1] === this.empty) {
            this.tiles[y][x + 1] = this.tiles[y][x];
            this.tiles[y][x] = this.empty
        }

        if (y > 0 && this.tiles[y - 1][x] === this.empty) {
            this.tiles[y - 1][x] = this.tiles[y][x];
            this.tiles[y][x] = this.empty
        }

        if (y < 3 && this.tiles[y + 1][x] === this.empty) {
            this.tiles[y + 1][x] = this.tiles[y][x];
            this.tiles[y][x] = this.empty
        }

        if (verifiy) {
            this.verify()
        }

        this.forceUpdate()
    }

    verify() {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if ( this.tiles[y][x]===this.empty)
                    continue
                if ((this.tiles[y][x].x !== x || this.tiles[y][x].y !== y ))
                    return
            }
        }

        console.log("Solved!")
    }

    imgUrl = "https://d3td2int7n7fhj.cloudfront.net/sites/default/files/media/image/2018-07/Cat%20bath.jpg";

    render() {
        return (
            <div style={{
                width: "960px",
                height: "960px",
                display: "grid",
                gridTemplateRows: "repeat(4, 1fr)",
                gridTemplateColumns: "repeat(4, 1fr)"
            }}>
                {this.tiles.map(
                    (row, y) => {
                        return row.map(
                            (tile, x) => {
                                return <div
    onClick={() => this.move(x, y)}
    style={{
        gridColumnStart: x + 1,
        gridRowStart: y + 1,
        background: `url("${this.imgUrl}") no-repeat`,
        backgroundPosition: `${tile.x * -240}px ${tile.y * -240}px`
    }}/>
                            }
                        )
                    }
                )}
            </div>
        )
    }
}
