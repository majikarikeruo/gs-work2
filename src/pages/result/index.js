import { useEffect, useState } from "react";

import Image from "next/image";

import Heading from "@/components/home/heading";

const Result = () => {
  const [allSchedules, setAllSchedules] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage);

    const allSchedules = keys.map((key, index) => localStorage.getItem(key));
    setAllSchedules([...allSchedules]);
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between py-16 px-3`}
    >
      <div>
        <Heading text={"マッチング結果"} />
        <div className="mt-8">
          <ul className="p-0 border-t-2 border-gray-200 border-solid border-b-0 border-l-0 border-r-0">
            <li className="py-4 list-none border-b-2 border-gray-200 border-solid border-t-0 border-l-0 border-r-0">
              <div className="flex items-center">
                <div className="h-[74px] relative mr-2 border-gray-100 border-solid border-2 rounded-full inline-flex align-middle">
                  <Image src="/images/stamp18.png" width={74} height={64} />
                </div>

                <p className="m-0 text-sm">
                  ケインコスゲさん・みねさん・なおさんTKさん・さっこさん・むねまつさん
                </p>
              </div>
              <div className="flex text-2xl justify-end">
                <span className="inline-block mr-8">平日</span>
                <div>
                  <span>9:00</span>
                  <span className="inline-block mx-4">-</span>
                  <span>17:00</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Result;
