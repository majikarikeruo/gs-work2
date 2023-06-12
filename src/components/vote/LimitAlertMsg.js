const LimitAlertMsg = ({ limit }) => {
  return (
    <div className="mb-5 text-sm p-4 bg-[#fcf6e3] rounded-sm">
      <ul className="pl-5">
        <li className="my-3">
          日程の登録は<spab className="text-red-500 font-bold">最大5個</spab>
          まで可能です。
        </li>
        <li className="my-3">
          入力頂いた曜日・時間に急用が入って参加できないケースもあると思いますので、あくまで基本的に対応可能な曜日・時間を入れていただければ大丈夫です！
        </li>
      </ul>
    </div>
  );
};

export default LimitAlertMsg;
