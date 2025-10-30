# 🚗 RENTRO Frontend

**MERN Frontend for RENTRO (Car Rental WebApp)** — A feature-rich, responsive React frontend built with **Vite**, **Material UI**, **Tailwind CSS**, **FullCalendar**, **GSAP animations**, **Stripe payments**, and a comprehensive **Admin Panel**.

---

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)
![MUI](https://img.shields.io/badge/Material_UI-6.4.12-007FFF)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8.2-purple)
![License](https://img.shields.io/badge/license-MIT-yellow)

---

## 🧭 Overview

`rentro-frontend` is the **React + Vite + Tailwind + MUI** frontend for **RENTRO**, a modern car rental platform.  
It delivers a **smooth, animated, and accessible** user experience with:

- User & Admin authentication  
- Advanced car browsing with **filters, search, and calendar availability**  
- **FullCalendar** for date selection & booking visualization  
- **GSAP & Framer Motion** for smooth animations  
- **Stripe Checkout** with secure payments  
- **React Hook Form** + **Zod** validation  
- **Redux Toolkit** for global state (auth, bookings, cars)  
- **React Router v7** with protected routes  
- **Print-ready invoices** using `react-to-print`  
- **QR Code** generation for booking confirmation  
- **Lottie animations** via `@lottiefiles/dotlottie-react`  
- **Responsive design** with **Tailwind CSS + MUI**

---

## 🌐 Live Demo

> **Frontend:** [Check Now](https://rentro.netlify.app) Currently Unavailable   
> **Backend Code:** [Check Now](https://github.com/riteshcgiri/rentro-backend)

---

## 🧱 Tech Stack & Libraries

| Category | Technology Used |
|-----------|-----------------|
| **Framework** | React 18 + Vite |
| **UI Framework** | [Material UI (MUI) v6](https://mui.com) + [Tailwind CSS](https://tailwindcss.com) |
| **State Management** | Redux Toolkit + RTK Query |
| **Routing** | React Router DOM v7 |
| **Forms** | React Hook Form + Zod |
| **Date Picker** | @mui/x-date-pickers, react-datepicker, react-day-picker |
| **Calendar** | FullCalendar (daygrid, timegrid, interaction) |
| **Animations** | GSAP, Framer Motion, Lottie (dotlottie-react) |
| **Icons** | Lucide React, React Icons |
| **HTTP Client** | Axios |
| **Payments** | Stripe (via backend) |
| **Print** | react-to-print |
| **QR Code** | react-qr-code |
| **Styling** | Tailwind CSS + tailwind-clip-path |
| **React Hook Form** | react-hook-form|

---

## 📂 Project Structure

```
rentro-frontend/
├── public/
│   └── lotties/              # Lottie animation files
├── src/
│   ├── components/           # Reusable UI components
│   ├── features/             # Redux slices (auth, cars, bookings)
│   ├── pages/                # Route pages
│   ├── services/             # Axios API instances
│   ├── store/                # Redux store
│   ├── utils/                # Helpers (formatDate, generateQR)
│   ├── App.jsx
│   └── main.jsx
├── .env
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## ⚙️ Features

| Feature | Status | Library Used |
|----------|--------|--------------|
| Responsive Layout | ✅ | Tailwind + MUI |
| User Login / Register | ✅ | MUI + React Hook Form |
| Browse & Filter Cars | ✅ | MUI Select, Tailwind |
| FullCalendar Availability View | ✅ | @fullcalendar/* |
| Date Picker (Multiple Options) | ✅ | react-datepicker, dayjs |
| Booking Flow with Calendar | ✅ | FullCalendar + Redux |
| Stripe Payment Integration | ✅ | Backend redirect |
| Booking Confirmation with QR | ✅ | react-qr-code |
| Print Invoice / Receipt | ✅ | react-to-print |
| GSAP Page Transitions | ✅ | GSAP + Framer Motion |
| Lottie Animations | ✅ | dotlottie-react |
| Admin Panel (CRUD) | ✅ | MUI DataGrid / Tables |
| Protected Routes | ✅ | React Router + Redux |
| Toast Notifications | ✅ | MUI Snackbar / Custom |

---

## 🚀 Getting Started

### 🧩 Prerequisites

- Node.js `v18+`
- Backend running at `http://localhost:3000`

---

### ⚙️ Installation

#### 1. Clone the repo

```bash
git clone https://github.com/riteshcgiri/rentro.git
cd rentro
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Create `.env` file

```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx
```

Use your live backend URL in production.

#### 4. Run in development

```bash
npm run dev
```
Visit → [http://localhost:5173](http://localhost:5173)

#### 5. Build for Production

```bash
npm run build
```

Deploy the **`dist/`** folder to Netlify, Vercel, or Render.

---

## 📜 Key Pages & Routes

| Route | Description |
|--------|-------------|
| `/` | Home with hero & featured cars |
| `/cars` | All cars with filters |
| `/cars/:id` | Car details + FullCalendar booking |
| `/booking/:id` | Booking summary + payment |
| `/dashboard` | User bookings & profile |
| `/admin` | Admin dashboard |
| `/admin/cars` | Manage cars |
| `/admin/bookings` | View & update bookings |

---

## 🔐 Admin Login (Demo)

```json
{
  "email": "admin@rentro.com",
  "password": "admin123"
}
```

---

## 🌍 API Integration

All requests use a centralized Axios instance:

```ts
axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})
```

---

## 🖼️ Screenshots (Add later)

![Home](public/screenshots/home.jpg)
![Calendar Booking](public/screenshots/calendar.jpg)
![Admin Panel](public/screenshots/admin.jpg)

---

## ☁️ Deployment

**Netlify / Vercel / Render Steps:**  
1. Push repo to GitHub  
2. Connect repo in hosting platform  
3. Add environment variables:  
   - `VITE_API_BASE_URL`
   - `VITE_STRIPE_PUBLISHABLE_KEY`  
4. Deploy 🚀

---

## 🧩 Backend Repository

🔗 [rentro-backend](https://github.com/riteshcgiri/rentro-backend)

---

## 🧠 Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

---

## 🤝 Contributing

1. Fork the repo  
2. Create a branch: `feature/awesome-feature`  
3. Commit your changes  
4. Push and open a PR  

---

## 📄 License

**MIT License** — Feel free to use and modify.

---

## 👨‍💻 Author

**Ritesh Giri**  
[GitHub](https://github.com/riteshcgiri) | [LinkedIn](https://linkedin.com/in/riteshcgiri)

---

⭐ **Show Support**  
Give a star ⭐ if you like this project!

---

**RENTRO — Rent Smart. Drive Easy. Book Fast.**  

🛠️ *Built with React, MUI, Tailwind, GSAP, and lots of ☕*
