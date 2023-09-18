import React, {useState, useEffect} from "react";
import "./App.css"
import { GameOfLife } from "./component/GameOfLife";

function renderGame(context: CanvasRenderingContext2D, game: GameOfLife, squareSize: number){
  for(let row = 0; row < game.getRows(); row++){
    for(let col = 0; col < game.getCols(); col++){
    const cellState = game.getCellState(row, col);
    context.fillStyle = cellState === 0 ? 'white' : 'green';
    context.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
    }
  }
}

function drawGrid(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, squareSize: number) {
  for(let x = 0 ; x <= canvasWidth; x += squareSize){
    context.moveTo(x, 0);
    context.lineTo(x, canvasHeight);
  }
  for(let y = 0; y <= canvasHeight; y += squareSize){
    context.moveTo(0, y);
    context.lineTo(canvasWidth, y);
  }
  context.strokeStyle = "lightgray";
  context.stroke();
}

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState(new GameOfLife(34, 34));
  const squareSize = 25;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      renderGame(context,game,squareSize);
      drawGrid(context, canvas.width, canvas.height, squareSize);
      }
    }
  }, [game]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if(canvas){

      // getBoundingClientRect permet de récupérer les coordonnées du canvas par rapport à la fenêtre
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rowIndex = Math.floor(y / squareSize);
      const colIndex = Math.floor(x / squareSize);

      // bascule de l'état de la cellule
      game.toogleCellState(rowIndex, colIndex);

      // redesine le canvas
      const context = canvas.getContext('2d');
      if (context) {
        renderGame(context, game, squareSize);
        drawGrid(context, canvas.width, canvas.height, squareSize);
    }
  }
};
 
  
  return (
    <>
    <h1>Le jeu de la vie !</h1>
    <div id="gameBoard">
      <canvas ref={canvasRef} width="850" height="550" onClick={handleCanvasClick}></canvas>
    </div>
    </>
  );
}

export default App;
