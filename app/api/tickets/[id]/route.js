import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(_, { params }) {
  const id = params.id;
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.from("Tickets").delete().eq("id", id);

  return NextResponse.json({ error });
}

export async function PUT(request, { params }) {
  const id = params.id;
  const ticket = await request.json();

  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase
    .from("Tickets")
    .update({ ...ticket })
    .eq("id", id)
    .select();

  return NextResponse.json({ data, error });
}
