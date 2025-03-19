import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

// Define the UserRole enum to match Prisma schema
enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  PROFESSIONAL = 'PROFESSIONAL'
}

async function main() {
  try {
    console.log('Starting seed...');

    // Create admin user
    const adminPassword = await hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        role: UserRole.ADMIN,
      },
    });
    console.log('Admin user created:', admin.id);

    // Create manager user
    const managerPassword = await hash('manager123', 10);
    const manager = await prisma.user.upsert({
      where: { email: 'manager@example.com' },
      update: {},
      create: {
        name: 'Manager User',
        email: 'manager@example.com',
        password: managerPassword,
        role: UserRole.MANAGER,
      },
    });
    console.log('Manager user created:', manager.id);

    // Create professional user
    const professionalPassword = await hash('professional123', 10);
    const professional = await prisma.user.upsert({
      where: { email: 'professional@example.com' },
      update: {},
      create: {
        name: 'Professional User',
        email: 'professional@example.com',
        password: professionalPassword,
        role: UserRole.PROFESSIONAL,
      },
    });
    console.log('Professional user created:', professional.id);

    // Create a schedule
    const schedule = await prisma.schedule.upsert({
      where: { publicUrl: 'demo-schedule' },
      update: {},
      create: {
        title: 'Demo Schedule',
        description: 'A demo schedule for testing purposes',
        publicUrl: 'demo-schedule',
        managerId: manager.id,
        professionals: {
          connect: { id: professional.id },
        },
      },
    });
    console.log('Schedule created:', schedule.id);

    // Create availabilities for the schedule
    const daysOfWeek = [1, 2, 3, 4, 5]; // Monday to Friday
    const startTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
    const endTimes = ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00'];

    for (const day of daysOfWeek) {
      for (let i = 0; i < startTimes.length; i++) {
        await prisma.availability.upsert({
          where: {
            scheduleId_dayOfWeek_startTime_endTime: {
              scheduleId: schedule.id,
              dayOfWeek: day,
              startTime: startTimes[i],
              endTime: endTimes[i],
            },
          },
          update: {},
          create: {
            scheduleId: schedule.id,
            dayOfWeek: day,
            startTime: startTimes[i],
            endTime: endTimes[i],
          },
        });
      }
    }
    console.log('Availabilities created for schedule:', schedule.id);

    // Create some sample appointments
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const appointments = [
      {
        scheduleId: schedule.id,
        clientName: 'John Doe',
        clientEmail: 'john@example.com',
        date: tomorrow,
        startTime: '09:00',
        endTime: '10:00',
        professionalId: professional.id,
      },
      {
        scheduleId: schedule.id,
        clientName: 'Jane Smith',
        clientEmail: 'jane@example.com',
        date: tomorrow,
        startTime: '14:00',
        endTime: '15:00',
        professionalId: professional.id,
      },
      {
        scheduleId: schedule.id,
        clientName: 'Bob Johnson',
        clientEmail: 'bob@example.com',
        date: nextWeek,
        startTime: '11:00',
        endTime: '12:00',
        professionalId: professional.id,
      },
    ];

    for (const appointment of appointments) {
      await prisma.appointment.create({
        data: appointment,
      });
    }
    console.log('Sample appointments created');

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  }); 