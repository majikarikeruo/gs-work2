const UserRequestTime = ({ userRequestTimes, handleScheduleChange }) => {
  console.log(userRequestTimes, "userRequestTimes");
  return (
    <div className="mb-10">
      <h2 className="text-md mb-2">あなたの希望した時間</h2>
      <div className="flex">
        <select
          className="text-lg p-3 border-gray-200 border-solid border rounded"
          onChange={(e) => handleScheduleChange(e)}
        >
          {userRequestTimes.map((userRequestTime, index) => (
            <option
              value={`${userRequestTime.dayofWeek} ${userRequestTime.startTime} 
            ${userRequestTime.endTime}`}
              key={index}
            >
              {userRequestTime.dayofWeek} {userRequestTime.startTime}-
              {userRequestTime.endTime}
            </option>
          ))}
        </select>
        <p className="ml-3">と一致する参加者を表示する</p>
      </div>
    </div>
  );
};

export default UserRequestTime;
