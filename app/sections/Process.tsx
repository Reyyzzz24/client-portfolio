import { supabase } from "@/lib/supabase";
import ProcessContent from "../components/ProcessContent";

export default async function Process() {
  const { data: steps } = await supabase
    .from("process_data")
    .select("*")
    .order("order_index", { ascending: true });

  return (
    <ProcessContent
      steps={steps || []}
    />
  );
}