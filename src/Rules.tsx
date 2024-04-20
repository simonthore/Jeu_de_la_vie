
import { GameOfLife } from "./component/GameOfLife";

// Créez une fonction dans votre fichier Rules.tsx pour appliquer la règle n°1
export function applyRule1(currentGame: GameOfLife): GameOfLife {
  const numRows = currentGame.getRows();
  const numCols = currentGame.getCols();
  const nextGame = new GameOfLife(numRows, numCols);

  // Parcourez chaque cellule du jeu
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const liveNeighbors = currentGame.countLiveNeighbors(row, col);

      // Vérifiez si la cellule est morte et a exactement 3 voisines vivantes
      if (currentGame.getCellState(row, col) === 0 && liveNeighbors === 3) {
        // Si c'est le cas, la cellule devient vivante dans le jeu suivant
        nextGame.setCellState(row, col, 1);
      } else {
        // Sinon, conservez l'état actuel de la cellule dans le jeu suivant
        nextGame.setCellState(row, col, currentGame.getCellState(row, col));
      }
    }
  }

  // Renvoyez le jeu modifié avec la règle appliquée
  return nextGame;
}
