## Artissimo - A LMS

Artissimo is a custom learning management system built for the University of South Carolina School of Music.

### Tech Stack

- [Next.js](https://nextjs.org/) – Framework
- [TypeScript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Upstash](https://upstash.com)(QStash) - Serverless messaging solution
- [Prisma](https://prisma.io) - ORM [![Made with Prisma](https://made-with.prisma.io/dark.svg)](https://prisma.io)
- [Supabase](https://supabase.co/) – Authentication 

### Getting Started

Run the following command to install project dependencies:

```bash
npm install
```

Next, create a `.env` file in the root directory and add your PostgreSQL instance's connection string:

```
DATABASE_URL=""
```

Next, create a Supabase instance and add the following connection variables to wire up authentication:

```
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
```

These values can be found in the Supabase console. Next, add your QStash secrets to the `.env` file, which can be found in the Upstash console:

```
QSTASH_URL=""
QSTASH_TOKEN=""
QSTASH_CURRENT_SIGNING_KEY=""
QSTASH_NEXT_SIGNING_KEY=""
```

Also, you'll need to add your server's base URL to the `.env` file as well (**without the trailing "/"**):

```
NEXT_PUBLIC_BASE_URL=""
```

Finally, seed an admin user in the database:

```bash
npm run db:seed -- --email "<email>" --name "<name>" --password "<password>"
```

This should only be done once. To create new users, login with the seeded user and create additional users in the UI. After running this step, you'll need to login to your inbox and confirm your email via a link Supabase will send you.

### Running in development

Start the QStash (Upstash) development server:

```bash
npx @upstash/qstash-cli dev
```

Start the Next.js development server:

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
