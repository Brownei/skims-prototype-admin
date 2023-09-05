# [Skims Prototype Admin](https://skims-admin.vercel.app/)

![](https://github.com/Brownei/skims-prototype-admin/assets/108178828/079a296a-6b3f-472f-ab93-14028a326752)


The Skims Admin Prototype was built to demonstrate how an intuitive admin interface can simplify the process of managing fashion collections. By centralizing the control of collections, styles, categories, and products, it empowers Skims' team to maintain a dynamic and diverse product catalog efficiently.

### Technologies Used:
- Framework: Next.js
- Styling: Tailwind CSS
- User Management: Next-Auth
- ORM: Prisma ORM
- UI Components: shadcn/ui
- File Uploads: uploadthing and Cloudinary
- Payments infrastructure: (Working progress)

### Getting Started
To set up and run the Skims Admin Prototype locally, follow the installation and usage instructions in the project's documentation: 

First, clone the repository into your machine:
```bash
https://github.com/Brownei/skims-prototype-admin.git
```

Second, run the development server:

```bash
npm run dev
```

Third, install Prisma ORM, generate a schema file and generate a PrismaClient for your project: 
```bash
npm install prisma --save-dev (For installation)

npx prisma init (For createing your schema)

npm install @prisma/client (For generating your PrismaClient)
```

Fourth, you must have chosen your database for this project, which you must have had your Database url for the schema to be able to interact with your database. At the top of your schema, you will see this which will help you specify your database to be used and your URL.  
N.B: I made use of MongoDB database.

```bash
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

Copy the .env.example to .env and update the variables.
```bash
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

## Learn More

To learn more about Next.js, Prisma, and Shadcn Ui take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Prisma ORM Documentation](https://www.prisma.io/docs/getting-started) - Learn about Prisma and how to generate schemas and write RESTful API's.
- [Shadcn Ui Documentation](https://ui.shadcn.com/docs) - Learn about Shadcn Ui and its easy way of evolving your frontend skills.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.