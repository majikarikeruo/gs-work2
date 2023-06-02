const LinkButton = ({ url, text }) => {
  return (
    <div className="mt-8">
      <a href={url} className="no-underline text-[#0468bb]">
        {text}
      </a>
    </div>
  );
};

export default LinkButton;
