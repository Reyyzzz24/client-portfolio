import { supabase } from "@/lib/supabase";
import HeroContent from "../components/HeroContent";

export default async function Hero() {
  const { data } = await supabase
    .from("hero_data")
    .select("*")
    .single();

  const hero = {
    title: data?.title ?? "Portfolio Owner",
    subtitle: data?.subtitle ?? "Creative Professional",
    description:
      data?.description ??
      "Building meaningful digital experiences.",
    photo_url:
      data?.photo_url ?? "/images/placeholder.avif",
  };

  const { data: companies } =
    await supabase.from("trusted_companies").select("*");

  return (
    <HeroContent/>
  );
}