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
  const ini_w = parent_row * (gridWidth + grid_gap); // initial widh of the parent
  const ini_h = parent_col * (gridHeight + grid_gap); // initial heiht of the parent
  const [con_w, setCon_w] = useState(ini_w);
  const [con_h, setCon_h] = useState(ini_h);
  const numCols = Math.round(con_w / (gridWidth + grid_gap)); // numbr of columns
  const numRows = Math.round(con_h / (gridHeight + grid_gap)); // numbr of rows
  const [currentStyleName, setCurrentStyleName] = useState("pc");
  const [previousDeviceType, setPreviousDeviceType] = useState("pc");

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



  function doingSomthing(com_start_row: number, com_start_col: number, com_end_row: number, com_end_col: number,con_height: number,con_width: number) {
    const parent_height = con_height;
    const parent_width = con_width;
  
    let height = (com_end_row - com_start_row) * (gridHeight + grid_gap);
    let width = (com_end_col - com_start_col) * (gridWidth + grid_gap);
  
    if (height > parent_height || width > parent_width) {
      if (currentStyleName === 'tablet') {
        height = Math.round(height * 0.6667);
        width = Math.round(width * 0.6667);
      } else if (currentStyleName === 'mobile') {
        height = Math.round(height * 0.3333);
        width = Math.round(width * 0.3333);
      }
    }
    
  
    console.log("Resized height >> ", height);
    console.log("Resized width >> ", width);
  

    let new_com_end_row = com_start_row + Math.ceil(height / (gridHeight + grid_gap));
    let new_com_end_col = com_start_col + Math.ceil(width / (gridWidth + grid_gap));

    const maxTabletRows = Math.floor(parent_height / (gridHeight + grid_gap));
    const maxTabletCols = Math.floor(parent_width / (gridWidth + grid_gap));
    const maxMobileRows = Math.floor(parent_height / (gridHeight + grid_gap));
    const maxMobileCols = Math.floor(parent_width / (gridWidth + grid_gap));  
  
    if (currentStyleName === 'tablet') {

      if (new_com_end_row > maxTabletRows) {
        new_com_end_row = maxTabletRows;
      }
      if (new_com_end_col > maxTabletCols) {
        new_com_end_col = maxTabletCols;
      }
    } else if (currentStyleName === 'mobile') {
   
      if (new_com_end_row > maxMobileRows) {
        new_com_end_row = maxMobileRows;
      }
      if (new_com_end_col > maxMobileCols) {
        new_com_end_col = maxMobileCols;
      }
    }
  
    console.log("New start row: ", com_start_row, "New end row: ", new_com_end_row);
    console.log("New start column: ", com_start_col, "New end column: ", new_com_end_col);
    return {com_start_row, com_start_col, new_com_end_row, new_com_end_col};
  }
  
  

  function calculateNewPosition(
    numTabCols: number,
    numTabRows: number,
    pcStyle
  ) {
    console.log("this is for numTabCols", numTabCols);
    console.log("this is for numTabRows", numTabRows);
    const pc_w = 72;
    const pc_h = 60;
    const new_row_start =
      Math.round((pcStyle.gridRowStart / pc_w) * numTabRows) > 0
        ? Math.round((pcStyle.gridRowStart / pc_w) * numTabRows)
        : 1;
    const new_col_start =
      Math.round((pcStyle.gridColumnStart / pc_h) * numTabCols) > 0
        ? Math.round((pcStyle.gridColumnStart / pc_h) * numTabCols)
        : 1;
    const new_col_end =
      Math.round((pcStyle.gridColumnEnd / pc_w) * numTabCols) > 0
        ? Math.round((pcStyle.gridColumnEnd / pc_w) * numTabCols)
        : 1;
    const new_row_end =
      Math.round((pcStyle.gridRowEnd / pc_h) * numTabRows) > 0
        ? Math.round((pcStyle.gridRowEnd / pc_h) * numTabRows)
        : 1;
    return { new_row_start, new_col_start, new_col_end, new_row_end };
  }

  function handlePcClick() {
    setPreviousDeviceType(currentStyleName);
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

    setPreviousDeviceType(currentStyleName);
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
      setPreviousDeviceType(currentStyleName);
    setCurrentStyleName("mobile");

    setCon_w(mb_w);
    setCon_h(mb_h);
  }

  const gridCells = Array.from({ length: numCols * numRows }, (_, index) => ({
    row: Math.floor(index / numCols),
    col: index % numCols,
  }));

  

  // const { new_row_start: xJTabletRowStart, new_col_start: xJTabletColStart ,new_row_end:xJTabletRowEnd, new_col_end:xJTabletColEnd} = calculateNewPosition(
  //   numCols,
  //   numRows,
  //   pcStyle
  // );
  const {com_start_col,com_start_row,new_com_end_col,new_com_end_row} =  doingSomthing(
    xJYPtme.data.config.base.style.gridRowStart,
    xJYPtme.data.config.base.style.gridColumnStart,
    xJYPtme.data.config.base.style.gridRowEnd,
    xJYPtme.data.config.base.style.gridColumnEnd,
    con_h,
    con_w
  );
  // const { new_row_start: xJMobileRowStart, new_col_start: xJMobileColStart ,new_row_end:xJMobileRowEnd, new_col_end:xJMobileColEnd} = calculateNewPosition(
  //   numCols,
  //   numRows,
  //   pcStyle
  // );


  // const { new_row_start: xJMobileRowStart, new_col_start: xJMobileColStart ,new_row_end:xJMobileRowEnd, new_col_end:xJMobileColEnd} = calculateNewPosition(
  //   numCols,
  //   numRows,
  //   pcStyle
  // );



  // console.log("this is for tblte", xJTabletColStart, xJTabletRowStart,xJTabletRowEnd, xJTabletColEnd);
  // console.log("this is for mobile" , xJMobileRowStart,xJMobileColStart,xJMobileRowEnd, xJMobileColEnd);
  // console.log('this previous device type', previousDeviceType);
  // console.log('this is current device type', currentStyleName);
  const style =
    currentStyleName === "pc"
      ? {
        ...pcStyle,
        gridColumnEnd: Number(pcStyle.gridColumnEnd) >72?72:pcStyle.gridColumnEnd,
      }
      : currentStyleName === "tablet"
      ? {...tabletStyle,
        gridColumnStart: com_start_col,
        gridRowStart: com_start_row,
        gridColumnEnd: new_com_end_col,
        gridRowEnd: new_com_end_row,
      }
      : {...mobileStyle,
        gridColumnStart: com_start_col,
        gridRowStart: com_start_row,
        gridColumnEnd: new_com_end_col,
        gridRowEnd: new_com_end_row,
      };
      // com_start_col,com_start_row,new_com_end_col,new_com_end_row
      const qvStyle =
      currentStyleName === "pc"
        ? qVPcstyle
        : currentStyleName === "tablet"
        ? qVtabletStyle
        : qVmobileStyle;
    console.log('this is for qvstyle', qvStyle);

  const ujStyle =
    currentStyleName === "pc"
      ? uJPcstyle
      : currentStyleName === "tablet"
      ? uJtabletStyle
      : uJmobileStyle;

  return (
    <>
      Total number of rows and columns: {numRows}, {numCols}
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
            backgroundColor: "blue",
          }}
        >
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
              backgroundColor: "red",
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
              fontSize: "20px",
              fontWeight: "600",
              color: "#6730bc",
              backgroundColor: "green",
              position: "relative",
            }}
          >
            {ujContent}
          </div>

          {/* <p style={{color:"white"}}>The postion of the title is {style.gridColumnStart},{style.gridRowStart} , { style.gridColumnEnd}, {style.gridRowEnd}</p> */}
           
        </div>
      
      </div>
    </>
  );
}
