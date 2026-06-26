import { supabase } from "@/lib/supabase";
import InsightsContent from "../components/InsightsContent";

export default async function Insights() {
  const { data: posts } = await supabase
    .from("insights_posts")
    .select("*")
    .order("date", {
      ascending: false,
    });

  return (
    <InsightsContent />
  );
}