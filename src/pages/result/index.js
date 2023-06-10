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
  const [allSchedules, setAllSchedules] = useState([]);
  const [userRequestTimes, setUserRequestTimes] = useState([]);

  /** library */
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

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
   * @function fetchAllSchedules
   * @description
   *****************************************/
  const fetchAllSchedules = async () => {
    const { data: schedules, error } = await supabase
      .from("schedules")
      .select(
        "startTime, endTime, dayofWeek,profiles: user_id ( user_name,user_id )"
      );
    if (error) {
      console.error("Failed to fetch schedules:", error);
      return [];
    }

    return schedules;
  };

  /*****************************************
   * @function fetchUserRequestedSchedules
   * @description ユーザーのリクエスト時間を取得
   *****************************************/
  const fetchUserRequestedSchedules = async (allSchedules) => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    const userRequestTime = allSchedules.filter(
      (item) => item.profiles.user_id === user.id
    );
    setUserRequestTimes(userRequestTime);
  };

  useEffect(() => {
    const fetchData = async () => {
      const allScheduleData = await fetchAllSchedules();

      if (allScheduleData.length) {
        setAllSchedules([...allScheduleData]);
        fetchUserRequestedSchedules(allScheduleData);
      }
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
        <UserRequestTime userRequestTimes={userRequestTimes} />
        <ResultsInfo count={allSchedules.length} />

        <div className="p-0 border-t-2 border-gray-200 border-solid border-b-0 border-l-0 border-r-0">
          {allSchedules.map((schedule, index) => (
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
