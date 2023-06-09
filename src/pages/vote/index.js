/**
 * React
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Library
 */
import { supabase } from "@/lib/supabase";

/**
 * Components
 */
import Heading from "@/components/common/Heading";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import Text from "@/components/common/Text";
import AddButton from "@/components/home/AddButton";
import SubmitButton from "@/components/home/SubmitButton";
import ScheduleItem from "@/components/home/ScheduleItem";
import LinkButton from "@/components/common/LinkButton";

export default function vote() {
  const [scheduleCount, setScheduleCount] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [schedules, setSchedules] = useState([]);
  const router = useRouter();

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session);
    if (!session) {
      alert("ログインしてください");
      router.replace("/login");
      return;
    }

    setUserInfo(session.user);
  };

  /***************************************************
   * @function submitSchedule
   * @description スケジュール送信ボタン押下時の処理
   ***************************************************/
  const submitSchedule = async (e) => {
    e.preventDefault();
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .upsert(
        { user_id: userInfo.id, user_name: username },
        { onConflict: "user_id" }
      )
      .select();
    console.log(userData);

    const schedulesObj = schedules.map((item, index) => {
      const obj = {
        user_id: userData[0].id,
        ...item,
      };
      return obj;
    });

    const { data: scheduleData, error: scheduleError } = await supabase
      .from("schedules")
      .upsert(schedulesObj)
      .select();

    /** validate */
    if (userError || scheduleError) {
      alert(
        "スケジュールの登録に失敗しました。入力内容を再度ご確認いただくか、しばらく経ってから再度登録し直してください。"
      );
      return;
    }

    alert("入力したスケジュールを送信しました！");
    resetScheduleState();
  };

  /****************************************************
   * @function resetScheduleState
   * @description 初期化
   *****************************************************/
  const resetScheduleState = () => {
    setUsername("");
    setSchedules([]);
    setScheduleCount(1);
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center py-16 px-3 bg-[#f1c232]`}
    >
      {userInfo && (
        <div className="w-full max-w-xl p-10 bg-white shadow-xl  rounded-2xl">
          <Heading text={"Mokumoku Matching"} />

          <form className="mt-8">
            <div className="mb-10">
              <Label text="LINE上でのお名前" />
              <Input data={username} handle={setUsername} />
            </div>
            <div className="mb-10">
              <Label text="もくもく会希望曜日・日時の入力" />
              <span className="text-red-500 text-sm">※上限20個まで</span>
              <Text text="もくもく会を希望する曜日・日時を以下から入力ください。" />

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
              <Text text="あくまで、基本的に何曜日何時くらいがいいかという希望を入れていただければ大丈夫です！" />
              <SubmitButton text="日程登録" handleSubmit={submitSchedule} />
              <LinkButton url="/result" text="結果を見る" />
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
