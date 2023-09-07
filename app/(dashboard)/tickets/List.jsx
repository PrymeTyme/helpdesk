"use client";
import Link from "next/link";
import SortButton from "./SortButton";
import { useState, useEffect } from "react";
import Checkbox from "./Checkbox";

export default function List({ tickets, user }) {
  const [sortBy, setSortBy] = useState("Date");
  const [hydrated, setHydrated] = useState(false);
  const [filterBy, setFilterBy] = useState(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const sortByDate = (a, b) =>
    Date.parse(a.created_at) + Date.parse(b.created_at);

  const priorityValues = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const sortByPriority = (a, b) => {
    const priorityA = priorityValues[a.priority];
    const priorityB = priorityValues[b.priority];

    return priorityB - priorityA;
  };

  const customSort = (sortBy, tickets) => {
    let sortedList = [...tickets];

    if (sortBy === "Date") {
      sortedList.sort(sortByDate);
    } else if (sortBy === "Priority") {
      sortedList.sort(sortByPriority);
    }

    return sortedList;
  };

  const filterTickets = (tickets, user, filterBy) => {
    const userEmail = user.session.user.email;

    if (filterBy === "All") {
      return tickets;
    } else if (filterBy === "My") {
      return tickets.filter((ticket) => ticket.user_email === userEmail);
    } else {
      // Handle other filter cases if needed
      return tickets;
    }
  };
  const filteredTickets = filterTickets(tickets, user, filterBy);

  const sortedList = customSort(sortBy, filteredTickets);
  return (
    <>
      <nav className="mb-1 ">
        <div className="flex justify-between">
          <Checkbox setFilterBy={setFilterBy} />
        </div>
        <div className="flex ml-auto">
          <SortButton sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </nav>

      {hydrated &&
        sortedList.map((ticket) => (
          <div key={ticket.id} className="card my-5">
            <Link href={`/tickets/${ticket.id}`}>
              <h3>{ticket.title}</h3>
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
