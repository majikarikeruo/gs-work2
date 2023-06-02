import { useEffect, useState } from "react";

import Image from "next/image";

import Heading from "@/components/home/heading";

const Result = () => {
  const [allSchedules, setAllSchedules] = useState([]);
  const [overlappingTimes, setOverlappingTimes] = useState([]);

  const matchSchedules = (allScheduleData) => {
    const overlappingTimes = [];

    // データの総当たり実施
    for (let i = 0; i < allScheduleData.length; i++) {
      const targetData = JSON.parse(allScheduleData[i]);
      for (let j = i + 1; j < allScheduleData.length; j++) {
        const counterData = JSON.parse(allScheduleData[j]);

        if (
          targetData.schedules[0].dayofWeek ===
          counterData.schedules[0].dayofWeek
        ) {
          const targetStartTime = new Date(
            `2000-01-01T${targetData.schedules[0].startTime}`
          );
          const targetEndTime = new Date(
            `2000-01-01T${targetData.schedules[0].endTime}`
          );
          const counterStartTime = new Date(
            `2000-01-01T${counterData.schedules[0].startTime}`
          );
          const counterEndTime = new Date(
            `2000-01-01T${counterData.schedules[0].endTime}`
          );

          if (
            targetStartTime <= counterEndTime &&
            counterStartTime <= targetEndTime
          ) {
            const overlapStartTime = new Date(
              Math.max(targetStartTime, counterStartTime)
            );
            const overlapEndTime = new Date(
              Math.min(targetEndTime, counterEndTime)
            );

            const targetMinutes = overlapStartTime
              .getMinutes()
              .toString()
              .padStart(2, "0");
            const counterMinutes = overlapEndTime
              .getMinutes()
              .toString()
              .padStart(2, "0");

            overlappingTimes.push({
              userName: [targetData.username, counterData.username],
              dayofWeek: targetData.schedules[0].dayofWeek,
              startTime: `${overlapStartTime.getHours()}:${targetMinutes}`,
              endTime: `${overlapEndTime.getHours()}:${counterMinutes}`,
            });
          }
        }
      }
    }
    setOverlappingTimes([...overlappingTimes]);
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
      </div>
    </main>
  );
};

export default Result;
