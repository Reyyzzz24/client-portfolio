import { supabase } from "@/lib/supabase";
import WorkContent from "../components/WorkContent";

export default async function Work() {
  const { data: projects } = await supabase
    .from("portfolio_projects")
    .select("*");

  if (!projects) return null;

  return <WorkContent />;
}