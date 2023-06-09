const Button = ({ text }) => {
  return (
    <button className="shadow-md h-[38px] lg:h-[46px] border-none px-6 bg-[#008DDE] text-white  font-medium text-lg rounded-md">
      {text}
    </button>
  );
};

export default Button;
