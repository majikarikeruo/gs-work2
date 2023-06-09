/**
 * React
 */
import { useEffect, useState } from "react";

/**
 * Library
 */
import { supabase } from "@/lib/supabase";

/**
 * Components
 */
import Heading from "@/components/common/Heading";
import Button from "@/components/common/Button";
import MessageBox from "@/components/message/MessageBox";

const Message = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center py-16 px-3 bg-[#f1c232]`}
    >
      <div className="w-full max-w-2xl p-10 bg-white shadow-xl rounded-2xl">
        <Heading text={"Message"} />

        <div className="mb-10">こすげさん・たつやさん・こすげさん</div>
        <div className="p-0 border-t-2 ">
          {[...Array(5)].map((index) => (
            <MessageBox />
          ))}
        </div>
        <div className="mt-10 text-center">
          <div className="mb-2">
            <textarea
              className="w-full bg-gray-100 border-none p-4 box-border"
              rows="10"
            ></textarea>
          </div>
          <Button text={"送信"} />
        </div>
      </div>
    </main>
  );
};

export default Message;
