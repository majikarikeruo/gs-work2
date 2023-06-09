import { useState } from "react";

const AddButton = ({ scheduleCount, setScheduleCount }) => {
  const maximumScheduleCount = 20;

  /**
   * @function addScheduleCount
   * @description スケジュールの追加
   */
  const addScheduleCount = () => {
    if (maximumScheduleCount) {
      setScheduleCount(scheduleCount + 1);
    }
  };

  return (
    <div className="text-center">
      <button
        type="button"
        className="w-[38px] lg:w-[46px] h-[38px] lg:h-[46px] border-none   bg-[#f1c232] text-white font-bold text-lg rounded-md"
        onClick={(e) => addScheduleCount()}
      >
        ＋
      </button>
    </div>
  );
};

export default AddButton;
