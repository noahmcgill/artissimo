# Artissimo - A Learning Management System

Artissimo is a book-based learning management system. A closed-source version was  built for and is currently in-use by the University of South Carolina School of Music's Choral Program. This is an open-source rewrite of that version.

## Tech Stack

- [Next.js](https://nextjs.org/) – Framework
- [TypeScript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Upstash](https://upstash.com) (QStash) - Asynchronous Messaging
- [Prisma](https://prisma.io) - ORM [![Made with Prisma](https://made-with.prisma.io/dark.svg)](https://prisma.io)
- [Supabase](https://supabase.co/) – Authentication 

## Getting Started

### Prerequisites

Here's what you need to run Artissimo:

* Node.js (version >= 20.0.0)
* PostgreSQL Database
* Supabase Project (for authentication)
* Upstash Project (for handling long-running processes with QStash)

### Clone the repository

```bash
git clone https://github.com/noahmcgill/artissimo.git
```

### Install dependencies

```bash
npm install
```

### Provide the environment variables

Copy the sample environment variable file to `.env`:

```bash
cp .env.example .env
```

Provide the following environment variables:

* `APP_URL`: Your Next.js server URL
* `DATABASE_URL`: Your PostgreSQL instance connection string
* `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (found in the Supabase dashboard)
* `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project anonymous key (found in the Supabase dashboard)
* `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase project service role key (found in the Supabase dashboard)
* `QSTASH_URL`: Your QStash project URL (found in the Upstash dashboard)
* `QSTASH_TOKEN`: Your QStash project token (found in the Upstash dashboard)
* `QSTASH_CURRENT_SIGNING_KEY`: Your QStash project signing key (found in the Upstash dashboard)
* `QSTASH_NEXT_SIGNING_KEY`: Your QStash project Next.js signing key (found in the Upstash dashboard)

**Note**: While developing locally, you must use QStash's local development server. Start the server with the following command:

```bash
npm run qstash:local
```

The development server logs should then provide you local values for each required environment variable starting with `QSTASH`. These will be different from your production variables found in the Upstash dashboard.

### Start your database

However you choose to do so! I use the PostgreSQL desktop app when developing locally.

### Generate the Prisma client

```bash
npm run db:generate
```

### Seed an admin user in the database

```bash
npm run db:seed -- --email "<email>" --name "<name>" --password "<password>"
```

**Note**: This should only be done once. To create new users, login with the seeded user and create additional users in the UI. After running this step, you'll need to login to your inbox and confirm your email via a link Supabase will send you.

### Run the dev server

```bash
npm run dev
```

### Core Concepts

Artissimo was designed to host learning content in a book-based structure. Below are definitions of some core concepts:

* **Users**: Users of the app, which come in four permission-based flavors: admin, instructor, student, and guest
    * Each user type is associated with a slightly different in-app view
* **Books**: Collections of chapters
* **Chapters**: A knowledge entity containing text, inline reflection questions, and attached media
* **Courses**: Segmented groups of users
    * A course is associated with one book, allowing users of the course to access the chapters within the book

### Data Models

Below is a diagram of the database models (created using [dbdiagram.io](https://dbdiagram.io/)):

![Artissimo data models](./public/data-models.png "Artissimo Data Models")

### Development Roadmap

This project is currently in active development. Please check back later!

#### V0
* Admin & Instructor Views
    * User management
    * Book / Chapter management
    * Course management
    * Role previews
* Student & Guest Views
    * Book / Chapter views

#### V1
* Inline reflection question versioning
* Admin & Instructor Views
    * Reflection question creation
    * Reflection question review and export
* Student & Guest Views
    * Reflection question submission
