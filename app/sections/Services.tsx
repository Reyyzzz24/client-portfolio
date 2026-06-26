import { supabase } from "@/lib/supabase";
import ServicesContent from "../components/ServicesContent";

export default async function Services() {
  const { data: services } = await supabase
    .from("services_data")
    .select("*");

  return (
    <ServicesContent />
  );
}