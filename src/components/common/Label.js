import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Label = ({ text }) => {
  return (
    <h2
      htmlFor="username"
      className={`text-lg font-bold mt-0 ${montserrat.className}`}
    >
      {text}
    </h2>
  );
};

export default Label;
