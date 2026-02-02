# Wedding Website – Product Requirements Document (PRD)

## 1. Product Overview

### 1.1 Product Name
Wedding Website & RSVP System (TBD)

### 1.2 Product Description
A single-page wedding website that provides guests with all essential wedding information and allows them to confirm attendance (RSVP).  
The website is designed to be elegant, clear, and mobile-friendly, and includes an external RSVP system powered by Google Forms and Google Sheets, which serves as the admin dashboard for the couple.

### 1.3 Target Users
- **Primary users:** Wedding guests (friends and family)
- **Secondary users:** The couple (administrators)

---

## 2. Goals & Objectives

### 2.1 Guest Goals
- Quickly understand when and where the wedding takes place
- View the full wedding schedule
- Easily confirm attendance from any device

### 2.2 Admin Goals
- Track who has confirmed attendance
- Know the total number of attending guests
- Manage RSVP data in a simple and reliable way

### 2.3 Product Goals
- Reduce guest questions outside the website
- Ensure accurate guest count before the wedding
- Provide a smooth, professional experience that reflects the tone of the event

---

## 3. Scope

### 3.1 In Scope
- One-page static wedding website
- Wedding schedule
- Venue and address information
- Parking information
- RSVP functionality via Google Forms
- Admin dashboard via Google Sheets
- Fully responsive design (mobile and desktop)
- English-only content

### 3.2 Out of Scope
- Additional wedding-related events
- Multi-language support
- User accounts for guests
- Email or SMS notifications
- Gift payments or integrations
- Custom backend or database

---

## 4. Platform & Architecture

### 4.1 Hosting
- Frontend hosted on **GitHub Pages**
- Static website

### 4.2 Backend / Data Handling
- RSVP submissions handled by **Google Forms**
- RSVP data stored and managed in **Google Sheets**
- Google Sheets serves as the admin dashboard

### 4.3 Rationale
- High reliability
- Minimal maintenance
- No server or authentication complexity
- Easy collaboration between admins

---

## 5. Content & Tone

### 5.1 Language
- English only

### 5.2 Tone of Voice
- Formal but friendly
- Written in first-person plural (“We”)

---

## 6. Design Requirements

### 6.1 Visual Style
- Clean
- Modern
- Luxurious

### 6.2 Layout
- Single long scrolling page (one-pager)
- Clear visual separation between sections
- Easy navigation via scrolling

### 6.3 Imagery
- One illustrated image of the couple  
- Image characteristics:
  - White background
  - Couple embracing
  - Bride in a wedding dress
  - Groom in a blue suit

### 6.4 Responsiveness
- Mobile-first design
- Fully functional and visually consistent on:
  - Smartphones
  - Tablets
  - Desktop screens

---

## 7. Functional Requirements

### 7.1 Public Website Sections

#### 7.1.1 Welcome / Hero Section
- Introductory text written in “We” form
- Display of the illustrated couple image

#### 7.1.2 Wedding Schedule Section
A clearly structured timeline showing:

- **17:00** – Wedding Reception  
- **18:30** – Wedding Ceremony  
- **19:10** – Dinner  

#### 7.1.3 Location & Venue Section
- Venue name: **R48 Hotel**
- Address: **48 Rothschild Boulevard, Tel Aviv**
- Clear indication that the wedding takes place at a hotel
- Optional link to Google Maps (TBD)

#### 7.1.4 Parking Information Section
- Information about nearby parking options
- Presented as clear, easy-to-read text
- Exact parking details TBD

#### 7.1.5 RSVP Section
- Call-to-action encouraging guests to confirm attendance
- RSVP handled via Google Form:
  - Embedded in the page or linked externally (TBD)

---

### 7.2 RSVP Form Requirements

#### Fields
- First Name (required)
- Last Name (required)
- Number of Guests (required, numeric)

#### Behavior
- Simple and fast submission flow
- Confirmation message displayed after submission
- RSVP deadline TBD
- Ability to edit or resubmit RSVP TBD

---

## 8. Admin Dashboard Requirements (Google Sheets)

### 8.1 Access
- Admin-only access via Google account permissions
- Accessible to both partners

### 8.2 Data Visibility
- Table of all RSVP submissions
- Columns include:
  - Timestamp
  - First Name
  - Last Name
  - Number of Guests

### 8.3 Metrics
- Total number of RSVPs
- Total number of guests attending (sum of guest count)

### 8.4 Data Management
- Ability to manually edit or add rows (e.g., RSVP received outside the website)
- Ability to sort and filter by name
- Ability to export data (CSV / Excel)

---

## 9. Non-Functional Requirements

- Fast loading performance
- High reliability and uptime
- Clear readability and contrast
- Secure handling of guest data via Google services
- Easy to update content before the event

---

## 10. Open Items / TBDs

- RSVP deadline
- Ability for guests to update an existing RSVP
- Embedded vs external Google Form
- Exact parking information
- Google Maps link inclusion
- Final wording of RSVP confirmation message
- Use of animations (none vs subtle)

---

## 11. Success Criteria

- Guests can find all necessary information without external clarification
- RSVP data is accurate and complete
- Admins can easily track attendance at any time
- The website reflects a premium, elegant wedding experience
