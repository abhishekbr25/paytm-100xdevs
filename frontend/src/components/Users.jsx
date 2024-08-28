import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Users() {
  //come from backend
  const [users, setUsers] = useState([]);
  const [filter, setfilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2002/api/v1/user/user?filter=" + filter)
      .then((res) => setUsers(res.data.users));
  }, [ filter]);

  return (
    <div className="flex flex-col justify-start mt-8 p-4">
      <div className="font-bold text-xl ">Users</div>
      <input
        type="text"
        placeholder="Search user..."
        onChange={(e) => setfilter(e.target.value)}
        className="bg-blue-50 border b-6 p-2 mt-3 rounded-lg outline-none"
      />
      <div className="mt-2">
        <div className="mx-[10%] py-5 ">
          {users.length > 0 ? (
            users.map((user) => (
              <div>
                <User user={user} />
              </div>
            ))
          ) : (
            <div>No users found </div>
          )}
        </div>
      </div>
    </div>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-5 m-2 bg-slate-400 rounded-3xl">
      <div className="text-xl">{user.firstname}</div>
      <button
        onClick={(e) => {
          navigate("/send" + "?id=" + user._id + "&name=" + user.firstname);
        }}
        className="bg-zinc-900 text-white py-2 rounded-lg px-6"
      >
        send money
      </button>
    </div>
  );
}
