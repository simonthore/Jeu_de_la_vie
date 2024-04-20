export class GameOfLife {
    private static readonly DEFAULT_CELL_SIZE = 25;
    private board: number [][];
    private rows: number;
    private cols:number;
    private cellSize: number;

    public getRows(): number {
        return this.rows;
    }

    public getCols(): number {
        return this.cols;
    }

    public getCellSize(): number {
        return this.cellSize;
    }

    constructor(rows: number, cols: number) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = GameOfLife.DEFAULT_CELL_SIZE;
        this.board = Array(this.rows).fill(null).map(()=>Array(this.cols).fill(0));
    }

    getCellState(row: number, col:number): number {
        return this.board[row][col];
    }

    toogleCellState(row: number, col:number): void {
        this.board[row][col] = this.board[row][col] === 0 ? 1 : 0;
    }
   
    setCellState(row:number, col:number, state:number): void {
        this.board[row][col] = state
    }

    countLiveNeighbors(row:number, col:number){
        let count = 0;

        for(let i=-1; i<=1; i++ ){
            for(let j=-1; j<=1; j++){
                if(i !==0 || j !==0){
                    const neighborRow = row + i;
                    const neighborCol = col + j;
                    if(neighborRow >= 0 && neighborRow <this.rows && neighborCol >= 0 && neighborCol < this.cols) {
                        if(this.board[neighborRow][neighborCol] === 1) {
                            count++;
                        }
                    }
                }
            }
        }
        return count
    }
}