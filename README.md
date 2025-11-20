# DUTYMATRIX
A comprehensive police duty and shift management system created with **Spring Boot**, **Spring Security (JWT)**, and **MySQL**. This system automates police scheduling, shift assignments, leave requests, and shift swaps to provide fair and transparent duty allocation.

 -------------------------------------------------------------------------

## 📘 Project Overview  
The **Police Duty Scheduling System** is designed to eliminate manual workload and errors in managing police shifts. It automates the allocation of duties, ensures fairness in scheduling, simplifies request processing, and provides transparent communication between officers and admins.

The system provides:
- Admin dashboard to assign shifts and manage station operations  
- Officer portal to view duties, apply for leave, and request shift swaps  
- Secure JWT authentication for all API endpoints  
- Clean modular structure using layered Spring Boot architecture  

-------------------------------------------------------------------------

# 🎯 Features  
### 👮 Officer Features
- View assigned shifts  
- Apply for leave  
- Request shift swaps  
- View leave/swap status  
- Manage personal profile  

### 🛂 Admin Features
- Create and assign shifts  
- Manage police stations  
- Approve/reject leave requests  
- Approve/reject shift swap requests  
- View officers of a station  
- View shift distribution reports  

### 🔐 Security
- JWT-based authentication  
- Role-Based Access Control (Admin/Officer)  
- Secure password hashing  

 -------------------------------------------------------------------------

# 🧩 System Workflow (Explanation)

### 1️⃣ **Login & Authentication**
- User logs in → server validates credentials  
- On success → server generates and returns a **JWT token**  
- All future requests use `Authorization: Bearer <token>`  

### 2️⃣ **Admin Workflow**
1. Admin logs in  
2. Creates stations & registers officers  
3. Creates shifts (date, time, location)  
4. Assigns officers to shifts  
5. Approves/rejects:
   - Leave requests  
   - Shift swap requests  

### 3️⃣ **Officer Workflow**
1. Logs in using credentials  
2. Views daily/weekly shift schedule  
3. Requests:
   - Leave (if unavailable)  
   - Shift swap (with another officer)  
4. Receives approval status from admin  

### 4️⃣ Real-Time Validation
- An officer cannot:
  - Request leave for past dates  
  - Swap with an officer already busy  
  - Apply leave on already approved leave  
- Admin cannot:
  - Assign overlapping shifts  
  - Approve conflicting shift swaps  

This ensures data integrity and real-life accuracy.

 -------------------------------------------------------------------------

# 🛠 Tech Stack

### Backend
- Java 17  
- Spring Boot 3+  
- Spring Security (JWT)  
- Hibernate / JPA  
- MySQL / PostgreSQL  

### Frontend (optional)
- React / Angular  
- HTML, CSS, JavaScript  

### Tools
- IntelliJ IDEA / Eclipse  
- Postman  
- Draw.io (ERD & DFD diagrams)  
- Git & GitHub  

---
