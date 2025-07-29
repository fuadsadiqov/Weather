# 🌤️ Weather Forecast App

A responsive weather forecast app built with **Angular**, showing both short-term (24-hour) and long-term (5-day) weather data. The app includes a region selection feature, visual charts, and a clean UI layout for quick insights.

---

## Structures
```bash
src/
├── app/
│   ├── pages/
│   │   ├── home/          
│   │   └── details/      
│   ├── components/       
│   ├── services/         
│   └── models/           
├── assets/            
└── styles/
```
---      

## 📌 Features

- 🌍 **Region Selector** – select regions from either a list or a map
- 🕑 **Current Day Forecast** – shows 24-hour forecast for the selected region
- 📅 **5-Day Forecast** – extended view for upcoming weather conditions
- 🌡️ **Detailed Metrics** – choose to view:
  - Humidity
  - Feels-like Temperature
  - Wind Speed
  - Actual Temperature
- 📊 **Chart.js Integration** – all data is visualized using bar charts for better clarity

---

## 🧱 Pages & Flow

- **Home Page** (Split View – Slice 2 layout):
  - Left side: Region list
  - Right side: Region map
  - Click/select on either → navigates to region details

- **Region Detail Page:**
  - Displays:
    - 📅 5-day weather forecast
    - 🕐 24-hour forecast for the current day
    - 📊 Weather metrics in **bar charts** using Chart.js
  - Metric type (e.g., humidity, temperature) is selectable

---

## 🛠 Tech Stack

- [Angular](https://angular.io/)
- [Chart.js](https://www.chartjs.org/)
- [SCSS](https://sass-lang.com/) for custom styles
- [Angular Router](https://angular.io/guide/router) for navigation
- Responsive layout (Mobile & Desktop)

---

Visit: http://localhost:4200

📄 License
MIT – feel free to use or modify

Made with ☁️ and ☕ by @fuadsadiqov


## 🚀 Getting Started

Clone the repo:

```bash
git clone https://github.com/fuadsadiqov/Weather.git
cd weather-forecast-app

npm install

ng serve
