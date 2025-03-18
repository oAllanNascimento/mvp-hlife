This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# HLife MVP

A system for managing schedules and appointments with a focus on three core functionalities:
1. Creation of schedules by administrators
2. Viewing of appointments by managers and professionals
3. Booking via public URL by clients

## Setup Instructions

### Database Setup

1. Create a Supabase account if you don't have one: [https://supabase.com/](https://supabase.com/)
2. Create a new project in Supabase
3. Get your database connection information from the Supabase dashboard:
   - Go to Project Settings -> Database
   - Find the connection string under "Connection Pooling"
   - It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
4. Update the `.env` file with your Supabase connection details:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
   ```
5. Run the database migrations:
   ```
   npx prisma migrate dev
   ```
6. Seed the database with initial data:
   ```
   npm run db:seed
   ```

### Running the Application

1. Install dependencies:
   ```
   npm install
   ```
2. Run the development server:
   ```
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- User roles: Admin, Manager, Professional
- Schedule creation and management
- Appointment booking via public URLs
- Availability management
- Appointment status tracking

## Default Users (after seeding)

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | Admin |
| manager@example.com | manager123 | Manager |
| professional@example.com | professional123 | Professional |

## Technologies

- Next.js
- Prisma ORM
- PostgreSQL (via Supabase)
- Tailwind CSS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
