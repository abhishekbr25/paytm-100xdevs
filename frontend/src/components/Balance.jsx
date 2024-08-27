export function Balance({ value }) {
  return (
    <div className="h-14 flex p-3">
      <div className="font-bold text-xl">Balance:</div>
      <div className="font-semibold ml-4 text-xl">{value}</div>
    </div>
  );
}
