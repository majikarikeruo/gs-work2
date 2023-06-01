import { useState } from "react";

const AddButton = () => {
  return (
    <div className="text-center">
      <button
        type="button"
        className="border-none p-4 px-4 w-16 bg-[#3ea8ff] text-white font-bold text-lg rounded-md"
        onClick={(e) => setSchedules([...schedules, ""])}
      >
        ＋
      </button>
    </div>
  );
};

export default AddButton;
