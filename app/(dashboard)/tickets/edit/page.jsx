import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import EditForm from "./EditForm";

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

export default async function EditTicket({ searchParams }) {
  const ticket = await getTicket(searchParams.search);

  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  return (
    <div>
      EditTicket{ticket.title}
      <EditForm ticket={ticket} id={searchParams.search} />
    </div>
  );
}
