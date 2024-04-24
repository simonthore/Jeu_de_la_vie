export class GameOfLife {
    private static readonly DEFAULT_CELL_SIZE = 5;
    private board: number[][];
    private rows: number;
    private cols: number;
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
        this.board = Array(this.rows)
            .fill(null)
            .map(() => Array(this.cols).fill(0));
    }

    getCellState(row: number, col: number): number {
        return this.board[row][col];
    }

    toogleCellState(row: number, col: number): void {
        this.board[row][col] = this.board[row][col] === 0 ? 1 : 0;
    }

    setCellState(row: number, col: number, state: number): void {
        this.board[row][col] = state;
    }

    countLiveNeighbors(row: number, col: number) {
        let count = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i !== 0 || j !== 0) {
                    const neighborRow = row + i;
                    const neighborCol = col + j;
                    if (
                        neighborRow >= 0 &&
                        neighborRow < this.rows &&
                        neighborCol >= 0 &&
                        neighborCol < this.cols
                    ) {
                        if (this.board[neighborRow][neighborCol] === 1) {
                            count++;
                        }
                    }
                }
            }
        }
        return count;
    }

    // Méthode pour vérifier si deux instances de GameOfLife sont égales
    equals(otherGame: GameOfLife): boolean {
        // Comparaison de chaque cellule du plateau
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (
                    this.getCellState(row, col) !==
                    otherGame.getCellState(row, col)
                ) {
                    return false; // Les plateaux sont différents
                }
            }
        }
        return true; // Les plateaux sont identiques
    }

    // Méthode pour vérifier s'il reste des cellules vivantes sur le plateau
    hasLiveCells(): boolean {
        // Parcourir toutes les cellules pour vérifier si au moins une est vivante
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.getCellState(row, col) === 1) {
                    return true; // Il y a au moins une cellule vivante
                }
            }
        }
        return false; // Aucune cellule vivante n'a été trouvée
    }
}
