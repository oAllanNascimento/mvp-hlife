import { prisma } from './prisma';

async function main() {
  try {
    // Test the database connection
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('Database connection successful:', result);

    // Check if we have any users in the database
    const userCount = await prisma.user.count();
    console.log(`Number of users in the database: ${userCount}`);

    // Check if we have any schedules in the database
    const scheduleCount = await prisma.schedule.count();
    console.log(`Number of schedules in the database: ${scheduleCount}`);

    // Check if we have any appointments in the database
    const appointmentCount = await prisma.appointment.count();
    console.log(`Number of appointments in the database: ${appointmentCount}`);

    console.log('Database test completed successfully');
  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 