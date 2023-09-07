"use client";
import { useRouter } from "next/navigation";

import { MdOutlineAssignmentTurnedIn } from "react-icons/md";

export default function AssignButton({ id }) {
  const ticket_id = id;

  const router = useRouter();
  const handleClick = async () => {
    const assigned = {
      ticket_id,
      assigned_at: new Date().toISOString(),
    };

    try {
      // Step 1: POST request to create an "Assigned" record
      const assignedRes = await fetch("/api/assigned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assigned),
      });

      if (!assignedRes.ok) {
        console.error(
          "Assigned request failed with status:",
          assignedRes.status
        );
        return;
      }

      // Step 2: PUT request to update the "Tickets" table
      const ticketUpdate = {
        is_assigned: true,
      };

      const ticketUpdateRes = await fetch(
        `http://localhost:3000/api/tickets/${id}?assign=true`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ticketUpdate),
        }
      );

      if (!ticketUpdateRes.ok) {
        console.error(
          "Ticket update request failed with status:",
          ticketUpdateRes.status
        );
        return;
      }

      router.refresh();
      router.push("/tickets");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <button
      className="btn-primary rounded-bl-md"
      title="Assign"
      onClick={handleClick}
    >
      <>
        <MdOutlineAssignmentTurnedIn />
      </>
    </button>
  );
}
