import { useState } from "react";

const App = () => {
  const [gridSize, setGridSize] = useState(16);
  const [grid, setGrid] = useState(Array(16 * 16).fill({ color: null, opacity: 0 }));

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleMouseOver = (index) => {
    setGrid((prevGrid) =>
      prevGrid.map((cell, i) =>
        i === index
          ? {
              color: cell.color || generateRandomColor(),
              opacity: Math.min(cell.opacity + 0.1, 1),
            }
          : cell
      )
    );
  };

  const clearGrid = () => {
    setGrid(Array(gridSize * gridSize).fill({ color: null, opacity: 0 }));
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen overflow-hidden 
                    bg-gradient-to-br from-[#cfe2f3] to-[#a2b9c5]">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center p-10 bg-[#dde7ee] shadow-lg rounded-xl mt-10">
        {/* Title */}
        <h1 className="text-3xl font-semibold mb-6 text-[#2b3a42]">Etch-a-Sketch</h1>

        {/* Grid Size Slider */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[#3b4c5c]">Grid Size:</span>
          <input
            type="range"
            min="2"
            max="64"
            value={gridSize}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              setGridSize(newSize);
              setGrid(Array(newSize * newSize).fill({ color: null, opacity: 0 }));
            }}
            className="w-40 cursor-pointer accent-[#3b4c5c]"
          />
          <span className="text-[#2b3a42] font-medium">{gridSize} x {gridSize}</span>
        </div>

        {/* Grid Container */}
        <div
          className="grid border border-gray-300 rounded-md overflow-hidden shadow-md"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: "500px",
            height: "500px",
          }}
        >
          {grid.map((cell, index) => (
            <div
              key={index}
              onMouseOver={() => handleMouseOver(index)}
              style={{
                backgroundColor: cell.color,
                opacity: cell.opacity,
                transition: "background-color 0.3s ease, opacity 0.3s ease",
              }}
              className="border border-gray-200"
            ></div>
          ))}
        </div>

        {/* Clear Button */}
        <button
          onClick={clearGrid}
          className="mt-6 px-6 py-2 bg-[#3b4c5c] text-white font-medium rounded-lg shadow-md
                     hover:bg-[#2b3a42] transition-all duration-300"
        >
          Clear Grid
        </button>
      </div>
    </div>
  );
};

export default App;
