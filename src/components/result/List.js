import { useEffect, useState } from "react";

const List = ({ overlappingTime }) => {
  const matchSchedules = () => {
    const overlappingTimes = [];
    console.log(allSchedules);

    // データの総当たり実施
    for (let i = 0; i < allSchedules.length; i++) {
      const targetData = JSON.parse(allSchedules[i]);
      for (let j = i + 1; j < allSchedules.length; j++) {
        const counterData = JSON.parse(allSchedules[j]);

        console.log(targetData, counterData);
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
    const allSchedules = keys.map((key, index) => localStorage.getItem(key));

    setAllSchedules(allSchedules);

    if (allSchedules.length) {
      matchSchedules();
    }
  }, []);







  return (
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
        <span className="inline-block mr-8">{overlappingTime.dayofWeek}</span>
        <div>
          <span>{overlappingTime.startTime}</span>
          <span className="inline-block mx-4">-</span>
          <span>{overlappingTime.endTime}</span>
        </div>
      </div>
    </li>
  );
};

export default List;
