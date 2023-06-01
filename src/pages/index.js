import { useState, useEffect } from "react";

import Heading from "@/components/home/heading";
import Input from "@/components/home/Input";
import AddButton from "@/components/home/AddButton";
import ScheduleItem from "@/components/home/ScheduleItem";

export default function Home() {
  const [schedules, setSchedules] = useState([1]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div>
        <Heading />
        <form className={`mt-8`}>
          <Input />
          <div>
            <h2 htmlFor="username" className="text-lg font-bold">
              もくもく会希望曜日・日時の入力
            </h2>
            <p>もくもく会を希望する曜日・日時を以下から入力ください。</p>
            <p>※上限20個まで</p>

            <table className="mb-4">
              <thead>
                <tr>
                  <th className="p-2 text-left">曜日（週末・平日）</th>
                  <th className="p-2 text-left">開始時間</th>
                  <th className="p-2 text-left">終了時間</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule, index) => (
                  <ScheduleItem />
                ))}
              </tbody>
            </table>

            <AddButton />
          </div>
        </form>
      </div>
    </main>
  );
}
