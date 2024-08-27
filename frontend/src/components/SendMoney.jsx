import { Heading } from "./Heading"; 

export function SendMoney() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center ">
      <div className="bg-white p-6 shadow-2xl rounded-lg w-2/6">
        <div className="flex flex-col justify-evenly ">
          <div className=" text-green-400">
            <Heading title={"Send Money"} />
          </div>
          <p className="mt-24 text-xl font-semibold">friends name</p>
          <input
            type="text"
            placeholder="Amount"
            className="outline-none p-1 mt-2 border border-blue-200 "
          />
          <button className="bg-zinc-900 text-white py-2 rounded-lg px-6 mt-5">
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
