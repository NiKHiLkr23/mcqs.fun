# MCQs.FUN

This project was created using [`next-pxci-starter`](https://github.com/inngest/next-pxci-starter).



Built during [`xata summer hackathon`](https://xata.io/blog/summer-launch-pxci-hackathon)


### **Quick Links**
- [Home Page](https://mcqs.fun)
- [Twitter/X](https://twitter.com/nikhilkr23)


### *Submission Features*
- Authentication (using CLERK)
- Serverless Postgres (using XATA and prisma for orm)
- AI integration (using inggest and openai)
  

### *Local setup*


### Clone on your local machine

To run the project locally  follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/NiKHiLkr23/mcqs.fun
```

2. Navigate to the project directory:

```bash
cd mcqs.fun
```

3. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

4. setting up .env.local:

    - create a new file `.env.local` and copy the contents form `.env.example`
    - get the clerk-key's from https://clerk.com

5. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see mcqs.fun in action. 