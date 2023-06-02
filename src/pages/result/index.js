/**
 * React
 */
import { useEffect, useState } from "react";

/**
 * Next
 */
import Image from "next/image";

/**
 * Components
 */
import Heading from "@/components/common/Heading";
import LinkButton from "@/components/common/LinkButton";

const Result = () => {
  const [allSchedules, setAllSchedules] = useState([]);
  const [overlappingTimes, setOverlappingTimes] = useState([]);

  /**
   * @function getFormattedTime
   * @description 時間を分単位に変換する
   */
  const getFormattedTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  /**
   * @function getZeroPaddingTime
   * @description 時間をゼロ埋めする
   */
  const getZeroPaddingTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  /**
   * @function matchSchedules
   * @description スケジュールのマッチング
   */
  const matchSchedules = (allScheduleData) => {
    const overlappingTimes = [];

    for (let i = 0; i < allScheduleData.length; i++) {
      const targetData = JSON.parse(allScheduleData[i]);

      for (let j = i + 1; j < allScheduleData.length; j++) {
        const counterData = JSON.parse(allScheduleData[j]);

        for (const targetSchedule of targetData.schedules) {
          for (const counterSchedule of counterData.schedules) {
            if (targetSchedule.dayofWeek === counterSchedule.dayofWeek) {
              const overlapStartTime = Math.max(
                getFormattedTime(targetSchedule.startTime),
                getFormattedTime(counterSchedule.startTime)
              );
              const overlapEndTime = Math.min(
                getFormattedTime(targetSchedule.endTime),
                getFormattedTime(counterSchedule.endTime)
              );

              if (overlapStartTime < overlapEndTime) {
                overlappingTimes.push({
                  userName: [targetData.username, counterData.username],
                  dayofWeek: targetSchedule.dayofWeek,
                  startTime: formatTime(overlapStartTime),
                  endTime: formatTime(overlapEndTime),
                });
              }
            }
          }
        }
      }
    }
    const nonOverlappingTimes = removeDuplicateOverlaps(overlappingTimes);

    refilterSchedules(nonOverlappingTimes);
  };

  /**
   * @function refilterSchedules
   * @description スケジュールを再フィルタリングする
   */
  const refilterSchedules = (schedules) => {
    const overlappingTimes = [];
    const processedIndexes = [];

    for (let i = 0; i < schedules.length; i++) {
      if (processedIndexes.includes(i)) {
        continue;
      }

      const currentSchedule = schedules[i];
      const overlappingUsers = [...currentSchedule.userName];

      for (let j = i + 1; j < schedules.length; j++) {
        const nextSchedule = schedules[j];

        if (
          currentSchedule.dayofWeek === nextSchedule.dayofWeek &&
          currentSchedule.startTime < nextSchedule.endTime &&
          currentSchedule.endTime > nextSchedule.startTime
        ) {
          overlappingUsers.push(...nextSchedule.userName);
          processedIndexes.push(j);
        }
      }

      if (overlappingUsers.length > currentSchedule.userName.length) {
        overlappingTimes.push({
          userName: overlappingUsers,
          dayofWeek: currentSchedule.dayofWeek,
          startTime: currentSchedule.startTime,
          endTime: currentSchedule.endTime,
        });
      }
    }
    setOverlappingTimes(overlappingTimes);
  };

  /**
   * @function removeDuplicateOverlaps
   * @description 重複する時間帯を削除する
   */
  const removeDuplicateOverlaps = (overlappingTimes) => {
    const uniqueOverlaps = [];
    const seenTimeRanges = new Set();

    for (const overlap of overlappingTimes) {
      const timeRange = `${overlap.startTime}-${overlap.endTime}`;

      if (!seenTimeRanges.has(timeRange)) {
        uniqueOverlaps.push(overlap);
        seenTimeRanges.add(timeRange);
      }
    }

    return uniqueOverlaps;
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const allScheduleData = keys.map((key, index) => localStorage.getItem(key));

    if (allScheduleData.length) {
      matchSchedules(allScheduleData);
      setAllSchedules([...allSchedules]);
    }
  }, []);

  return (
    <main
      className={`max-w-2xl w-full m-auto min-h-screen flex-col items-center justify-between py-16 px-3`}
    >
      <div>
        <Heading text={"マッチング結果"} />
        <div className="mt-8">
          <ul className="p-0 border-t-2 border-gray-200 border-solid border-b-0 border-l-0 border-r-0">
            {overlappingTimes.map((overlappingTime, index) => (
              <li
                key={index}
                className="py-4 list-none border-b-2 border-gray-200 border-solid border-t-0 border-l-0 border-r-0"
              >
                <div className="flex items-center">
                  <div className="h-[74px] relative mr-2 border-gray-100 border-solid border-2 rounded-full inline-flex align-middle">
                    <Image
                      src="/images/stamp18.png"
                      width={74}
                      height={64}
                      alt="ダミー"
                    />
                  </div>

                  <p className="m-0 text-sm">
                    {overlappingTime.userName.map((name, idx) => (
                      <span className="inline-block mr-2" key={idx}>
                        {name}さん
                      </span>
                    ))}
                  </p>
                </div>
                <div className="flex text-2xl justify-end">
                  <span className="inline-block mr-8">
                    {overlappingTime.dayofWeek}
                  </span>
                  <div>
                    <span>{overlappingTime.startTime}</span>
                    <span className="inline-block mx-4">-</span>
                    <span>{overlappingTime.endTime}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <LinkButton url="/" text="投票ページに戻る" />
      </div>
    </main>
  );
};

export default Result;
