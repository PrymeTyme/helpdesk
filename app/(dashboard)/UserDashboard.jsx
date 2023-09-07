"use client";

import Link from "next/link";

export default function UserDashboard({ assigned, user, openTickets }) {
  const assignedLength = assigned.length;
  const openTicketsLength = openTickets.length;
  const userEmail = user.session.user.email;

  return (
    <>
      <h2>{userEmail}´s Dashboard</h2>
      <div className="sm:flex sm:space-x-4 grid grid-rows-2 ">
        <div className="card flex-1 sm:w-5">
          <h3>Assigned Tickets:</h3>
          <div className="text-xl mt-4 text-center">{assignedLength}</div>
          <div className="flex justify-center my-4">
            <Link href={"/assigned-tickets"}>
              <button className="btn-primary">View Tickets</button>
            </Link>
          </div>
        </div>
        <div className="card flex-1 sm:w-5">
          <h3>Open Tickets:</h3>
          <div className="text-xl mt-4 text-center">{openTicketsLength}</div>
          <div className="flex justify-center my-4">
            <Link href={"/tickets"}>
              <button className="btn-primary">View Tickets</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
