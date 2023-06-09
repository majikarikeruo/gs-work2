/**
 * Next
 */
import Image from "next/image";

const ResultItem = ({ schedule }) => {
  return (
    <div className="flex justify-between items-center py-4 list-none border-b-2 border-gray-200 border-solid border-t-0 border-l-0 border-r-0">
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="mx-3">
            <input type="checkbox" />
          </div>

          <div className="h-[55px] relative mr-2 border-gray-100 border-solid border-2 rounded-full inline-flex align-middle">
            <Image
              src="/images/stamp18.png"
              width={55}
              height={48}
              alt="ダミー"
            />
          </div>
        </div>

        <p className="m-0 ml-3 font-bold text-lg">
          {schedule.profiles.user_name}さん
        </p>
      </div>
      <div className="flex text-lg justify-end">
        <span className="inline-block mr-6">{schedule.dayofWeek}</span>
        <div>
          <span className="inline-block mx-2">{schedule.startTime}</span>
          <span className="inline-block mx-1">-</span>
          <span className="inline-block mx-2">{schedule.endTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
