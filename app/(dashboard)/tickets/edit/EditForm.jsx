"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditForm({ ticket, id }) {
  const router = useRouter();

  const [title, setTitle] = useState(ticket.title);
  const [body, setBody] = useState(ticket.body);
  const [priority, setPriority] = useState(ticket.priority);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatetTicket = {
      title,
      body,
      priority,
    };

    console.log(updatetTicket);
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatetTicket),
      });
      if (!res.ok) {
        console.error("Request failed with status:", res.status);
        return;
      }
      const json = await res.json();
      if (json.data) {
        router.refresh();
        router.push("/tickets");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Editing...</span>}
        {!isLoading && <span>Edit Ticket</span>}
      </button>
    </form>
  );
}
