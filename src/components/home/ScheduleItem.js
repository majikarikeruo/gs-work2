import { useState, useEffect } from "react";

/**
 *
 * Todo
 * 
 * - 同じ名前でかぶった場合はlocalStorage上で上書き
 * - 曜日もリセットできるように
 * - スマホ対応
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
  enableDeleteBtn,
}) => {
  const [dayofWeek, setDayofWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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

  useEffect(() => {
    if (!schedules.length) {
      setDayofWeek("");
      setStartTime("");
      setEndTime("");
    }
  }, [schedules]);

  return (
    <tr>
      <td className="p-2">
        <select
          name="dayofweek"
          className="w-full box-border leading-loose border-gray-200 border-solid border-2 px-3 h-[60px] text-base"
          onChange={(e) => changeScheduleProps("dayofweek", e.target.value)}
          defaultValue=""
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
      <td className="p-2">
        <input
          type="time"
          name="startTime"
          value={startTime}
          onChange={(e) => changeScheduleProps("startTime", e.target.value)}
          className="w-full box-border border-gray-200 border-solid border-2 p-4 text-base"
        />
      </td>
      <td className="p-2">
        <input
          type="time"
          name="endTime"
          value={endTime}
          onChange={(e) => changeScheduleProps("endTime", e.target.value)}
          className="w-full box-border border-gray-200 border-solid border-2 p-4 text-base"
        />
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
