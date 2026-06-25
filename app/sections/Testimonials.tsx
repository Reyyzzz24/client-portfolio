import { supabase } from "@/lib/supabase";
import TestimonialsClient from "../components/TestimonialsClient";

export default async function Testimonials() {
  const { data: testimonials } = await supabase
    .from("testimonials_data")
    .select("*");

  return (
    <section id="testimonials" className="bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">What Clients Say</h2>
        {/* Kirim data ke Client Component */}
        {testimonials && <TestimonialsClient testimonials={testimonials} />}
      </div>
    </section>
  );
}