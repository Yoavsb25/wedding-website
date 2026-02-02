# Wedding Website – Product Requirements Document (PRD)
**Tech Stack: React + Static Hosting (GitHub Pages)**

---

## 1. Product Overview

### 1.1 Product Name
Wedding Website & RSVP System (TBD)

### 1.2 Product Description
A single-page wedding website built with **React** that provides guests with all essential wedding information and allows them to confirm attendance (RSVP).  
The website is static, elegant, and mobile-first, and integrates with **Google Forms** for RSVP submission and **Google Sheets** as the admin dashboard.

### 1.3 Target Users
- **Primary users:** Wedding guests (friends and family)
- **Secondary users:** The couple (administrators)

---

## 2. Goals & Objectives

### 2.1 Guest Goals
- Clearly understand when and where the wedding takes place
- View the wedding schedule at a glance
- Confirm attendance quickly and effortlessly

### 2.2 Admin Goals
- Track RSVP submissions in real time
- Know total confirmed guest count
- Manually manage RSVP data if needed

### 2.3 Product Goals
- Reduce guest confusion and follow-up questions
- Provide a premium, modern, and elegant experience
- Ensure high RSVP completion rate

---

## 3. Scope

### 3.1 In Scope
- Single-page React application (SPA-style, static output)
- Wedding schedule
- Venue and address information
- Parking information
- RSVP via Google Forms
- Admin dashboard via Google Sheets
- Responsive design (mobile & desktop)
- English-only content
- Animations and transitions for enhanced UX

### 3.2 Out of Scope
- Additional wedding events
- Multi-language support
- Guest authentication or accounts
- Email/SMS notifications
- Gift payments or integrations
- Custom backend services

---

## 4. Platform & Architecture

### 4.1 Frontend
- **Framework:** React
- **Hosting:** GitHub Pages
- **Build:** Static build (e.g., Vite / CRA – exact tool TBD)

### 4.2 Data Handling
- RSVP submissions via Google Forms
- RSVP data stored and managed in Google Sheets
- Google Sheets serves as the admin dashboard

### 4.3 Architecture Principles
- Fully static frontend
- No server-side rendering
- No backend state
- External services for data persistence

---

## 5. Content & Tone

### 5.1 Language
- English only

### 5.2 Tone of Voice
- Formal but friendly
- First-person plural (“We”)

---

## 6. Design Requirements

### 6.1 Visual Style
- Clean
- Modern
- Luxurious
- Minimal but expressive

### 6.2 Layout
- Single long scrolling page
- Clear vertical section flow
- Generous whitespace
- Strong visual hierarchy

### 6.3 Imagery
- One illustrated image of the couple:
  - White background
  - Couple embracing
  - Bride in a wedding dress
  - Groom in a blue suit
- Used as a central visual element (hero section)

### 6.4 Responsiveness
- Mobile-first
- Adaptive spacing and typography
- Touch-friendly interactions

---

## 7. Animations & Transitions (Detailed)

### 7.1 Global Animation Principles
- Subtle, elegant, non-distracting
- No “flashy” or playful animations
- Consistent easing and timing across the site

**Recommended easing:** `ease-out` or `cubic-bezier(0.4, 0, 0.2, 1)`  
**Recommended duration:** 200–500ms

---

### 7.2 Page Load Animation
- Initial page load:
  - Fade-in of the entire page (`opacity: 0 → 1`)
  - Optional slight upward motion (`translateY(8px → 0)`)

Purpose: create a calm, premium first impression.

---

### 7.3 Section Entrance Animations (Scroll-based)

Each major section animates **once** when entering the viewport:

- Animation:
  - Fade in
  - Slight vertical movement
- Example:
  - `opacity: 0 → 1`
  - `transform: translateY(16px → 0)`

Sections:
- Hero / Welcome
- Schedule
- Location
- Parking
- RSVP

Trigger:
- Intersection Observer or equivalent React logic

---

### 7.4 Hero Section Animation
- Illustrated image:
  - Soft fade-in
  - Optional scale-in (`scale: 0.98 → 1`)
- Text:
  - Appears slightly after image (staggered by ~100ms)

---

### 7.5 Hover & Micro-Interactions

#### Buttons (e.g., RSVP CTA)
- Hover:
  - Background color transition
  - Slight elevation (`box-shadow`)
  - Optional scale (`scale: 1 → 1.02`)
- Active (click):
  - Brief scale-down (`scale: 1 → 0.98`)

#### Links
- Smooth color transition on hover
- No underline animations unless minimal

---

### 7.6 RSVP Section Interaction
- When embedded Google Form loads:
  - Fade-in placeholder
  - Replace with iframe smoothly
- Confirmation (Google Form default):
  - Handled by Google
  - No custom animation required

---

### 7.7 Reduced Motion Support
- Respect `prefers-reduced-motion`
- Disable transforms and animations when enabled
- Keep content fully accessible

---

## 8. Functional Requirements

### 8.1 Public Website Sections

#### 8.1.1 Hero / Welcome Section
- Introductory text in “We” form
- Illustrated couple image
- Elegant entrance animation

#### 8.1.2 Wedding Schedule Section
Timeline display:

- **17:00** – Wedding Reception  
- **18:30** – Wedding Ceremony  
- **19:10** – Dinner  

Each timeline item:
- Appears with subtle stagger animation

---

#### 8.1.3 Location & Venue Section
- Venue: **R48 Hotel**
- Address: **48 Rothschild Boulevard, Tel Aviv**
- Optional Google Maps link (TBD)

---

#### 8.1.4 Parking Information Section
- Clear written parking instructions
- No assumptions on parking type
- Content TBD

---

#### 8.1.5 RSVP Section
- Clear call-to-action
- Google Form:
  - Embedded or external link (TBD)
- Visual emphasis without being aggressive

---

### 8.2 RSVP Form Requirements (Google Form)

#### Fields
- First Name (required)
- Last Name (required)
- Number of Guests (required, numeric)

#### Behavior
- Fast submission flow
- Confirmation message after submit
- RSVP deadline TBD
- Edit/resubmit behavior TBD

---

## 9. Admin Dashboard (Google Sheets)

### 9.1 Access
- Admin-only access via Google permissions
- Shared between both partners

### 9.2 Data
- Timestamp
- First Name
- Last Name
- Number of Guests

### 9.3 Metrics
- Total RSVPs
- Total confirmed guests (sum)

### 9.4 Management
- Manual edits allowed
- Sorting and filtering
- Export to CSV / Excel

---

## 10. Non-Functional Requirements

- Fast load time on mobile networks
- Smooth animations without jank
- High contrast and readability
- Secure handling of RSVP data via Google services
- Easy redeploy to GitHub Pages

---

## 11. Open Items / TBDs

- RSVP deadline
- Embedded vs external Google Form
- Parking content
- Google Maps link inclusion
- Confirmation message wording
- Final animation intensity (very subtle vs subtle)

---

## 12. Success Criteria

- Guests understand all details without external clarification
- High RSVP completion rate
- Accurate guest count available at all times
- Website feels premium, calm, and elegant
- Animations enhance experience without distraction
