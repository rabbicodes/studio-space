# StudioSpace

**Peer-to-peer creative workspace and production studio sharing platform.**

StudioSpace connects studio owners with filmmakers, photographers, podcasters, musicians and artists. Hosts list their spaces, and creators discover, filter and book them by the hour with transparent pricing.

**Live site:** https://studio-space-orpin.vercel.app/
**Server repository:** https://github.com/rabbicodes/studio-space-server

---

## Key Features

- **Studio discovery:** Browse all studios in a responsive grid and filter by category (Photo Studio, Film Stage, Podcast Lounge, Music Suite, Workshop and more).
- **Dynamic home page:** Hero slider with three slides, six featured studios loaded from MongoDB, category cards, a 4-step "How Booking Works" section and a Host Guarantee section.
- **Authentication:** Email/password registration and login with password validation (uppercase, lowercase, minimum 6 characters), plus Google social login, powered by Better Auth.
- **Full studio CRUD:** Add, view, update and delete your own studio listings, with a confirmation modal before deletion.
- **Booking system:** Reserve a studio slot from the details page, track reservations with status badges (Pending, Confirmed, Completed, Cancelled) and cancel pending bookings.
- **Private routes:** Dashboard pages stay accessible after a page reload for logged-in users.
- **Light and dark theme:** One-click theme toggle across the whole application.
- **Polished UX:** Skeleton loaders, a custom 404 page, friendly empty states and toast notifications for every auth, CRUD and booking action.
- **Fully responsive:** Designed for mobile, tablet and desktop.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling / UI | Tailwind CSS, shadcn/ui (Base UI) |
| Authentication | Better Auth with MongoDB adapter |
| Notifications | Sonner |
| Backend API | Express.js + MongoDB (see server repository) |
| Deployment | Vercel |

## Application Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home page |
| `/studios` | Public | Explore all studios |
| `/studios/[id]` | Public | Studio details and booking |
| `/login`, `/register` | Public | Authentication |
| `/add-studio` | Private | Add a new studio |
| `/my-listings` | Private | Manage your listings |
| `/studios/edit/[id]` | Private | Update a listing |
| `/my-bookings` | Private | View and cancel bookings |

## Examiner Test Credentials

| Role | Email | Password |
|---|---|---|
| Test user | `your-test-email@example.com` | `YourPassword123` |

> Replace the credentials above with a real working account before submitting.

## Local Setup

### Prerequisites

- Node.js 20 or later
- A MongoDB database (local or MongoDB Atlas)
- The [StudioSpace server](https://github.com/rabbicodes/studio-space-server) running locally

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/rabbicodes/studio-space.git
   cd studio-space
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env.local` file** in the project root:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_random_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open** http://localhost:3000 in your browser.

### Production build

```bash
npm run build
npm start
```

## Project Structure

```
studio-space/
├── app/            # Routes, layouts, loading and not-found pages
├── components/     # Reusable UI components
├── lib/            # Auth configuration and helpers
└── public/         # Static assets and banner images
```

## Author

**Rabbi** — [@rabbicodes](https://github.com/rabbicodes)
