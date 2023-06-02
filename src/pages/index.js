import { useState, useEffect } from "react";

/**
 * Components
 */
import Heading from "@/components/common/Heading";
import Input from "@/components/home/Input";
import AddButton from "@/components/home/AddButton";
import SubmitButton from "@/components/home/SubmitButton";
import ScheduleItem from "@/components/home/ScheduleItem";
import LinkButton from "@/components/common/LinkButton";

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
      <Heading text={"もくもく会・マッチングアプリ"} />

      <form className={`mt-8`}>
        <Input username={username} setUsername={setUsername} />

        <div className="mb-10">
          <h2 htmlFor="username" className="text-lg font-bold">
            もくもく会希望曜日・日時の入力
          </h2>
          <p>
            もくもく会を希望する曜日・日時を以下から入力ください。
            <span className="text-red-500 text-sm">※上限20個まで</span>
          </p>

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
        </div>

        <div className="mt-20 text-center">
          <p>
            あくまで、基本的に何曜日何時くらいがいいかという希望を入れていただければ大丈夫です！
          </p>
          <SubmitButton handleSubmit={submitSchedule} />
          <LinkButton url="/result" text="結果を見る" />
        </div>
      </form>
    </main>
  );
}
