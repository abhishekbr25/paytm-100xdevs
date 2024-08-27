import { Button } from "./Button";

export function Users() {
  //come from backend
  const users = [
    {
      name: "abhishek",
      id: "djslkdj",
    },
  ];
  return (
    <div className="flex flex-col justify-start mt-8 p-4">
      <div className="font-bold text-xl ">Users</div>
      <input
        type="text"
        placeholder="Search user..."
        className="bg-blue-50 border b-6 p-2 mt-3 rounded-lg outline-none"
      />
      <div className="mt-2">
        <div className="mx-[10%] py-5 bg-slate-400 rounded-3xl">
          {users.map((user) => (
            <div>
              <User user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function User({ user }) {
  return (
    <div className="flex justify-between items-center px-5">
      <div className="text-xl">{user.name}</div>
      <button className="bg-zinc-900 text-white py-2 rounded-lg px-6">
        send money
      </button>
    </div>
  );
}
