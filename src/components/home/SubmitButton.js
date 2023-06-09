const SubmitButton = ({ handleSubmit, text }) => {
  return (
    <button
      onClick={handleSubmit}
      className="cursor-pointer border-none p-4 px-4 w-full bg-[#f1c232] text-white font-bold text-lg rounded-md"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
