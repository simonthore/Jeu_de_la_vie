import React from "react";
import "./App.css"
function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const squareSize = 25; 

  React.useEffect(() => {

    const canvas = canvasRef.current;
    if(canvas !== null){
    const context = canvas.getContext('2d');
      if(context){
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);

        // quadrillage du gameBoard
        for(let x = 0 ; x <= canvas.width; x += squareSize){
        context.moveTo(x,0)
        context.lineTo(x, canvas.height) 
        }
        for(let y = 0; y <= canvas.height; y+= squareSize){
          context.moveTo(0,y)
          context.lineTo(canvas.width, y)
        }
        context.strokeStyle = "lightgray"
        context.stroke();
      }
    }
  }, [squareSize]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if(canvas){
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const context = canvas.getContext('2d');
      if(context){
        const rowIndex = Math.floor(y/squareSize)
        const colIndex = Math.floor(x/squareSize)

        // récupère les coordonnées du coin supérieur gauche de mon carré
        const startX = colIndex * squareSize;
        const startY = rowIndex * squareSize;
   
        // renvoie un objet contenant les données de mon carré dont la couleur de ses pixels
        const imageData = context.getImageData(startX, startY, 1, 1).data
        // Changer la couleur du carré en fonction de sa couleur actuelle
        context.fillStyle = 'green';
        context.fillRect(startX, startY, squareSize, squareSize);
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
