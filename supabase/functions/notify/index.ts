import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingData {
    id: number;
    service_name: string;
    start_time: string;
    user_name: string;
    user_email: string;
    staff_name?: string;
    staff_email?: string;
    status: string;
    price: number;
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { type, booking }: { type: string, booking: BookingData } = await req.json();

        // 1. Define Recipients
        // Admin email - You might want to fetch this from DB or Env
        const ADMIN_EMAIL = "shashinkavintha@gmail.com";

        const emailsToSend = [];

        // Email to User
        if (booking.user_email) {
            emailsToSend.push({
                to: booking.user_email,
                subject: getUserSubject(type, booking),
                html: getUserTemplate(type, booking)
            });
        }

        // Email to Staff
        if (booking.staff_email) {
            emailsToSend.push({
                to: booking.staff_email,
                subject: `New Assignment: ${booking.service_name}`,
                html: getStaffTemplate(type, booking)
            });
        }

        // Email to Admin
        emailsToSend.push({
            to: ADMIN_EMAIL,
            subject: `[Admin] Booking ${type}: ${booking.id}`,
            html: getStaffTemplate(type, booking) // Reuse staff template for admin for now
        });

        // 2. Send Emails (Parallel)
        const promises = emailsToSend.map(email =>
            resend.emails.send({
                from: "Luxe Salon <onboarding@resend.dev>", // Default Resend Sender
                to: email.to,
                subject: email.subject,
                html: email.html
            })
        );

        await Promise.all(promises);

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});

function getUserSubject(type: string, b: BookingData) {
    switch (type) {
        case 'created': return `Booking Confirmed: ${b.service_name}`;
        case 'cancelled': return `Booking Cancelled: ${b.service_name}`;
        case 'rescheduled': return `Booking Rescheduled: ${b.service_name}`;
        case 'completed': return `Thank you for visiting Luxe Salon`;
        default: return `Update regarding your appointment`;
    }
}

function getUserTemplate(type: string, b: BookingData) {
    const time = new Date(b.start_time).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });
    const base = `<h1>Hello ${b.user_name},</h1>`;

    if (type === 'created') {
        return `${base}
        <p>Your appointment for <strong>${b.service_name}</strong> has been successfully booked.</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Specialist:</strong> ${b.staff_name || 'Any Available'}</p>
        <p><strong>Price:</strong> LKR ${b.price}</p>
        <br>
        <p>See you soon!</p>`;
    }
    if (type === 'cancelled') {
        return `${base}
        <p>Your appointment for <strong>${b.service_name}</strong> at ${time} has been cancelled.</p>`;
    }
    if (type === 'rescheduled') {
        return `${base}
        <p>Your appointment has been rescheduled.</p>
        <p><strong>New Time:</strong> ${time}</p>`;
    }
    return `${base} <p>Your appointment status has been updated to: ${b.status}</p>`;
}

function getStaffTemplate(type: string, b: BookingData) {
    const time = new Date(b.start_time).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });
    return `<h1>Appointment Update: ${type}</h1>
     <p><strong>Service:</strong> ${b.service_name}</p>
     <p><strong>Customer:</strong> ${b.user_name}</p>
     <p><strong>Time:</strong> ${time}</p>
     <p><strong>Status:</strong> ${b.status}</p>`;
}
