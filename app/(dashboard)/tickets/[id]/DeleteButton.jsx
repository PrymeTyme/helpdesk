"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";

export default function DeleteButton({ id, disabled }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();

    if (json.error) {
      console.log(error);
      setIsLoading(false);
    }
    if (!json.error) {
      router.refresh();
      router.push("/tickets");
    }
  };
  return (
    <>
      <button
        className={`btn-primary ${disabled ? "no-drop-cursor" : ""}`}
        onClick={() => setShowModal(true)}
        disabled={disabled}
        title="Delete"
      >
        <>
          <FiTrash2 />
        </>
      </button>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleClick={handleClick}
      />
    </>
  );
}
