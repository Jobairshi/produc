import { useState } from "react";
import { sections } from "../exports/data";
import { Gridgap, GridSize_height, GridSize_width } from "../exports/GridSize";

const gridHeight = GridSize_height;
const gridWidth = GridSize_width;
const grid_gap = Gridgap;

export default function Box() {
  const data = sections[0];
  const parent_row =
    data.data["1sxmburc"].data.config.base.settings.grid.column;
  const parent_col = data.data["1sxmburc"].data.config.base.settings.grid.row;
  const ini_w = parent_row * (gridWidth + grid_gap); // this is the initial width of the parent
  const ini_h = parent_col * (gridHeight + grid_gap); // this is the initial height of the parent
  const [con_w, setCon_w] = useState(ini_w);
  const [con_h, setCon_h] = useState(ini_h);
  const numCols = Math.round(con_w / (gridWidth + grid_gap)); // this is the number of columns
  const numRows = Math.round(con_h / (gridHeight + grid_gap)); // this is the number of rows
  const [currentStyleName, setCurrentStyleName] = useState("pc");

  const xJYPtme = data.data["xJYPtme"];
  const pcStyle = xJYPtme.data.config.base.style;
  const tabletStyle = xJYPtme.data.config.base.media.tablet.style;
  const mobileStyle = xJYPtme.data.config.base.media.mobile.style;

  const qVQcBcu = data.data["qVQcBcu"];
  const qVPcstyle = qVQcBcu.data.config.base.style;
  const qVtabletStyle = qVQcBcu.data.config.base.media.tablet.style;
  const qVmobileStyle = qVQcBcu.data.config.base.media.mobile.style;
  const qvContent = qVQcBcu.data.content;

  const uJRxCFO = data.data["uJRxCFO"];
  const uJPcstyle = uJRxCFO.data.config.base.style;
  const uJtabletStyle = uJRxCFO.data.config.base.media.tablet.style;
  const uJmobileStyle = uJRxCFO.data.config.base.media.mobile.style;
  const ujContent = uJRxCFO.data.content;

  function handlePcClick() {
    setCurrentStyleName("pc");

    setCon_w(ini_w);
    setCon_h(ini_h);
  }

  function handleTabletClick() {
    const tb_w =
      data.data["1sxmburc"].data.config.base.media.tablet.settings.grid.column *
      (gridWidth + grid_gap);
    const tb_h =
      data.data["1sxmburc"].data.config.base.media.tablet.settings.grid.row *
      (gridHeight + grid_gap);

    setCurrentStyleName("tablet");

    setCon_w(tb_w);
    setCon_h(tb_h);
  }

  function handleMobileClick() {
    const mb_w =
      data.data["1sxmburc"].data.config.base.media.mobile.settings.grid.column *
      (gridWidth + grid_gap);
    const mb_h =
      data.data["1sxmburc"].data.config.base.media.mobile.settings.grid.row *
      (gridHeight + grid_gap);

    setCurrentStyleName("mobile");

    setCon_w(mb_w);
    setCon_h(mb_h);
  }

  const gridCells = Array.from({ length: numCols * numRows }, (_, index) => ({
    row: Math.floor(index / numCols),
    col: index % numCols,
  }));

  const style =
    currentStyleName === "pc"
      ? pcStyle
      : currentStyleName === "tablet"
      ? tabletStyle
      : mobileStyle;

  const qvStyle =
    currentStyleName === "pc"
      ? qVPcstyle
      : currentStyleName === "tablet"
      ? qVtabletStyle
      : qVmobileStyle;

  const ujStyle =
    currentStyleName === "pc"
      ? uJPcstyle
      : currentStyleName === "tablet"
      ? uJtabletStyle
      : uJmobileStyle;
  return (
    <>
      total number of row , col : {numRows} , {numCols}
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
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a010")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
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
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#007bb5")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#008CBA")}
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
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#da190b")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#f44336")}
        >
          Mobile
        </button>
      </div>
      <div
        className="parent"
        id={data.data["1sxmburc"].id}
        style={{
          display: "grid",
          margin: "auto",
          gridTemplateColumns: `repeat(${numCols}, ${gridWidth}px)`,
          gridTemplateRows: `repeat(${numRows}, ${gridHeight}px)`,
          gap: `${grid_gap}px`,
          width: `${con_w}px`,
          height: `${con_h}px`,
          backgroundColor: "yellow",
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
        <div
          id={xJYPtme.id}
          style={{
            display: "grid",
            gridRowStart: style.gridRowStart,
            gridRowEnd: style.gridRowEnd,
            gridColumnStart: style.gridColumnStart,
            gridColumnEnd: style.gridColumnEnd,
            position: "relative",
            backgroundColor: "white",
          }}
        >
          {/* hellow world , {style.gridColumnStart} {style.gridRowStart} ,
          {style.gridColumnEnd} ,{style.gridRowEnd}{" "} */}

          <div
            style={{
              display: "grid",
              gridRowStart: qvStyle.gridRowStart,
              gridRowEnd: qvStyle.gridRowEnd,
              gridColumnStart: qvStyle.gridColumnStart,
              gridColumnEnd: qvStyle.gridColumnEnd,
              fontSize: "20px",
              fontWeight: "600",
              color: "#6730bc",
              position: "relative",
            }}
          >
            {qvContent}
          </div>

          <div
            style={{
              display: "grid",
              gridRowStart: ujStyle.gridRowStart,
              gridRowEnd: ujStyle.gridRowEnd,
              gridColumnStart: ujStyle.gridColumnStart,
              gridColumnEnd: ujStyle.gridColumnEnd,
              color: "#555555",
              position: "relative",
            }}
          > {ujContent} 
          </div>
        </div>
      </div>
    </>
  );
}
