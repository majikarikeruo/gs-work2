import useAuth from "@/hooks/useAuth";

const LogoutBtn = ({}) => {
  /** Custom Hooks */
  const { doLogout, error } = useAuth();

  return (
    <div className="fixed right-4 top-4">
      <button
        onClick={doLogout}
        className="text-lg  text-white font-bold py-2 px-4 rounded border-0 shadow-xl bg-[#BC8F03] cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
