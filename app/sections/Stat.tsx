import { supabase } from "@/lib/supabase";
import StatContent from "../components/StatContent";

export default async function Stat() {
  const { data: stats } = await supabase
    .from("stats_data")
    .select("*")
    .order("display_order", {
      ascending: true,
    });

  return (
    <StatContent
      stats={stats || []}
    />
  );
}