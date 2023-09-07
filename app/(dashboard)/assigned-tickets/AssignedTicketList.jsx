"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AssignedTicketList({ tickets, user }) {
  const [hydrated, setHydrated] = useState(false);
  console.log(tickets);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      {hydrated &&
        tickets.map((ticket) => (
          <div key={ticket.id} className="card my-5">
            <Link href={`/assigned-tickets/${ticket.id}`}>
              <h3 className="flex">
                {ticket.title}
                <span className="ml-auto">
                  <small>
                    assigned to: {ticket.Assignement[0].assigned_to}
                  </small>
                </span>
              </h3>
              <p>{ticket.body.slice(0, 200)}...</p>
              <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
              </div>
            </Link>
          </div>
        ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no Open Tickets!</p>
      )}
    </>
  );
}
