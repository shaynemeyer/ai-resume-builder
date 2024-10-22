# AI Resume Builder

A NextJS app that allows the user to build a resume with the help of Generative AI.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Our stack

- [NextJS](https://nextjs.org/)
  - [Dynamic loading](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr) - Loading client side without SSR.

### Styles

- [Shadcn UI](https://ui.shadcn.com/) - Components
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Lucid React](https://lucide.dev/guide/packages/lucide-react) - Iconography

### Content Editor

- [React Quill](https://github.com/zenoamaro/react-quill)

### Database

- [Postgres](<[https](https://www.postgresql.org/)>) - Database
- [Drizzle ORM](https://orm.drizzle.team/docs/get-started/postgresql-new) - ORM

### Authentication

- [Clerk](https://clerk.com/)

### HTML Parsing

- [`html-react-parser`](https://www.npmjs.com/package/html-react-parser)

---

## Issues

- Better state management

- Fix data refresh issue after creating or updating an experience.
- Fix data refresh issue after creating or updating an education.
- Fix data refresh issue after creating or updating an skill.
- Bullet points not rendering as html in preview.
- Fix build errors.
- Refactor forms and make them cleaner.
- Add better schema validation for forms.
- Set Step to 1 when clicking edit form button.
