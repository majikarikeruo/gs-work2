/**
 * React
 */
import { useState, useEffect } from "react";

/**
 * Library
 */
import { supabase } from "@/lib/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/**
 * Components
 */
import Heading from "@/components/common/Heading";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import AddButton from "@/components/vote/AddButton";
import SubmitButton from "@/components/vote/SubmitButton";
import ScheduleItem from "@/components/vote/ScheduleItem";
import LimitAlertMsg from "@/components/vote/LimitAlertMsg";
import LinkButton from "@/components/common/LinkButton";
import LogoutBtn from "@/components/common/LogoutBtn";

export default function Vote(pageProps) {
  const [scheduleCount, setScheduleCount] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [schedules, setSchedules] = useState([]);

  //Library
  const supabaseClient = useSupabaseClient();

  /******************************
   * @function getSession
   * @description ログインユーザーセッション情報取得
   ******************************/
  const getSession = async () => {
    try {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      setUserInfo(session.user);
    } catch (error) {
      console.error("セッション情報の取得に失敗しました:", error.message);
      // エラーハンドリングの処理を追加することができます
    }
  };

  /***************************************************
   * @function upsertData
   * @description スケジュール送信ボタン押下時の処理
   ***************************************************/
  const upsertData = async (table, data, onConflict) => {
    const { data: result, error } = await supabase
      .from(table)
      .upsert(data, { onConflict })
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return result;
  };

  /***************************************************
   * @function submitSchedule
   * @description スケジュール送信ボタン押下時の処理
   ***************************************************/
  const submitSchedule = async (e) => {
    e.preventDefault();
    try {
      const userData = await upsertData(
        "profiles",
        { user_id: userInfo.id, user_name: username },
        "user_id"
      );

      const schedulesObj = schedules.map((item) => ({
        user_id: userData[0].id,
        ...item,
      }));

      await upsertData("schedules", schedulesObj);

      alert("入力したスケジュールを送信しました！");
      resetScheduleState();
    } catch (error) {
      alert(
        "スケジュールの登録に失敗しました。入力内容を再度ご確認いただくか、しばらく経ってから再度登録し直してください。"
      );
    }
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
      <LogoutBtn />

      <div className="box-border w-full max-w-xl p-4 md:p-10 bg-white shadow-xl rounded-2xl">
        <Heading text={"Mokumoku Matching"} />

        <form className="mt-8">
          <div className="mb-10">
            <Label text="LINE上でのお名前" />
            <Input data={username} handle={setUsername} />
          </div>
          <div className="mb-10">
            <Label text="もくもく会・希望曜日と日時の入力" />

            <table className="w-full mb-4 -mx-2">
              <thead>
                <tr>
                  <th className="p-2 text-left align-top font-medium">
                    曜日
                    <br className="lg:hidden" />
                    <span className="text-[10px] lg:text-base">
                      （週末・平日）
                    </span>
                  </th>
                  <th className="p-2 text-left align-top font-medium">
                    開始時間
                  </th>
                  <th className="p-2 text-left align-top font-medium">
                    終了時間
                  </th>
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
          <LimitAlertMsg />

          <div className="mt-10 text-center">
            <SubmitButton
              text="希望日程を登録する"
              handleSubmit={submitSchedule}
            />
            <LinkButton url="/result" text="マッチングの結果を見る" />
          </div>
        </form>
      </div>
    </main>
  );
}
