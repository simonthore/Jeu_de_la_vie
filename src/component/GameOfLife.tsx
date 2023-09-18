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
}