const DateInput = ({ label, setDate }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm">{label}</label>
      <input
        type="date"
        className="text-sm px-2 py-1.5 my-1 rounded-md"
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default DateInput;
