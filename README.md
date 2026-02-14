# 🚌 SBMS – Smart Bus Monitoring System

> Digitizing Campus Security & Transport Logistics  
> A MERN Stack-based real-time bus tracking and monitoring system for campus security and transport administration.

---

## 📌 Overview

**SBMS (Smart Bus Monitoring System)** is a full-stack web application designed to replace manual bus entry registers with a centralized digital system.

The platform enables real-time logging of bus arrivals and departures by security guards and provides powerful analytics dashboards for administrators.

SBMS transforms campus transport operations from paper-based logging into a secure, data-driven monitoring system.

---

## ❗ Problem Statement

The traditional manual logbook system creates multiple operational issues:

- ❌ Human errors in handwritten entries  
- ❌ No searchable historical records  
- ❌ No analytics or reporting capability  
- ❌ Time-consuming monthly compilation  
- ❌ No accountability tracking for guards  
- ❌ No automated safety monitoring  

Paper records cannot answer:

- How many total trips occurred today?
- Which bus frequently arrives late?
- What is the peak traffic hour?
- Which guard logged a specific entry?

---

## 💡 Solution

SBMS provides:

- 📡 Real-time digital logging  
- 🔐 Secure authentication for guards  
- 📊 Centralized admin dashboard  
- 📈 Automated reporting & analytics  
- 🚨 Smart alert system for safety monitoring  

It ensures accuracy, accountability, and operational transparency.

---

## 🏗️ Technology Stack

### 🖥️ Frontend
- React.js
- Tailwind CSS

### ⚙️ Backend
- Node.js
- Express.js

### 🗄️ Database
- MongoDB

---

## 🔐 Functional Modules

---

### 🛡️ 1. Security Guard Panel

**Purpose:** Accurate and secure data entry.

#### Features:
- Secure individual login credentials
- Bus number dropdown selection
- Arrival / Departure toggle option
- Automatic system timestamp (non-editable)
- Student occupancy logging
- Recent activity history (last 5 entries)

---

### 📊 2. Admin Dashboard

**Purpose:** Monitoring, management & analytics.

#### Fleet Management
- Add / remove buses
- Define bus capacity
- Update driver information

#### User Management
- Register security guards
- Reset credentials
- Monitor guard activity

#### Live Status Monitoring
- View buses currently on campus
- View buses outside campus

#### Reports & Analytics
- Daily / Weekly / Monthly summaries
- Peak hour traffic visualization
- CSV / Excel export functionality

---

## 🚀 Advanced Features (Power Logic)

### 🚨 Capacity Alert System
If student count exceeds defined bus capacity:
- Entry is automatically flagged
- Admin dashboard highlights overcrowding

---

### ⏰ Late Arrival Detection
If bus arrives after defined threshold time:
- Entry marked as "LATE"
- Automatically recorded in analytics

---

### 🔍 Search & Filter
Admin can filter logs by:
- Bus number
- Guard name
- Date range
- Arrival/Departure type

---

## 🔄 Process Flow

1. Guard logs into SBMS.
2. Bus arrives at gate.
3. Guard selects bus number and logs student count.
4. System auto-generates timestamp.
5. Data stored in MongoDB.
6. Admin dashboard updates instantly.
7. Reports can be exported anytime.

---

## 📁 Project Structure

