const AddButton = ({ scheduleCount, setScheduleCount }) => {
  const maximumScheduleCount = 5;

  /**
   * @function addScheduleCount
   * @description スケジュールの追加
   */
  const addScheduleCount = () => {
    if (scheduleCount < maximumScheduleCount) {
      setScheduleCount(scheduleCount + 1);
    }
  };

  return (
    <>
      {scheduleCount < maximumScheduleCount && (
        <div className="text-center">
          <button
            type="button"
            className="h-[38px] lg:h-[46px] border-none px-4 shadow-md bg-[#f1c232] text-white font-bold text-lg rounded-md cursor-pointer"
            onClick={(e) => addScheduleCount()}
          >
            <span className="mr-2">＋</span>希望日程入力を追加
          </button>
        </div>
      )}
    </>
  );
};

export default AddButton;
