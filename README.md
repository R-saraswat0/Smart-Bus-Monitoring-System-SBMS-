# Smart-Bus-Monitoring-System-SBMS-
Project Title: Smart Campus Transit System (SCTS)
Tagline: Digitizing Campus Security & Transport Logistics

1. Abstract
The "Smart Campus Transit System" is a web-based application designed to modernize the tracking of college buses. Currently, the reliance on manual logbooks leads to data redundancy, calculation errors, and a lack of actionable insights. This project aims to replace physical registers with a digital interface, enabling real-time data entry by security personnel and centralized analytics for administration.

2. Problem Statement (The "Why")
The current manual system employed at the campus main gate faces the following critical challenges:

Data Redundancy & Inaccuracy: Handwritten entries are prone to human error (wrong time, incorrect bus numbers).

Lack of Analytics: Data stored in paper registers cannot be queried. Administrators cannot easily calculate "Total Trips per Day" or "Average Student Footfall."

Time-Consuming Reporting: Generating a monthly report requires hours of manual compilation.

Security Gaps: There is no instant verification of which guard was on duty during a specific entry.

3. Proposed Solution
We propose a MERN Stack (MongoDB, Express, React, Node.js) web application that serves two distinct user groups: Security Guards (Data Entry) and Administrators (Data Analysis).

Key Objectives:
Digitize Entry/Exit: Eliminate paper logs completely.

Real-Time Database: Instant updates to the central server upon bus arrival/departure.

Automated Reporting: One-click generation of daily, weekly, and monthly transit reports.


Shutterstock
Explore
4. System Architecture & Technology Stack
Frontend (User Interface):

React.js: For a dynamic, single-page application experience.

Tailwind CSS (Suggested): For a responsive design that works on the Guard’s mobile or tablet.

Backend (Server Logic):

Node.js & Express.js: To handle API requests and routing.

Database (Storage):

MongoDB: To store unstructured data like daily logs and bus details efficiently.

5. Functional Modules (Detailed Features)
A. Security Guard Panel (The "Entry" Point)
Secure Authentication: Individual login credentials for every guard to ensure accountability (auditable logs).

Quick-Select Interface:

Bus Number: Dropdown menu (prevents typing errors).

Direction: Toggle between "Arrival" (Campus Entry) or "Departure" (Campus Exit).

Time-Stamping: Automatic fetching of current system time (non-editable) to prevent data manipulation.

Occupancy Logging: Numeric input for "Student Count."

History View: A "Recent Activity" list showing the last 5 entries logged by that specific guard.

B. Admin Dashboard (The "Control" Center)
Fleet Management: Add/Remove buses and update details (e.g., Bus Capacity, Driver Name).

User Management: Register new security guards and reset passwords.

Live Traffic View: A dashboard showing which buses are currently inside the campus and which are out.

Analytics & Reporting:

Visual Graphs: Bar charts showing peak arrival times.

Export Data: Download logs in CSV/Excel format for official record-keeping.

6. Suggested "Power Features" (To Impress Evaluators)
Add these to your "Proposed Features" section to show you have thought deeply about the problem.

Capacity Alert System:

Logic: If the "Student Count" entered by the guard exceeds the "Bus Capacity" (defined in the database), the system highlights the entry in Red and flags it for the Admin.

Why: Helps identify overcrowding safety issues.

Late Arrival Flagging:

Logic: If a bus arrives after a set time (e.g., 9:15 AM), the entry is marked as "LATE" in the database automatically.

Why: Automates punctuality monitoring.

Search & Filter:

Feature: Admin can filter logs by "Bus Number," "Date Range," or "Specific Guard Name."

7. Process Flow
Login: Security Guard logs into the web portal via a tablet/PC at the gate.

Arrival Event: Bus 24 arrives. Guard selects "Bus 24", enters "45 students", and clicks "Log Arrival."

Data Processing: Backend saves the entry with a timestamp and the Guard's ID.

Admin View: The Admin dashboard updates instantly, showing Bus 24 is now "On Campus."

Reporting: At month-end, Admin clicks "Export February Report" to get an Excel sheet of all trips.

8. Future Scope (Roadmap)
QR Code Integration: Pasting QR codes on buses so guards can scan them instead of selecting from a dropdown.

GPS Integration: Real-time live tracking of the bus location on a map.

Parent/Student App: A separate view for students to see if their bus has arrived.
