"use client";

import { BsCheckSquare } from "react-icons/bs";

const handleClick = () => {
  console.log("ticket completed");
};

export default function CompletedButton() {
  return (
    <>
      <button className={"btn-primary"} title="Completed" onClick={handleClick}>
        <>
          <BsCheckSquare />
        </>
      </button>
    </>
  );
}
