# carpal
CarPal is a Laravel-based SaaS platform for Auto Repair Shops, built to manage vehicle check-ins, assessments, service workflows, invoices, billing, M-Pesa payment verification, customer communication, and repair shop operations.


# CarPal

CarPal is a modern SaaS web application designed for Auto Repair Shops to digitize and streamline their daily operations. The platform helps repair shops manage vehicle check-ins, vehicle assessments, service workflows, invoices, customer communication, billing, M-Pesa payment verification, service charge tracking, vehicle history, inventory, technicians, and administrative oversight.

CarPal is developed by Citrus Labs Limited as a business operations platform focused on improving transparency, efficiency, accountability, and financial visibility within auto repair shop workflows.

---

## Project Purpose

Auto Repair Shops often rely on manual processes for vehicle intake, assessments, customer updates, service tracking, invoicing, and payment follow-up. This creates operational gaps, weak documentation, delayed payments, poor customer visibility, and limited business reporting.

CarPal solves this by providing a centralized digital platform where repair shop staff and administrators can manage the full vehicle service lifecycle from check-in to check-out.

---

## Core Objectives

CarPal is designed to:

- Simplify vehicle check-in and check-out workflows.
- Digitize vehicle assessment and repair documentation.
- Streamline invoice creation and billing management.
- Support M-Pesa-based payment verification.
- Improve communication between repair shops and customers.
- Maintain complete vehicle service history.
- Provide role-based access for administrators, staff users, and technicians.
- Improve operational transparency and accountability.
- Support platform revenue through service charge tracking and billing.
- Enable administrators to monitor business activity, users, payments, and compliance.

---

## Main Features

### 1. Vehicle Check-In

CarPal allows repair shop users to register incoming vehicles and capture essential vehicle details, including:

- Vehicle make, model, year, VIN, and license plate number.
- Owner name, phone number, and email address.
- Current mileage.
- Service type requested.
- Vehicle condition notes.
- Previous service records.
- Warranty or supporting documents.
- Vehicle photos.

Users can check in both new and existing vehicles.

---

### 2. Vehicle Assessment

The vehicle assessment module helps repair shops document the condition of a vehicle before repair work begins.

Assessment areas include:

- Audio components.
- Interior components.
- Exterior components.
- Engine components.
- Wheels and spare wheel.
- Additional custom components.
- Uploaded photos as proof.
- Notes on component condition.
- Availability status of each component.

This creates a structured record that protects both the repair shop and the customer.

---

### 3. Repair Order Generation

After a vehicle assessment is completed and approved, CarPal generates a repair order number. The assessment can then be shared with the customer through email or SMS notification, creating a clear service record from the beginning of the repair process.

---

### 4. Service Hub

The Service Hub helps repair shops manage ongoing service operations.

It supports:

- Job scheduling.
- Job tracking.
- Service progress updates.
- Technician assignment.
- Customer communication.
- Repair progress messages.
- Service completion notifications.
- Supporting document uploads.
- Repair image uploads.
- Technician notes.

---

### 5. Billing and Payments

CarPal includes a billing and payments module for managing customer invoices and platform service charges.

Customer billing features include:

- Invoice creation.
- Service item listing.
- Parts and labor billing.
- Automatic service charge calculation.
- Invoice download.
- Invoice emailing.
- Payment reminders.
- Mark-as-paid workflow.
- Receipt generation.
- Payment history.

CarPal billing features include:

- Weekly platform service charge invoices.
- Service charge reconciliation.
- Outstanding balance tracking.
- M-Pesa Paybill payment guidance.
- Payment verification and confirmation.

---

### 6. M-Pesa Payment Verification

CarPal does not directly hold customer funds. Instead, it supports M-Pesa-based payment verification for tracking and confirming payments made by repair shops and customers.

The platform can use invoice numbers as account references to simplify reconciliation and payment tracking.

---

### 7. Vehicle Check-Out

The vehicle check-out workflow allows repair shops to complete the service process formally.

It supports:

- Final vehicle condition review.
- Check-out form completion.
- Post-repair assessment.
- Service summary.
- Final approval.
- Customer notification.
- Vehicle history update.
- Invoice attachment.
- Supporting document attachment.

---

### 8. Vehicle Service History

CarPal maintains a complete service history for every vehicle recorded in the system.

Users can search and view records by:

- License plate number.
- Customer name.
- Service date.
- Service type.
- Repair order number.
- Invoice history.
- Check-in records.
- Check-out records.
- Uploaded documents and photos.

---

### 9. Inventory Management

The inventory module helps repair shops track parts and materials used during service delivery.

It supports:

- Inventory list management.
- Stock levels.
- Usage logging.
- Low-stock alerts.
- Reorder tracking.
- Inventory reports.
- Integration with service records.

---

### 10. Technicians Management

CarPal supports technician management for repair shops.

Features include:

- Technician profiles.
- Technician assignment.
- Service history per technician.
- Performance tracking.
- Schedule management.
- Technician activation and deactivation.

---

### 11. Messaging and Notifications

CarPal supports customer and internal communication through:

- Email notifications.
- SMS notifications.
- Payment reminders.
- Service progress updates.
- Service completion alerts.
- Platform announcements.
- Billing reminders.
- Account status notifications.

---

### 12. User Roles and Access Control

CarPal supports different users within an Auto Repair Shop business account.

Main user types include:

- Administrator
- Staff User
- Technician
- Customer record owner

Customers do not directly access the platform in the MVP workflow. Their service requests, updates, invoices, and payment records are handled by the repair shop staff or administrator on their behalf.

---

### 13. Administrator Oversight

The administrator side of CarPal gives platform administrators visibility and control over the wider CarPal ecosystem.

Administrator functions include:

- Platform monitoring dashboard.
- User management.
- Business account management.
- Payment tracking.
- Revenue tracking.
- M-Pesa verification oversight.
- Automated notifications.
- Audit logs.
- Reports.
- Compliance enforcement.
- Account suspension and reactivation workflows.

---

## Revenue Model

CarPal uses a service charge model.

A service charge is applied to services or invoices created on the platform. These service charges are aggregated weekly for each business account. CarPal then generates a weekly invoice for the accumulated charges.

Businesses settle their CarPal service charge invoices through M-Pesa Paybill, using the invoice number as the account number for easier tracking and reconciliation.

---

## Technical Stack

The planned technical stack for CarPal is:

- **Backend:** Laravel / PHP
- **Frontend:** Vue.js 3
- **Frontend Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MySQL or PostgreSQL
- **Authentication:** Laravel Sanctum
- **API Architecture:** REST API
- **Build Tool:** Vite
- **Payment Verification:** M-Pesa integration
- **Notifications:** Email and SMS
- **Deployment:** Linux server, VPS, or cloud hosting environment

---

## Why No jQuery

CarPal is being developed as a modern SaaS web application. For this reason, the project avoids jQuery and uses modern JavaScript through Vue.js and TypeScript.

jQuery is not suitable for this project because it is harder to maintain in a component-based application, less scalable for modern dashboards, and unnecessary when using Vue, TypeScript, and Laravel.

---

## Project Modules

Planned CarPal modules include:

- Landing Page
- Authentication
- Create Account
- Login
- Dashboard
- Vehicle Check-In
- Vehicle Assessment
- Service Hub
- Billing and Payments
- Vehicle Check-Out
- Vehicle History
- Inventory
- Technicians
- Messaging
- Notifications
- Settings
- Administrator Dashboard
- User Management
- Business Management
- Financial Management
- Security Dashboard
- Support Dashboard
- Activity Logs
- Reports and Analytics

---

## Security Considerations

CarPal should include:

- Secure authentication.
- Password hashing.
- Role-based access control.
- Laravel Sanctum authentication.
- HTTPS enforcement.
- Input validation.
- File upload validation.
- OTP verification for sensitive actions.
- Audit logging.
- Rate limiting.
- Secure session handling.
- Protection against CSRF, XSS, SQL injection, and brute-force attacks.
- Environment variable protection through `.env`.

---

## Environment Configuration

The application should use a `.env` file for sensitive configuration values such as:

- Application key.
- Database credentials.
- Mail credentials.
- SMS provider credentials.
- M-Pesa API credentials.
- Queue connection.
- Cache connection.
- Session driver.
- Application URL.

The `.env` file must never be committed to GitHub.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/ikrome002-design/carpal.git
cd carpal
