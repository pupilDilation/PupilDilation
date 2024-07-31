import React from "react";
import SeatTypeStyle from "./SeatTypeInfo.module.css";
import useClassNameJoin from "../../hooks/useClassNameJoin";

function SeatTypeInfo() {
  return (
    <div className={SeatTypeStyle.seatTypeWrapper}>
      <div className={SeatTypeStyle.seatTypeContent}>
        <div
          className={useClassNameJoin(
            SeatTypeStyle.selectedBox,
            SeatTypeStyle.boxCommon
          )}
        ></div>
        <div>선택한 좌석이오</div>
      </div>
      <div className={SeatTypeStyle.seatTypeContent}>
        <div
          className={useClassNameJoin(
            SeatTypeStyle.availableBox,
            SeatTypeStyle.boxCommon
          )}
        ></div>
        <div>선택가능</div>
      </div>
      <div className={SeatTypeStyle.seatTypeContent}>
        <div
          className={useClassNameJoin(
            SeatTypeStyle.completeBox,
            SeatTypeStyle.boxCommon
          )}
        ></div>
        <div>예매 완료</div>
      </div>
      {/* <div className={SeatTypeStyle.seatTypeContent}>
        <div
          useClassNameJoin={(SeatTypeStyle.unavailBox, SeatTypeStyle.boxCommon)}
        ></div>
        <div>선택불가</div>
      </div>
      <div className={SeatTypeStyle.seatTypeContent}>
        <div
          useClassNameJoin={
            (SeatTypeStyle.selectingBox, SeatTypeStyle.boxCommon)
          }
        ></div>
        <div>예매중</div>
      </div> */}
    </div>
  );
}

export default SeatTypeInfo;
