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

  /*****************************************
   * @function matchSchedules
   * @description 総あたりによるスケジュールのマッチング検索
   *****************************************/
  const matchSchedules = (allScheduleData) => {
    const overlappingAry = [];

    for (let i = 0; i < allScheduleData.length; i++) {
      const schedule1 = JSON.parse(allScheduleData[i]);

      for (let j = i + 1; j < allScheduleData.length; j++) {
        const schedule2 = JSON.parse(allScheduleData[j]);

        for (const scheduleAItem of schedule1.schedules) {
          for (const scheduleBItem of schedule2.schedules) {
            if (scheduleAItem.dayofWeek === scheduleBItem.dayofWeek) {
              const overlap = _findOverlap(scheduleAItem, scheduleBItem);

              if (overlap) {
                const overlappdedSchedule = {
                  userName: [schedule1.username, schedule2.username],
                  dayofWeek: scheduleAItem.dayofWeek,
                  startTime: _convertMinutesToTimeString(overlap.startTime),
                  endTime: _convertMinutesToTimeString(overlap.endTime),
                };

                overlappingAry.push(overlappdedSchedule);
              }
            }
          }
        }
      }
    }

    /**重複スケジュールを削除する */
    const slimOverlappingTimes = _removeDuplicateOverlaps(overlappingAry);

    /** スケジュールデータ */
    const overlappingTimes = refilterSchedules(slimOverlappingTimes);

    setOverlappingTimes(overlappingTimes);
  };

  /*****************************************
   * @function refilterSchedules
   * @description スケジュールを再フィルタリングする
   * @param {array} schedules - スケジュール
   * @returns {array} 重複する時間帯
   *****************************************/
  const refilterSchedules = (schedules) => {
    const overlappingTimes = []; // 重複する時間帯
    const processedIndexes = []; // 処理済みのスケジュールデータのインデックス

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
          userName: _reduceDuplicateNames(overlappingUsers),
          dayofWeek: currentSchedule.dayofWeek,
          startTime: currentSchedule.startTime,
          endTime: currentSchedule.endTime,
        });
      }
    }

    return overlappingTimes;
  };

  /*****************************************
   * @function _findOverlap
   * @description 重複する時間帯を探す
   * @param {object} schedule1 - スケジュール1
   * @param {object} schedule2 - スケジュール2
   * @returns {object} 重複する時間帯。重複しない場合はnull
   *****************************************/
  const _findOverlap = (schedule1, schedule2) => {
    const overlapStartTime = Math.max(
      _getFormattedTime(schedule1.startTime),
      _getFormattedTime(schedule2.startTime)
    );
    const overlapEndTime = Math.min(
      _getFormattedTime(schedule1.endTime),
      _getFormattedTime(schedule2.endTime)
    );

    if (overlapStartTime < overlapEndTime) {
      return { startTime: overlapStartTime, endTime: overlapEndTime };
    }

    return null;
  };

  /*****************************************
   * @function _reduceDuplicateNames
   * @description 重複する名前を削除する
   *****************************************/
  const _reduceDuplicateNames = (arr) => {
    const uniqueNames = [...new Set(arr)];
    return uniqueNames;
  };

  /*****************************************
   * @function _getFormattedTime
   * @description 時間を分単位に変換する
   *****************************************/
  const _getFormattedTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  /*****************************************
   * @function _removeDuplicateOverlaps
   * @description 重複する時間帯を削除する
   *****************************************/
  const _removeDuplicateOverlaps = (overlappingTimes) => {
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

  /*****************************************
   * @function _convertMinutesToTimeString
   * @description 分を時間の文字列に変換する
   *****************************************/
  const _convertMinutesToTimeString = (minutes) => {
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
