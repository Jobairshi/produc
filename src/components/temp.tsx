import { useState } from "react";
import { sections } from "../exports/data";
import { Gridgap, GridSize_height, GridSize_width } from "../exports/GridSize";

const gridHeight = GridSize_height;
const gridWidth = GridSize_width;
const grid_gap = Gridgap;

export default function Box() {
  const data = sections[0];
  
  // Extract xJYPtme settings
  const xJYPtme = data.data["xJYPtme"]; // Assuming you have it under data
  
  const pcGrid = xJYPtme.data.config.base.settings.grid;
  const tabletGrid = xJYPtme.data.config.base.media.tablet.settings.grid;
  const mobileGrid = xJYPtme.data.config.base.media.mobile.settings.grid;

  const pcStyle = xJYPtme.data.config.base.style;
  const tabletStyle = xJYPtme.data.config.base.media.tablet.style;
  const mobileStyle = xJYPtme.data.config.base.media.mobile.style;

  const [con_w, setCon_w] = useState(pcGrid.column * (gridWidth + grid_gap));
  const [con_h, setCon_h] = useState(pcGrid.row * (gridHeight + grid_gap));

  const numCols = Math.round(con_w / (gridWidth + grid_gap));
  const numRows = Math.round(con_h / (gridHeight + grid_gap));

  function handlePcClick() {
    setCon_w(pcGrid.column * (gridWidth + grid_gap));
    setCon_h(pcGrid.row * (gridHeight + grid_gap));
  }

  function handleTabletClick() {
    setCon_w(tabletGrid.column * (gridWidth + grid_gap));
    setCon_h(tabletGrid.row * (gridHeight + grid_gap));
  }

  function handleMobileClick() {
    setCon_w(mobileGrid.column * (gridWidth + grid_gap));
    setCon_h(mobileGrid.row * (gridHeight + grid_gap));
  }

  const gridCells = Array.from({ length: numCols * numRows }, (_, index) => ({
    row: Math.floor(index / numCols),
    col: index % numCols,
  }));

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
          onClick={handlePcClick}
        >
          PC
        </button>

        <button
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            backgroundColor: "#008CBA",
            color: "#fff",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
          onClick={handleTabletClick}
        >
          Tablet
        </button>

        <button
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
          onClick={handleMobileClick}
        >
          Mobile
        </button>
      </div>

      <div
        className="parent"
        style={{
          display: "grid",
          margin: "auto",
          gridTemplateColumns: `repeat(${numCols}, ${gridWidth}px)`,
          gridTemplateRows: `repeat(${numRows}, ${gridHeight}px)`,
          gap: `${grid_gap}px`,
          width: `${con_w}px`,
          height: `${con_h}px`,
          border: "2px solid black",
          position: "relative",
        }}
      >
        {gridCells.map(({ row, col }) => (
          <div
            key={`${row}-${col}`}
            style={{
              borderRadius: "3px",
              width: gridWidth,
              height: gridHeight,
              backgroundColor: "rgba(0,0,0,0.1)",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
        ))}

        {/* Render xJYPtme box */}
        <div
          id={xJYPtme.id}
          style={{
            gridRowStart: pcStyle.gridRowStart,
            gridRowEnd: pcStyle.gridRowEnd,
            gridColumnStart: pcStyle.gridColumnStart,
            gridColumnEnd: pcStyle.gridColumnEnd,
            border: pcStyle.border.style,
            borderRadius: pcStyle.borderRadius,
            backgroundColor: "#ddd", // Add a color for visibility
            position: "absolute",
          }}
        ></div>
      </div>
    </>
  );
}
