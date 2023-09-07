import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import UserDashboard from "./UserDashboard";

async function getOpenTickets() {
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

async function getAssignedTickets() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("Assignement")
    .select(`*,Tickets(*)`);

  if (error) {
    console.log(error.message);
  }
  return data;
}
export default async function Home() {
  const assignedTickets = await getAssignedTickets();
  const openTickets = await getOpenTickets();
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  return (
    <main>
      <UserDashboard
        assigned={assignedTickets}
        user={data}
        openTickets={openTickets}
      />

      <h2>Company Updates</h2>

      <div className="card">
        <h3>New member of the web dev team...</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at
          quam. Dolores omnis possimus quam soluta rerum illo laborum ullam
          pariatur molestiae, modi beatae corrupti.
        </p>
      </div>
      <div className="card">
        <h3>New website live!</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at
          quam. Dolores omnis possimus quam soluta rerum illo laborum ullam
          pariatur molestiae, modi beatae corrupti, assumenda distinctio
          adipisci, cupiditate minima eum vitae? Similique dicta est facilis
          debitis, autem temporibus quo repellat illum unde id iste veritatis
          eveniet, aspernatur enim quas.
        </p>
      </div>
    </main>
  );
}
