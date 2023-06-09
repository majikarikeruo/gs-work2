/**
 * React
 */

import Button from "@/components/common/Button";

const ResultsInfo = ({ count }) => {
  return (
    <div className="results-info my-3 flex items-center justify-between">
      {/* <Button text="選択したユーザーとのメッセージを開始する" /> */}

      <span className="text-sm">
        検索結果
        <span className="font-bold inline-block ml-2 mr-2 text-lg">
          {count}
        </span>
        件
      </span>
    </div>
  );
};

export default ResultsInfo;
