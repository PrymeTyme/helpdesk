"use client";
import { TiPlus } from "react-icons/ti";
import { useRouter } from "next/navigation";

export default function CreateButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/tickets/create");
  };
  return (
    <button className="btn-primary" onClick={handleClick}>
      <>
        <TiPlus />
        Create Ticket
      </>
    </button>
  );
}
