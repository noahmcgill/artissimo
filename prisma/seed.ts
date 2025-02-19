/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaClient, UserRole } from "@prisma/client";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import process from "process";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: "../.env" });

interface Args {
    name: string;
    email: string;
    password: string;
}

const argv = yargs(hideBin(process.argv))
    .option("email", {
        alias: "e",
        describe: "Admin email",
        type: "string",
        demandOption: true,
    })
    .option("name", {
        alias: "n",
        describe: "Admin name",
        type: "string",
        demandOption: true,
    })
    .option("password", {
        alias: "p",
        describe: "Admin password",
        type: "string",
        demandOption: true,
    })
    .help()
    .parseSync() as unknown as Args;

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const prisma = new PrismaClient();
async function main() {
    // Database should only be seeded once
    const count = await prisma.user.count();
    if (count > 0) {
        throw new Error(
            "Database already seeded. To create a new user, login with the seeded user and create an account through the UI",
        );
    }

    // Create the user in Supabase auth
    const { data, error } = await supabase.auth.signUp({
        email: argv.email,
        password: argv.password,
    });

    if (error) {
        throw new Error(error.message);
    }

    // Add the user object to our database using the created auth sub
    const user = await prisma.user.create({
        data: {
            id: data.user?.id,
            email: argv.email,
            name: argv.name,
            role: UserRole.ADMIN,
        },
    });
    console.log({ user });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
