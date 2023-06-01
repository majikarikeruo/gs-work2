import { useState } from "react";

const Input = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="mb-10">
      <label htmlFor="username" className="block mb-2 font-bold text-lg">
        LINE上でのお名前
      </label>
      <div>
        <input
          className="box-border border-gray-200 border-solid border-2 p-4 text-base w-full"
          type="text"
          placeholder="LINE上でのお名前を入力してください"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
