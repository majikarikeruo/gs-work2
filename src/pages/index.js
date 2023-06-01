import { useState, useEffect } from "react";

import Heading from "@/components/home/heading";
import Input from "@/components/home/Input";
import ScheduleHeading from "@/components/home/ScheduleHeading";
import AddButton from "@/components/home/AddButton";
import ScheduleItem from "@/components/home/ScheduleItem";

export default function Home() {
  const [scheduleCount, setScheduleCount] = useState(1);
  const [username, setUsername] = useState("");
  const [schedules, setSchedules] = useState([]);

  /**
   * @function submitSchedule
   * @description スケジュール送信ボタン押下時の処理
   */
  const submitSchedule = (e) => {
    e.preventDefault();
    const json = { username, schedules };

    localStorage.setItem(username, JSON.stringify(json));

    alert("入力したスケジュールを送信しました！");
    resetScheduleState();
  };

  /**
   * @function resetScheduleState
   * @description 初期化
   */
  const resetScheduleState = () => {
    setUsername("");
    setSchedules([]);
    setScheduleCount(1);
  };

  useEffect(() => {}, [schedules]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between py-16 px-3`}
    >
      <div>
        <Heading />
        <form className={`mt-8`}>
          <Input username={username} setUsername={setUsername} />
          <div>
            <ScheduleHeading />

            <table className="w-full mb-4 -mx-2">
              <thead>
                <tr>
                  <th className="p-2 text-left align-top">
                    曜日
                    <br className="lg:hidden" />
                    <span className="text-[10px] lg:text-base">
                      （週末・平日）
                    </span>
                  </th>
                  <th className="p-2 text-left align-top">開始時間</th>
                  <th className="p-2 text-left align-top">終了時間</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(scheduleCount)].map((schedule, index) => (
                  <ScheduleItem
                    key={index}
                    index={index}
                    scheduleCount={scheduleCount}
                    setScheduleCount={setScheduleCount}
                    schedules={schedules}
                    setSchedules={setSchedules}
                  />
                ))}
              </tbody>
            </table>

            <AddButton
              scheduleCount={scheduleCount}
              setScheduleCount={setScheduleCount}
            />
            <div className="mt-20">
              <p>
                あくまで、基本的に何曜日何時くらいがいいかという希望を入れていただければ大丈夫です！
              </p>
              <div className="text-center">
                <button
                  onClick={submitSchedule}
                  className="cursor-pointer border-none p-4 px-4 w-80 bg-[#3ea8ff] text-white font-bold text-lg rounded-md"
                >
                  入力した日程で送信する
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
