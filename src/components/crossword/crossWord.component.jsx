import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useLoadingContext } from "../../core/contexts/loading/loading";
import { useCalculateCrossWordTableCellSize } from "../../core/custom-hooks/useCalculateCrossWordTableCellSize";
import { createArrayByLength } from "../../core/utils/utils";
import colors from "../../assets/styles/variables/_colors.module.scss";

import verticalQuestionIcon from "../../assets/img/icons/vertical-question.png";
import horizontalQuestionIcon from "../../assets/img/icons/horizontal-question.png";

// TestData
import { testData } from "./sampleData";
import { parse } from "query-string";
// Api
import { extra_apiCalls } from "../../core/services/agent";
import { apiCaller, useApi } from "../../core/custom-hooks/useApi";
import { Button } from "@mui/material";

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Dialog } from "@mui/material";
import ReactPlayer from "react-player";
import useToolbarPosition from "../toolbar/useToolbarPosition.hook";
import AppTour from "../appTour/appTours.component";
import { fileBaseUrl } from "../../core/services/baseUrl";

const CrossWordTable = (props) => {
  //// Video Play Icon
  const { right, top } = useToolbarPosition();
  ///////
  const navigate = useNavigate();
  const location = useLocation();

  const [table, set_table] = useState([]);
  const [tableDimension, set_tableDimension] = useState(0);

  const [firstSelectedInput, set_firstSelectedInput] = useState(null);
  const [secondSelectedInput, set_secondSelectedInput] = useState(null);

  const [verticalQuestion, set_verticalQuestion] = useState(null);
  const [horizontalQuestion, set_horizontalQuestion] = useState(null);

  const [compeletlyWrongMoves, set_compeletlyWrongMoves] = useState(0);

  const { size } = useCalculateCrossWordTableCellSize(tableDimension);

  const [bgBlueCellsCount, set_bgBlueCellsCount] = useState();

  const { responseData: crosswordData } = useApi({
    api: extra_apiCalls.apiCall_getcrossWord,
    apiArguments: parse(window.location.search)?.id,
    waitForArguments: true,
  });

  const { handleOpen, handleClose } = useLoadingContext();

  const handleClick = (e) => {
    const { id } = e.target;

    const coordinate = id.split("_");

    const rowIndex = coordinate[0].toString();
    const colIndex = coordinate[1].toString();

    const foundedCell = table.find(
      (cell) =>
        cell.rowIndex.toString() === rowIndex &&
        cell.colIndex.toString() === colIndex
    );

    if (foundedCell.isLocked) return;
    if (foundedCell.cellData === foundedCell.currectCellData) {
      return;
    }

    if (!firstSelectedInput) {
      set_firstSelectedInput(foundedCell);
    } else {
      set_secondSelectedInput(foundedCell);
    }
  };

  useEffect(() => {
    if (firstSelectedInput && secondSelectedInput) {
      move();
    }
  }, [firstSelectedInput, secondSelectedInput]);

  useEffect(() => {
    const crossWordEnded = async () => {
      handleOpen();
      await apiCaller({
        api: extra_apiCalls.apiCall_completeExtra,
        apiArguments: {
          id: crosswordData.data.crossWordId,
          extraType: 0,
          percent: 100,
        },
      });
      handleClose();
    };

    if (bgBlueCellsCount === 0) {
      crossWordEnded();
    }
  }, [bgBlueCellsCount]);

  const move = () => {
    const clonedTable = [...table];
    const firstCellIndex = table.indexOf(firstSelectedInput);
    const secondCellIndex = table.indexOf(secondSelectedInput);

    if (
      firstSelectedInput?.cellData !== secondSelectedInput?.currectCellData &&
      secondSelectedInput?.cellData !== firstSelectedInput?.currectCellData
    ) {
      set_compeletlyWrongMoves(compeletlyWrongMoves + 1);
    }

    ////////////
    let blueHouses = 0;

    if (firstSelectedInput?.cellData === secondSelectedInput?.currectCellData) {
      blueHouses++;
    }
    if (secondSelectedInput?.cellData === firstSelectedInput?.currectCellData) {
      blueHouses++;
    }
    set_bgBlueCellsCount(bgBlueCellsCount - blueHouses);
    ////////////

    const temp = clonedTable[firstCellIndex]?.cellData;
    clonedTable[firstCellIndex].cellData =
      clonedTable[secondCellIndex]?.cellData;
    clonedTable[secondCellIndex].cellData = temp;

    set_firstSelectedInput(null);
    set_secondSelectedInput(null);
  };

  useEffect(() => {
    if (crosswordData?.data?.crossWordContentToAnswers) {
      // setCount
      set_tableDimension(crosswordData?.data?.cross);
      // generateTable
      let bgBlueCells = 0;
      const tbl = crosswordData?.data?.crossWordContentToAnswers?.map(
        (item) => {
          if (!item.isLocked && item.cellData !== item.currectCellData) {
            bgBlueCells++;
          }
          return { ...item, status: item.currectCellData === item.cellData };
        }
      );
      set_table(tbl);
      set_bgBlueCellsCount(bgBlueCells);
    }
  }, [crosswordData]);

  const getCellBg = (cell) => {
    if (cell.isLocked) return "#333";
    else if (cell.cellData === cell.currectCellData) {
      return "#fff";
    } else if (
      cell.rowIndex.toString() === firstSelectedInput?.rowIndex?.toString() &&
      cell.colIndex.toString() === firstSelectedInput?.colIndex?.toString()
    )
      return colors["main-color-1-dark"];
    else return colors["main-color-1"];
  };

  const getColor = (cell) => {
    if (cell.isLocked) return "#333";
    if (cell.cellData === cell.currectCellData) return "#000";
    else return colors["main-color-1-contrast"];
  };

  const getBorder = (cell) => {
    if (cell.isLocked) return "2px solid #333";
    else return "2px solid " + colors["main-color-1"];
  };

  //////
  const handleGoBack = () => {
    navigate("/extra");
  };

  const handleGotoNextTable = () => {
    const { allTabelsIds } = location.state;

    const currentTableIndex = allTabelsIds.indexOf(
      parseInt(parse(window.location.search)?.id)
    );

    const nextTableId =
      currentTableIndex + 1 < allTabelsIds?.length - 1
        ? currentTableIndex + 1
        : undefined;

    if (nextTableId !== undefined) {
      set_compeletlyWrongMoves(0);
      navigate("/extra/crossword?id=" + allTabelsIds[nextTableId], {
        state: { allTabelsIds: allTabelsIds },
      });
    }
  };

  /// handle how to use video

  const [openHowToUseCrossword, set_openHowToUseCrossword] = useState(false);
  const handle_openHowToUseCrossword = () => {
    set_openHowToUseCrossword(!openHowToUseCrossword);
  };

  return (
    <div className="m-0 p-0 p-3 mb-6 d-flex flex-column justify-content-start align-items-center">
      <AppTour page="crosswordPage" />
      <div className="align-self-stretch m-0 my-3 p-0 d-flex flex-row justify-content-start align-items-center">
        {/* //////////////////  */}
        <span
          style={{
            position: "absolute",
            right,
            top,
            zIndex: "10",
          }}
          className="m-0 p-0 d-flex flex-column justify-content-start align-items-center"
        >
          <PlayCircleFilledIcon
            id="openHowToUseCrossword"
            onClick={handle_openHowToUseCrossword}
            color="primary"
            fontSize="large"
            className="cursor-pointer"
          />
          <span className="m-0 p-0 text-muted" style={{ fontSize: "0.5rem" }}>
            آموزش حل جدول
          </span>
        </span>
        {/* //////////////////  */}
        <Dialog
          open={openHowToUseCrossword}
          onClose={handle_openHowToUseCrossword}
        >
          <div
            className="m-0 p-3 d-flex flex-row justify-content-center align-items-center"
            style={{ minWidth: "calc(370px - 2rem)" }}
          >
            <ReactPlayer
              url={fileBaseUrl + "/tutorial/crossword.mp4"}
              controls
            />
          </div>
        </Dialog>
      </div>

      {/* {bgBlueCellsCount !== 0 && ( */}
      <div
        dir="ltr"
        className="m-0 p-0 d-flex flex-column justify-content-start align-items-stretch"
      >
        {tableDimension > 0 &&
          table?.length > 0 &&
          createArrayByLength(tableDimension).map((item, indx) => (
            <div
              key={item + indx}
              className="m-0 p-0 d-flex flex-row justify-content-start align-items-stretch"
            >
              {table
                .slice(indx * tableDimension, (indx + 1) * tableDimension)
                .map((cell) => (
                  <div
                    onClick={handleClick}
                    className=" noselect p-0 text-center rounded rounded-3 fs-6 fw-bold d-flex flex-column justify-content-center align-items-center "
                    key={cell.rowIndex + cell.colIndex}
                    id={cell.rowIndex + "_" + cell.colIndex}
                    style={{
                      margin: ".1rem",
                      backgroundColor: getCellBg(cell),
                      color: getColor(cell),
                      height: size + "px",
                      width: size + "px",
                      maxWidth: "120px",
                      maxHeight: "120px",
                      cursor: "pointer",
                      border: getBorder(cell),
                      transition: ".2s",
                    }}
                  >
                    {cell.cellData}
                  </div>
                ))}
            </div>
          ))}
      </div>
      {/* )} */}

      {bgBlueCellsCount === 0 && (
        <>
          <div className="m-0 p-3 text-success fs-5 fw-bold d-flex flex-column justify-content-center align-items-center">
            جدول به اتمام رسید .
          </div>
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            بازگشت
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGotoNextTable}
            className="mt-3"
          >
            جدول بعدی
          </Button>
        </>
      )}
      {bgBlueCellsCount !== 0 && (
        <div
          style={{ textAlign: "left" }}
          className="game-info align-self-end mt-3 text-left"
        >
          <div className="">{`wrong moves : ${compeletlyWrongMoves}`}</div>
          {firstSelectedInput?.horizontalQuestion && (
            <div
              dir="ltr"
              style={{ textAlign: "left" }}
              className="my-2 d-flex flex-row justify-content-start align-items-center"
            >
              <div
                style={{
                  transition: ".2s",
                  backgroundColor: colors["main-color-1"],
                  height: size + "px",
                  width: size + "px",
                  maxWidth: "70px",
                  maxHeight: "70px",
                }}
                className="rounded rounded-3 p-2 ms-2 d-flex flex-column justify-content-center align-items-center"
              >
                <img src={horizontalQuestionIcon} alt="..." />
              </div>
              {firstSelectedInput?.horizontalQuestion}
            </div>
          )}
          {firstSelectedInput?.verticalQuestion && (
            <div
              dir="ltr"
              style={{ textAlign: "left" }}
              className="my-2 d-flex flex-row justify-content-start align-items-center"
            >
              <div
                style={{
                  transition: ".2s",
                  backgroundColor: colors["main-color-1"],
                  height: size + "px",
                  width: size + "px",
                  maxWidth: "70px",
                  maxHeight: "70px",
                }}
                className="rounded rounded-3 p-2 ms-2 d-flex flex-column justify-content-center align-items-center"
              >
                <img src={verticalQuestionIcon} alt="..." />
              </div>
              {firstSelectedInput?.verticalQuestion}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CrossWordTable;
