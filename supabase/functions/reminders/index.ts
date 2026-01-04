import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
    try {
        // 1. Calculate Time Range (Next 1 hour)
        const now = new Date();
        const startRange = new Date(now.getTime() + 55 * 60000); // +55 mins
        const endRange = new Date(now.getTime() + 65 * 60000);   // +65 mins

        // 2. Fetch Appointments
        const { data: appointments, error } = await supabase
            .from("appointments")
            .select(`
        id, start_time, 
        profiles!user_id(full_name, email),
        services(name),
        staff(user_id)
      `)
            .eq("status", "confirmed")
            .gte("start_time", startRange.toISOString())
            .lte("start_time", endRange.toISOString());

        if (error) throw error;
        if (!appointments || appointments.length === 0) {
            return new Response(JSON.stringify({ message: "No reminders to send" }), { headers: { "Content-Type": "application/json" } });
        }

        // 3. Send Emails
        const promises = appointments.map(async (app) => {
            const userEmail = app.profiles.email;
            const userName = app.profiles.full_name;
            const serviceName = app.services.name;
            const time = new Date(app.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            // Send to User
            await resend.emails.send({
                from: "Luxe Salon <onboarding@resend.dev>",
                to: userEmail,
                subject: `Reminder: Appointment for ${serviceName} in 1 Hour`,
                html: `<h1>Upcoming Appointment</h1>
          <p>Hi ${userName},</p>
          <p>This is a friendly reminder that your appointment for <strong>${serviceName}</strong> is coming up at <strong>${time}</strong>.</p>
          <p>Please arrive 5 minutes early.</p>`
            });
        });

        await Promise.all(promises);

        return new Response(JSON.stringify({ processed: appointments.length }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
});
