import { useSearchParams } from "react-router-dom";
import { Heading } from "../components/Heading";
import axios from "axios";
import { useState } from "react";

export function SendMoney() {
  const [amount, setAmount] = useState("");
  const [searchparams, setsearchparams] = useSearchParams();
  const username = searchparams.get("name");
  const id = searchparams.get("id");
  console.log("id is:" + localStorage.getItem("token"));

  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center ">
      <div className="bg-white p-6 shadow-2xl rounded-lg w-2/6">
        <div className="flex flex-col justify-evenly ">
          <div className=" text-green-400">
            <Heading title={"Send Money"} />
          </div>
          <p className="mt-24 text-xl font-semibold"> {username} </p>
          <input
            type="text"
            placeholder="Amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="outline-none p-1 mt-2 border border-blue-200 "
            required
          />
          <button
            onClick={() => {
              axios.post("http://localhost:2002/api/v1/account/transfer", {
                to: id,
                amount,
              },{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              });
            }}
            className="bg-zinc-900 text-white py-2 rounded-lg px-6 mt-5"
          >
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
