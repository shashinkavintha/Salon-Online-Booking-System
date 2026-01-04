# Salon Online Booking System - Implementation Roadmap

## ✅ Completed
- [x] **Project Setup**: Quasar with Vite.
- [x] **UI/UX Design**: Luxury Black Theme (Landing, Login, Signup).
- [x] **Authentication**: Supabase Login/Signup integration.
- [x] **User Dashboard**: Overview, Sidebar navigation, Responsive design.
- [x] **Routing**: Protected routes and redirection logic.

## 🚀 Upcoming Tasks

### Phase 1: Database & Backend (Supabase)
- [x] **Database Schema Design**: Define tables for `profiles`, `services`, `appointments`, `staff`.
- [x] **Create Tables**: Execute SQL to create tables in Supabase.
- [x] **Security Policies (RLS)**: Protect data so users only see their own bookings.
- [x] **Seed Data**: Add sample services (Hair cut, Facial, etc.) to the database.

### Phase 2: Booking Functionality (The Core)
- [x] **Booking Wizard UI**: Create a step-by-step booking page (`/book`).
  - [x] Step 1: Select Service.
  - [x] Step 2: Select Date & Time.
  - [x] Step 3: Review & Confirm.
- [x] **Backend Integration**: Save bookings to Supabase.

### Phase 2.5: Advanced Booking Logic (Current)
- [x] **Database Updates**: Staff table, Appointments Link.
- [ ] **Admin Staff Management**: Add/Edit Staff, Assign Services.
- [ ] **Booking Wizard Update**:
  - [ ] Select Provider (Staff).
  - [ ] Real-time Availability Check (No double booking).
  - [ ] 1-Hour lookahead validation.

### Phase 3: Dashboard Integrations & Notifications
- [x] **Update Profile**: Make the "Profile Settings" form operational (save to DB).
- [x] **Real Bookings List**: Fetch and display actual user appointment history in "My Bookings".
- [x] **Dashboard Stats**: Calculate real upcoming/completed counts.
- [x] **Email Notifications System**:
  - [x] Setup `notify` Edge Function (Resend).
  - [x] Setup `reminders` Edge Function.
  - [x] Integrated logic into Booking, Admin, and User Dashboards.
  - [x] **Action Required**: Deploy Functions & Set Secrets (Resend API Key).


### Phase 4: Admin Features (Future)
- [ ] **Admin Panel**: For shop owners to manage bookings.
- [ ] **Manage Services**: Add/Edit/Delete services from UI.

---
**Current Priority**: Phase 1 (Database) -> Phase 2 (Booking Flow)
