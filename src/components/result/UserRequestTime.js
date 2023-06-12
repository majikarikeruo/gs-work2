import { dayofWeek } from "@/constant/dayOfWeek";

const mySchedule = ({ mySchedules, handleChange }) => {
  return (
    <div className="mb-10">
      <p className="text-md mb-2 font-bold">
        <span className="block mb-1">
          {mySchedules.length && mySchedules[0].profiles.user_name}
          さんの希望日時
        </span>
        <select
          className="w-50 text-lg  p-3 border-gray-200 border-solid border rounded"
          onChange={(e) => handleChange(e)}
        >
          <option value="">選択してください</option>
          {mySchedules.map((mySchedule, index) => (
            <option
              value={`${mySchedule.dayofWeek} ${mySchedule.startTime} ${mySchedule.endTime} ${mySchedule.profiles.id}`}
              key={index}
            >
              {dayofWeek[mySchedule.dayofWeek]}{" "}
              {mySchedule.startTime.slice(0, -3)}-
              {mySchedule.endTime.slice(0, -3)}
            </option>
          ))}
        </select>
        <span className="block mt-1">と一致する参加者を表示する</span>
      </p>
    </div>
  );
};

export default mySchedule;
