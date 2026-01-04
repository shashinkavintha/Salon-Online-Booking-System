import { supabase } from 'boot/supabase'


export function useNotifications() {

    const sendNotification = async (type, bookingData) => {
        try {
            // 1. Prepare Payload
            // We expect bookingData to contain { id, start_time, ... } + joined relations if possible
            // But usually we might need to fetch the details if they are missing

            console.log('Sending Notification:', type, bookingData)

            // Fetch full details if needed (profiles, services) to ensure email has names
            const { data: fullBooking, error: fetchError } = await supabase
                .from('appointments')
                .select(`
          id, start_time, status,
          services(name, price),
          profiles!user_id(full_name, email),
          staff(
             id, 
             user_id
          )
        `)
                .eq('id', bookingData.id)
                .single()

            if (fetchError) {
                console.warn('Could not fetch full booking details for notification:', fetchError)
                return
            }

            // Fetch Staff Email (separate query usually needed as staff -> profile link)
            let staffEmail = null
            let staffName = 'Salon Specialist'

            if (fullBooking.staff?.user_id) {
                const { data: staffProfile } = await supabase
                    .from('profiles')
                    .select('email, full_name')
                    .eq('id', fullBooking.staff.user_id)
                    .single()
                if (staffProfile) {
                    staffEmail = staffProfile.email
                    staffName = staffProfile.full_name
                }
            }

            // 2. Call Edge Function
            const { data, error } = await supabase.functions.invoke('notify', {
                body: {
                    type,
                    booking: {
                        id: fullBooking.id,
                        service_name: fullBooking.services?.name,
                        start_time: fullBooking.start_time,
                        user_name: fullBooking.profiles?.full_name,
                        user_email: fullBooking.profiles?.email,
                        staff_name: staffName,
                        staff_email: staffEmail,
                        status: fullBooking.status,
                        price: fullBooking.services?.price
                    }
                }
            })

            if (error) throw error
            console.log('Notification sent:', data)

        } catch (err) {
            console.error('Failed to send notification:', err)
            // Optional: Don't block UI for notification failure, just log it
        }
    }

    return {
        sendNotification
    }
}
