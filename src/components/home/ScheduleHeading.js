const ScheduleHeading = () => {
  return (
    <>
      <h2 htmlFor="username" className="text-lg font-bold">
        もくもく会希望曜日・日時の入力
      </h2>
      <p>
        もくもく会を希望する曜日・日時を以下から入力ください。
        <span className="text-red-500 text-sm">※上限20個まで</span>
      </p>
    </>
  );
};

export default ScheduleHeading;
