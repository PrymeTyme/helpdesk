"use client";

export default function Checkbox({ setFilterBy }) {
  const onOptionChange = (e) => {
    setFilterBy(e.target.value);
  };
  return (
    <div className="flex space-x-2">
      <input
        type="radio"
        value={"All"}
        id="all"
        name="filterBy"
        onChange={onOptionChange}
        className="cursor-pointer mr-0"
      />
      <label className="cursor-pointer" htmlFor="all">
        All Tickets
      </label>
      <input
        type="radio"
        value={"My"}
        id="my"
        name="filterBy"
        onChange={onOptionChange}
        className="cursor-pointer mr-0"
      />
      <label className="cursor-pointer" htmlFor="my">
        My Tickets
      </label>
    </div>
  );
}
