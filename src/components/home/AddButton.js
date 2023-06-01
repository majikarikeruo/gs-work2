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
        className="border-none p-4 px-4 w-16 bg-[#3ea8ff] text-white font-bold text-lg rounded-md"
        onClick={(e) => addScheduleCount()}
      >
        ＋
      </button>
    </div>
  );
};

export default AddButton;
