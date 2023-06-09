const UserRequestTime = ({ userRequestTime }) => {
  return (
    <div className="mb-10">
      <h2 className="text-md mb-2">あなたの希望した時間</h2>
      <div className="flex">
        <select className="text-lg p-3 border-gray-200 border-solid border rounded">
          <option value="1">平日 9:00-12:00</option>
          <option value="1">平日 9:00-12:00</option>
          <option value="1">平日 9:00-12:00</option>
        </select>
        <p className="ml-3">と一致する参加者を表示する</p>
      </div>
    </div>
  );
};

export default UserRequestTime;
