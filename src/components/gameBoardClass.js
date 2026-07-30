class GameBoard {
    constructor() {
        this.player = this.createBoard();
        this.computer = this.createBoard();
    }

    createBoard() {
        const board = [];

        for (let i = 0; i < 12; i++) {
            board.push([]);
            for (let j = 0; j < 12; j++)
                board[i].push("e");
        }
        return board;
    }
}

export { GameBoard };