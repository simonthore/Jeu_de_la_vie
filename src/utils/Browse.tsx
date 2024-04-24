import { GameOfLife } from "../component/GameOfLife";

export function foreachCell ( game: GameOfLife, callback: (row: number, col: number) => void){
    const numRows = game.getRows();
    const numCols = game.getCols();

    for(let row=0; row<numRows; row++){
        for(let col=0; col<numCols; col++){
            callback(row,col);
        }
    }
}