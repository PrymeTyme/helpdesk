import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import AssignedTicketList from "./AssignedTicketList";
import Loading from "../loading";

export async function generateMetadata() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  return {
    title: `helpdesk | Dashboard for ${data?.session.user.email}`,
  };
}

async function getAssignedTickets(userEmail) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("Tickets")
    .select(`*,Assignement!inner(*)`)
    .eq("Assignement.assigned_to", userEmail);

  if (!data || error) {
    console.log("not found");
    console.log(error);
    //notFound();
  }

  return data;
}

export default async function AssignedTickets() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();
  const userEmail = data.session.user.email;
  const tickets = await getAssignedTickets(userEmail);

  //const canEditDelete = data && data.session.user.email === tickets.assigned_to;
  return (
    <main>
      <nav>
        <div>
          <h2> Assigned Tickets</h2>

          <p className="flex flex-row text-sm">
            Currently open tickets for {userEmail}
          </p>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <AssignedTicketList tickets={tickets} user={data} />
      </Suspense>
    </main>
  );
}
