const SubmitButton = ({ handleSubmit }) => {
  return (
    <button
      onClick={handleSubmit}
      className="cursor-pointer border-none p-4 px-4 w-80 bg-[#3ea8ff] text-white font-bold text-lg rounded-md"
    >
      入力した日程で送信する
    </button>
  );
};

export default SubmitButton;
