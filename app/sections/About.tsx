import { supabase } from "@/lib/supabase";
import AboutContent from "../components/AboutContent";

export default async function About() {
  const { data } = await supabase
    .from("about_data")
    .select("*")
    .single();

  const about = {
    photo_url:
      data?.photo_url ??
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    desc1: data?.description_1 ?? "",
    desc2: data?.description_2 ?? "",
    desc3: data?.description_3 ?? "",
  };

  return <AboutContent />;
}