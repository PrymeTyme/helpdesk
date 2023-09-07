import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import List from "./List";

async function getTickets() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("Tickets")
    .select(`*`)
    .eq("is_assigned", false);

  if (error) {
    console.log(error.message);
  }
  return data;
}

export default async function TicketList() {
  const tickets = await getTickets();
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  return (
    <>
      <List tickets={tickets} user={data} />
    </>
  );
}
