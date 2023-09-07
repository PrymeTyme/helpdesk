import { Suspense } from "react";

import TicketList from "./TicketList";
import Loading from "../loading";
import CreateButton from "./create/CreateButton";

export const metadata = {
  title: "helpdesk | tickets ",
};

export default function Tickets() {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>

          <p className="flex flex-row text-sm">Currently open tickets</p>
        </div>

        <div className="ml-auto">
          <CreateButton />
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
