import { useState } from "react";

const ScheduleItem = ({ scheduleCount, setScheduleCount, enableDeleteBtn }) => {
  /**
   * @function removeScheduleCount
   * @description スケジュールの削除
   */
  const removeScheduleCount = () => {
    if (scheduleCount === 1) return;

    setScheduleCount(scheduleCount - 1);
  };

  return (
    <tr>
      <td className="p-2">
        <select
          name="dayofweek"
          className="w-full box-border leading-loose border-gray-200 border-solid border-2 px-3 h-[60px] text-base"
          onChange={(e) => setDayofWeek(e.target.value)}
        >
          <option value="weekday">平日</option>
          <option value="weekend">週末</option>
          <option value="mon">月曜</option>
          <option value="tue">火曜</option>
          <option value="wed">水曜</option>
          <option value="thu">木曜</option>
          <option value="fri">金曜</option>
          <option value="sat">土曜</option>
          <option value="sun">日曜</option>
        </select>
      </td>
      <td className="p-2">
        <input className="box-border border-gray-200 border-solid border-2 p-4 text-base" />
      </td>
      <td className="p-2">
        <input className="box-border border-gray-200 border-solid border-2 p-4 text-base" />
      </td>
      <td className="p-2">
        {enableDeleteBtn && (
          <button
            type="button"
            onClick={(e) => removeScheduleCount()}
            className="box-border bg-white border-red-500 border-solid border-2 text-red-500  p-6 py-3 text-2xl"
          >
            -
          </button>
        )}
      </td>
    </tr>
  );
};

export default ScheduleItem;
