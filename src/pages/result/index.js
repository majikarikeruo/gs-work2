/**
 * React
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * Library
 */
import { supabase } from "@/lib/supabase";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

/**
 * Components
 */
import Heading from "@/components/common/Heading";
import LinkButton from "@/components/common/LinkButton";
import ResultsInfo from "@/components/result/ResultsInfo";
import UserRequestTime from "@/components/result/UserRequestTime";
import ResultItem from "@/components/result/ResultItem";
import LogoutBtn from "@/components/common/LogoutBtn";

const Result = () => {
  /** useState */
  const [mySchedules, setMySchedules] = useState([]);
  const [otherSchedules, setOtherSchedules] = useState([]);

  /** library */
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  /******************************
   * @function handleScheduleChange
   * @description スケジュール変更時の処理
   ******************************/

  const handleScheduleChange = async (e) => {
    console.log(e.target.value);
    const [dayofWeek, startTime, endTime, id] = e.target.value.split(" ");

    const { data: schedule } = await supabase
      .from("schedules")
      .select(
        "startTime, endTime, dayofWeek, profiles: user_id ( user_name,id )"
      )
      .eq("dayofWeek", dayofWeek)
      .neq("user_id", id);

    console.log(schedule, id);
    setOtherSchedules(schedule || []);
  };

  /******************************
   * @function doLogout
   * @description ログアウト処理
   ******************************/
  const doLogout = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;

      router.replace("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  /*****************************************
   * @function fetchSchedules
   * @description スケジュールを取得
   *****************************************/
  const fetchSchedules = async () => {
    const { data: schedules, error } = await supabase
      .from("schedules")
      .select(
        "startTime, endTime, dayofWeek,profiles: user_id ( user_name,id,user_id )"
      );

    console.log(schedules);
    if (error) {
      return [];
    }

    return schedules;
  };

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      const allSchedules = await fetchSchedules();

      const mySchedules = allSchedules.filter(
        ({ profiles: { user_id } }) => user_id === user.id
      );
      const otherSchedules = allSchedules.filter(
        ({ profiles: { user_id } }) => user_id !== user.id
      );
      console.log(mySchedules, "mySchedules");
      console.log(otherSchedules, "otherSchedules");

      if (!allSchedules.length) {
        return false;
      }
      setMySchedules(mySchedules || []);
      setOtherSchedules(otherSchedules || []);
    };

    fetchData();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center py-16 px-3 bg-[#f1c232]`}
    >
      <LogoutBtn doLogout={doLogout} />

      <div className="w-full max-w-2xl p-10 bg-white shadow-xl rounded-2xl">
        <Heading text={"Matching Result"} />
        <UserRequestTime
          mySchedules={mySchedules}
          handleChange={handleScheduleChange}
        />
        <ResultsInfo count={otherSchedules.length} />

        <div className="p-0 border-t-2 border-gray-200 border-solid border-b-0 border-l-0 border-r-0">
          {otherSchedules.map((schedule, index) => (
            <ResultItem schedule={schedule} key={index} />
          ))}
        </div>

        <LinkButton url="/" text="投票ページに戻る" />
      </div>
    </main>
  );
};

export default Result;

export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {},
  };
};
