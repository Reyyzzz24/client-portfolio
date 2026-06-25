"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, message: "Mohon isi semua kolom!" };
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gherryanwashesyasyagara@gmail.com',
      subject: `Pesan baru dari ${name}`,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan: ${message}`,
    });
    return { success: true, message: "Email berhasil dikirim!" };
  } catch (error) {
    return { success: false, message: "Gagal mengirim email, coba lagi nanti." };
  }
}