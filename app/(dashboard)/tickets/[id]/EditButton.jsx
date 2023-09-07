"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

export default function EditButton({ id, disabled }) {
  const router = useRouter();

  return (
    <button
      className={`btn-primary ${disabled ? "no-drop-cursor" : ""}`}
      title="Edit"
      disabled={disabled}
      onClick={() => {
        router.push(`/tickets/edit?search=${id}`);
      }}
    >
      <>
        <FiEdit />
      </>
    </button>
    /*     <Link
      href={{ pathname: "/tickets/edit", query: { search: `${id}` } }}
      className="btn-primary flex text-sm text-right"
    >
      <>
        <FiEdit />
        Edit Ticket{id}
      </>
    </Link> */
  );
}
