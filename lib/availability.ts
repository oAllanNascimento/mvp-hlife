import { prisma } from './prisma';

// Define interfaces for our function parameters
interface AvailabilitySlot {
  startTime: string;
  endTime: string;
}

interface AppointmentSlot {
  startTime: string;
  endTime: string;
}

// Helper to convert "HH:MM" time string to minutes since midnight
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper to convert minutes since midnight to "HH:MM" time string
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Type for available time slot
export interface TimeSlot {
  startTime: string;
  endTime: string;
}

// Get the day of week (0-6) for a given date
export const getDayOfWeek = (date: Date): number => {
  return date.getDay();
};

// Get available time slots for a specific schedule and date
export const getAvailableTimeSlots = async (
  scheduleId: string,
  date: Date,
  professionalId?: string
): Promise<TimeSlot[]> => {
  // Get the day of week (0-6) for the given date
  const dayOfWeek = getDayOfWeek(date);

  // Get all availabilities for this schedule on this day of week
  const availabilities = await prisma.availability.findMany({
    where: {
      scheduleId,
      dayOfWeek,
    },
  });

  if (availabilities.length === 0) {
    return []; // No availabilities for this day
  }

  // Get existing appointments for this schedule and date
  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleId,
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
      status: {
        not: 'CANCELLED',
      },
      ...(professionalId ? { professionalId } : {}),
    },
  });

  // Calculate available time slots
  return calculateAvailableSlots(availabilities, appointments);
};

// Calculate available time slots based on availabilities and existing appointments
export const calculateAvailableSlots = (
  availabilities: AvailabilitySlot[],
  appointments: AppointmentSlot[]
): TimeSlot[] => {
  // Convert availabilities to minute ranges
  const availabilityRanges = availabilities.map((a) => ({
    start: timeToMinutes(a.startTime),
    end: timeToMinutes(a.endTime),
  }));

  // Convert appointments to minute ranges
  const appointmentRanges = appointments.map((a) => ({
    start: timeToMinutes(a.startTime),
    end: timeToMinutes(a.endTime),
  }));

  // Sort both arrays
  availabilityRanges.sort((a, b) => a.start - b.start);
  appointmentRanges.sort((a, b) => a.start - b.start);

  // Merge overlapping availability ranges
  const mergedAvailabilities: { start: number; end: number }[] = [];
  
  for (const range of availabilityRanges) {
    if (mergedAvailabilities.length === 0) {
      mergedAvailabilities.push(range);
      continue;
    }

    const lastRange = mergedAvailabilities[mergedAvailabilities.length - 1];
    
    if (range.start <= lastRange.end) {
      // Overlapping or adjacent, merge them
      lastRange.end = Math.max(lastRange.end, range.end);
    } else {
      // Non-overlapping, add a new range
      mergedAvailabilities.push(range);
    }
  }

  // Remove appointment time slots from availabilities
  const availableSlots: TimeSlot[] = [];
  
  for (const avail of mergedAvailabilities) {
    let currentStart = avail.start;
    
    // Sort appointments that overlap with this availability
    const overlappingAppointments = appointmentRanges
      .filter((apt) => apt.end > currentStart && apt.start < avail.end)
      .sort((a, b) => a.start - b.start);
    
    for (const apt of overlappingAppointments) {
      // If there's a gap before this appointment, add it as an available slot
      if (apt.start > currentStart) {
        availableSlots.push({
          startTime: minutesToTime(currentStart),
          endTime: minutesToTime(apt.start),
        });
      }
      
      // Move current start to the end of this appointment
      currentStart = Math.max(currentStart, apt.end);
    }
    
    // Add any remaining time after the last appointment
    if (currentStart < avail.end) {
      availableSlots.push({
        startTime: minutesToTime(currentStart),
        endTime: minutesToTime(avail.end),
      });
    }
  }

  return availableSlots;
}; 