import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Heading = ({ text }) => {
  return (
    <div className="mb-20">
      <h1 className={`text-4xl font-bold text-center ${montserrat.className}`}>
        {text}
      </h1>
    </div>
  );
};

export default Heading;
