import Link from "next/link";

const LinkButton = ({ url, text }) => {
  return (
    <div className="mt-8">
      <Link href={url} className="no-underline text-[#0468bb]">
        {" "}
        {text}
      </Link>
    </div>
  );
};

export default LinkButton;
