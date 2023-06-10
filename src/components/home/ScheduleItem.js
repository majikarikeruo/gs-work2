/**
 * React
 */
import { useState, useEffect } from "react";

/**
 * Library
 */
import { supabase } from "@/lib/supabase";

/**
 *
 * Todo
 *
 * -  集計ページの作成
 * - デザイン演出リッチに
 *
 *
 *
 *
 */

const ScheduleItem = ({
  index,
  scheduleCount,
  setScheduleCount,
  schedules,
  setSchedules,
}) => {
  /** useState */
  const [dayofWeek, setDayofWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const enableDeleteBtn = index > 0 && index === scheduleCount - 1;

  /**
   * @function removeScheduleCount
   * @description スケジュールの削除
   */
  const removeScheduleCount = () => {
    if (scheduleCount !== 1) {
      setScheduleCount(scheduleCount - 1);
    }
  };

  /**
   * @function changeScheduleProps
   * @description スケジュールの変更
   */
  const changeScheduleProps = (key, value) => {
    switch (key) {
      case "dayofWeek":
        setDayofWeek(value);
        break;
      case "startTime":
        setStartTime(value);
        break;
      case "endTime":
        setEndTime(value);
        break;
      default:
        break;
    }

    const updatedSchedules = [...schedules];
    updatedSchedules[index] = {
      ...updatedSchedules[index],
      [key]: value,
    };
    setSchedules(updatedSchedules);
  };

  /**
   * @function resetStates
   * @description ステートを全てリセットする
   */
  const resetStates = () => {
    setDayofWeek("");
    setStartTime("");
    setEndTime("");
  };

  useEffect(() => {
    if (!schedules.length) {
      resetStates();
    }
  }, [schedules]);

  return (
    <tr>
      <td className="p-1 lg:p-2">
        <select
          name="dayofWeek"
          className="w-full box-border leading-loose border-gray-200 border-solid border-2 p-1 lg:p-2 px-3 h-[38px] lg:h-[46px] text-base"
          onChange={(e) => changeScheduleProps("dayofWeek", e.target.value)}
          value={dayofWeek}
        >
          <option value="" disabled>
            選択してください
          </option>
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
      <td className="p-1 lg:p-2">
        <input
          type="time"
          step={1800}
          name="startTime"
          value={startTime}
          onChange={(e) => changeScheduleProps("startTime", e.target.value)}
          className="w-full box-border border-gray-200 border-solid border-2 p-1 lg:p-2  text-base"
        />
      </td>
      <td className="p-1 lg:p-2">
        <input
          type="time"
          step={1800}
          name="endTime"
          value={endTime}
          onChange={(e) => changeScheduleProps("endTime", e.target.value)}
          className="w-full box-border border-gray-200 border-solid border-2 p-1 lg:p-2  text-base"
        />
      </td>
      <td className="p-1 lg:p-2">
        {enableDeleteBtn && (
          <button
            type="button"
            onClick={(e) => removeScheduleCount()}
            className="box-border bg-white border-red-500 border-solid border-2 text-red-500 w-[38px] lg:w-[46px]  h-[38px] lg:h-[46px] text-2xl"
          >
            -
          </button>
        )}
      </td>
    </tr>
  );
};

export default ScheduleItem;
