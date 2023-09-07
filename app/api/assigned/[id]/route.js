import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(_, { params }) {
  const id = params.id;
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.from("Assignement").delete().eq("id", id);

  return NextResponse.json({ error });
}

export async function PUT(request, { params, query }) {
  const id = params.id;
  const ticket = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  // Check if the 'assign' query parameter is present
  const isAssigning = query.assign === "true";

  if (isAssigning) {
    const assignData = { is_assigned: true };
    const { data, error } = await supabase
      .from("Tickets")
      .update(assignData)
      .eq("id", id)
      .select();

    return NextResponse.json({ data, error });
  } else {
    const { data, error } = await supabase
      .from("Tickets")
      .update({ ...ticket })
      .eq("id", id)
      .select();

    return NextResponse.json({ data, error });
  }
}
