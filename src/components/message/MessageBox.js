const MessageBox = ({ message }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-row justify-between border-b-2 border-gray-300 pb-2">
        <div className="flex flex-row items-center">
          <div className="flex flex-col ml-2">
            <div className="text-sm font-semibold text-gray-600">こすげ</div>

            <div className="text-sm font-semibold text-gray-400">
              test@test.com
            </div>

            <div className="text-sm font-semibold text-gray-400">
              2023 6/30 11:00
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center mt-4">
        <div className="flex flex-col ml-2">
          <div className="text-sm font-semibold text-gray-600">
            こんにちは！みなさん元気ですか？今日からやりとりしていきましょうね！
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
