import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import DeleteButton from "./DeleteButton";
import CompletedButton from "./CompletedButton";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: ticket } = await supabase
    .from("Tickets")
    .select()
    .eq("id", params.id)
    .single();

  return {
    title: `helpdesk | ${ticket?.title}` || "Ticket not found",
  };
}

async function getTicket(id) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("Tickets")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return data;
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);

  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const canEditDelete = data && data.session.user.email === ticket.user_email;

  return (
    <main>
      <nav>
        <h2> Ticket Details</h2>
      </nav>
      <div className="card">
        <div className="card-nav rounded-bl-md">
          <div>
            <CompletedButton id={ticket.id} />
          </div>
          <div>
            <DeleteButton id={ticket.id} disabled={!canEditDelete} />
          </div>
        </div>
        <h3>{ticket.title}</h3>
        <small>Created by: {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
