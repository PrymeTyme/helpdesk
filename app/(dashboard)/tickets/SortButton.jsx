"use client";
import { BiChevronDown } from "react-icons/bi";

export default function SortButton({ sortBy, setSortBy }) {
  const handleClick = (e) => {
    setSortBy(e);
  };
  return (
    <div className="group  relative dropdown cursor-pointer">
      <div className="sort-btn flex">
        sorted by <span className="underline ml-1">{sortBy}</span>
        <BiChevronDown />
      </div>
      <div className="group-hover:block dropdown-menu absolute hidden h-auto z-10 ">
        <ul className="top-0 shadow px-4 py-2 drop-down ml-0">
          <li className="py-1">
            <button
              value={"Date"}
              onClick={(e) => handleClick(e.target.value)}
              className="block hover:text-gray-800 text-sm"
            >
              Date
            </button>
          </li>
          <li className="py-1">
            <button
              value={"Priority"}
              onClick={(e) => handleClick(e.target.value)}
              className="block hover:text-gray-800 text-sm"
            >
              Priority
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
