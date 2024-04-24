import { GameOfLife } from "./component/GameOfLife";

// Règle 1 : Une cellule morte ayant exactement 3 cellules voisines vivantes devient une cellule vivante.

export function rule1(
    row: number,
    col: number,
    currentGame: GameOfLife
): number {
    const liveNeighbors = currentGame.countLiveNeighbors(row, col);
    const cellState = currentGame.getCellState(row, col);

    // Appliquer les règles du jeu de la vie à chaque cellule
    if (cellState === 0 && liveNeighbors === 3) {
        return 1; // Cellule naît
    } else {
        return cellState; // Conserver l'état actuel de la cellule
    }
}

// Règle 2 & 3 : Une cellule vivante ayant moins de deux voisines vivantes meurt d'isolement,
//           tandis qu'une cellule vivante ayant plus de trois voisines vivantes meurt de surpopulation.

export function rule2(
    row: number,
    col: number,
    currentGame: GameOfLife
): number {
    const liveNeighbors = currentGame.countLiveNeighbors(row, col);
    const cellState = currentGame.getCellState(row, col);
    if (cellState === 1 && liveNeighbors < 2) {
        return 0;
    } else if (cellState === 1 && liveNeighbors > 3) {
        return 0;
    } else {
        return cellState;
    }
}

export type RuleFunction = (
    row: number,
    col: number,
    currentGame: GameOfLife
) => number;

export function applyRules(
    currentGame: GameOfLife,
    ruleFunctions: RuleFunction[]
): GameOfLife {
    const numRows = currentGame.getRows();
    const numCols = currentGame.getCols();
    const nextGame = new GameOfLife(numRows, numCols);

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            let newCellState = currentGame.getCellState(row, col);
            for (const ruleFunction of ruleFunctions) {
                newCellState = ruleFunction(row, col, currentGame);
                if (newCellState !== currentGame.getCellState(row, col)) {
                    break;
                }
            }
            nextGame.setCellState(row, col, newCellState);
        }
    }

    return nextGame;
}
