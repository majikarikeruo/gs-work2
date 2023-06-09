import { useState } from "react";

const PasswordInput = ({ data, handle }) => {
  return (
    <div>
      <input
        className="box-border border-gray-200 border-solid border-2 p-4 text-base w-full"
        type="password"
        placeholder=""
        id="username"
        name="username"
        value={data}
        onChange={(e) => handle(e.target.value)}
      />
    </div>
  );
};

export default PasswordInput;
