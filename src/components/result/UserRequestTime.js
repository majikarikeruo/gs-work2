const mySchedule = ({ mySchedules, handleChange }) => {
  return (
    <div className="mb-10">
      <h2 className="text-md mb-2">あなたの希望した時間</h2>
      <div className="flex">
        <select
          className="text-lg p-3 border-gray-200 border-solid border rounded"
          onChange={(e) => handleChange(e)}
        >
          <option value="">選択してください</option>
          {mySchedules.map((mySchedule, index) => (
            <option
              value={`${mySchedule.dayofWeek} ${mySchedule.startTime} ${mySchedule.endTime} ${mySchedule.profiles.id}`}
              key={index}
            >
              {mySchedule.dayofWeek} {mySchedule.startTime}-{mySchedule.endTime}
            </option>
          ))}
        </select>
        <p className="ml-3">と一致する参加者を表示する</p>
      </div>
    </div>
  );
};

export default mySchedule;
