const DateInput = ({ label, setDate }) => {
  return (
    <div className="md:-translate-x-[100px] lg:-translate-x-[220px] xl:-translate-x-[220px] flex flex-col md:flex-row md:items-center w-fit md:gap-3">
      <label className="text-base sm:text-lg text-slate-600 font-bold">
        {label}
      </label>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="bg-neutral-800 outline-none rounded-full px-4 py-1.5 text-gray-400 text-sm sm:text-base font-medium"
      />
    </div>
  );
};

export default DateInput;
