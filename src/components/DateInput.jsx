const DateInput = ({ label, setDate }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm">{label}</label>
      <input type="date" className="text-sm px-4 py-1 my-1 rounded-md" />
    </div>
  );
};

export default DateInput;
