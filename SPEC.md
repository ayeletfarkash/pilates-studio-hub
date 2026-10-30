# Pilates Studio Hub — Product & Technical Specification

**Version:** 1.0  
**Project type:** Responsive web application  
**Target users:** Pilates studio administrators, instructors, and members  
**Development approach:** MVP-first, incremental implementation with Claude Code

---

## 1. Project Overview

### 1.1 Product vision

Build a web application for managing a medium-sized Pilates studio that offers Reformer and Mat classes.

The application will provide a unified platform with role-specific interfaces:

- **Studio Admin:** Manage classes, instructors, members, memberships, bookings, attendance, and business insights.
- **Instructor:** View assigned classes and manage attendance for those classes.
- **Member:** Browse the schedule, book and cancel classes, and track membership status and remaining credits.

The product's main differentiator is its **business insights dashboard**, which helps the studio understand class occupancy, member activity, and underperforming time slots.

### 1.2 Product goals

1. Reduce manual administrative work.
2. Simplify class booking for members.
3. Prevent booking errors and incorrect credit balances.
4. Provide clear visibility into class occupancy and attendance.
5. Help studio management make data-driven scheduling decisions.

### 1.3 MVP success criteria

The MVP is successful when:

- An administrator can create and manage classes.
- Members can view available classes and book or cancel them.
- The system enforces capacity, membership, credit, and cancellation rules.
- Instructors can record attendance for assigned classes.
- Members can view their upcoming bookings and membership balances.
- Administrators can view accurate, data-backed insights.
- Unauthorized users cannot access or modify other users' data.
- The application works on desktop and mobile browsers.

---

## 2. Scope

### 2.1 Included in the MVP

- Authentication and role-based access.
- Admin, instructor, and member interfaces.
- Class schedule and class management.
- Class booking and cancellation.
- Membership plans and member subscriptions.
- Credit balance management and transaction history.
- Attendance tracking.
- In-app notifications for relevant booking events.
- Business insights and basic reporting.
- Responsive design.
- Database persistence and access control.
- Basic automated tests for critical business logic.

### 2.2 Explicitly excluded from the MVP

Do not implement these features unless requested in a later phase:

- Real payment processing.
- Automated invoicing or tax receipts.
- WhatsApp, SMS, or push notification integrations.
- Automated waitlists.
- Native iOS or Android applications.
- Multi-branch studio management.
- Advanced AI predictions or recommendations.
- External accounting integrations.
- Complex promotions, discount codes, or referral programs.

Keep the architecture extensible, but do not build infrastructure for excluded features prematurely.

---

## 3. Technology Stack

Use the following stack unless the existing repository has a strong technical reason to retain a different setup.

### Frontend

- Next.js with App Router.
- TypeScript with strict type checking.
- React.
- Tailwind CSS.
- shadcn/ui for reusable interface components where appropriate.
- Lucide icons.

### Backend and database

- Supabase Auth for authentication.
- Supabase PostgreSQL for persistent data.
- Supabase Row Level Security (RLS) for database access control.
- Server-side functions or PostgreSQL functions for critical transactional operations.

### Development tools

- Git and GitHub for version control.
- ESLint and the project's formatter for code quality.
- A testing framework compatible with the selected setup, such as Vitest, plus integration tests for critical database operations where practical.

### Architecture requirements

- Use clear separation between UI components, business logic, and data access.
- Keep TypeScript types consistent with the database schema.
- Use environment variables for credentials and configuration.
- Never expose Supabase service-role credentials in client-side code.
- Never rely on hiding a UI element as the only authorization mechanism.
- Enforce permissions and critical business rules on the server or database.
- Use database migrations for schema changes.
- Do not use local storage as the primary source of truth for bookings, memberships, or credits.

---

## 4. User Roles and Permissions

### 4.1 Administrator

An administrator can:

- View the overall studio dashboard.
- Create, edit, cancel, and complete classes.
- Manage instructors.
- Manage members and their accounts.
- Create and edit membership plans.
- Assign memberships to members.
- Adjust credits with a mandatory reason and transaction record.
- View all bookings and attendance records.
- Record or correct attendance.
- View studio-wide insights and reports.
- Configure cancellation policies and occupancy thresholds.
- View in-app notifications relevant to administration.

### 4.2 Instructor

An instructor can:

- View their assigned classes.
- View class details, capacity, and booking lists for their classes.
- Mark members as present or absent.
- View relevant class attendance information.

An instructor cannot:

- Modify membership plans or member credits.
- Manage other instructors.
- Access studio-wide financial or administrative settings.
- Modify classes assigned to other instructors unless explicitly granted permission.

### 4.3 Member

A member can:

- View the class schedule.
- Filter classes by date, type, instructor, and availability.
- View class details and remaining capacity.
- Book an eligible class.
- Cancel their own booking according to studio policy.
- View upcoming and past bookings.
- View active membership details and remaining credits.
- View their own relevant in-app notifications.

A member cannot:

- Access another member's personal information or bookings.
- Change their own credit balance or membership status.
- Modify classes or attendance records.
- Access administrative reports.

---

## 5. Main Application Screens

### 5.1 Authentication

Provide:

- Sign-in screen.
- Sign-out functionality.
- Appropriate error messages.
- Session persistence.
- Protected routes.
- Role-based redirection after login.

Account creation and role assignment must be secure. Public registration must never allow users to assign themselves the administrator role.

For the MVP, an administrator can provision initial users through a secure setup process. Additional member registration can be implemented through a controlled signup flow.

### 5.2 Admin Dashboard

Display a summary of current studio activity:

- Classes scheduled for today.
- Number of bookings today.
- Overall occupancy for upcoming classes.
- Classes with low occupancy.
- Recent cancellations.
- Relevant alerts requiring administrative attention.

Include clear navigation to:

- Schedule.
- Members.
- Memberships.
- Attendance.
- Insights.
- Settings.

Dashboard metrics must come from persisted data, not hardcoded values.

### 5.3 Class Schedule

Provide a calendar or schedule view with:

- Daily and weekly views.
- Class start and end times.
- Class type: Reformer or Mat.
- Instructor.
- Booking count and maximum capacity.
- Class status.
- Visual indication of low occupancy or full classes.

Filters:

- Date range.
- Class type.
- Instructor.
- Availability.
- Status.

Selecting a class opens its details.

### 5.4 Class Management

Administrators can create and edit classes using a form with:

- Class title.
- Class type.
- Instructor.
- Start time.
- End time.
- Maximum capacity.
- Optional description.
- Status.

Validation requirements:

- End time must be after start time.
- Capacity must be a positive integer.
- A class cannot be scheduled in the past when creating a new session.
- The instructor must exist and be eligible to teach the class.
- Prevent overlapping classes for the same instructor.
- Prevent overlapping classes for the same physical resource where resource scheduling is configured.
- Editing a class must not silently invalidate existing bookings.

When an administrator cancels a class:

1. Mark the class as cancelled rather than deleting it.
2. Notify affected members in the application.
3. Cancel affected bookings.
4. Restore any credits consumed by those bookings according to the studio policy.
5. Record credit adjustments in the transaction history.
6. Prevent new bookings for the cancelled class.

### 5.5 Member Management

Administrators can:

- Search and filter members.
- View member profiles.
- View active and historical memberships.
- View booking and attendance history.
- View credit balances.
- Assign a membership.
- Correct account information where permitted.
- Suspend or deactivate access when appropriate.

Member profile information should be limited to what the studio needs to operate.

### 5.6 Membership Management

Administrators can define membership plans with:

- Plan name.
- Number of credits included.
- Validity period in days.
- Optional description.
- Active or inactive status.
- Optional price for display purposes.

Administrators can assign a plan to a member, specifying:

- Start date.
- Expiration date.
- Initial credit balance.
- Membership status.

The system must distinguish between a reusable plan definition and an individual member's membership instance.

Do not implement real payments in the MVP.

### 5.7 Member Portal

The member interface should prioritize simple, fast booking.

**Home screen:**

- Next upcoming booking.
- Active membership status.
- Remaining credits.
- Recommended next action, such as viewing available classes.

**Schedule screen:**

- Upcoming classes.
- Filters for Reformer and Mat.
- Instructor and time information.
- Remaining spots.
- Clear booking action.

**My Bookings screen:**

- Upcoming bookings.
- Past bookings.
- Cancelled bookings.
- Attendance status where applicable.

**Membership screen:**

- Current plan.
- Validity dates.
- Remaining credits.
- Credit transaction history.

The interface must explain why a member cannot book a class, for example, because the membership has expired, no credits remain, or the class is full.

### 5.8 Instructor Portal

Provide a simple interface focused on teaching:

- Upcoming assigned classes.
- Class roster.
- Booking count.
- Attendance management.

For each class, the instructor can mark each booked member as present or absent.

Attendance should only be editable for authorized classes. Changes must be persisted and auditable.

### 5.9 Attendance Management

Attendance statuses:

- Pending.
- Present.
- Absent.

Requirements:

- Attendance can be recorded only for an eligible class.
- Only the administrator or the assigned instructor can modify attendance.
- Repeated attendance submissions must not create duplicate credit transactions.
- Attendance corrections must not silently alter credits unless an explicit studio policy requires it.
- The class should be marked completed after it has taken place and attendance is finalized, either manually or through a controlled workflow.

### 5.10 Insights Dashboard

Insights are a core product feature and must be implemented in the MVP using deterministic calculations rather than an AI model.

Provide the following metrics:

**A. Class occupancy**

Occupancy is calculated as:

`Active bookings / Class capacity × 100`

Exclude cancelled classes. Do not count cancelled bookings as active bookings.

Allow filtering by date range and class type.

**B. Occupancy by class type**

Compare Reformer and Mat classes using:

- Average occupancy.
- Number of classes.
- Total bookings.

**C. Low-occupancy classes**

Identify classes below a configurable threshold.

- Default threshold: 40%.
- Allow an administrator to change the threshold.
- Show class date, time, type, instructor, booking count, capacity, and occupancy percentage.

**D. Most popular classes**

Show class types, instructors, or time slots with the highest booking demand.

Use clearly defined metrics and allow filtering by date range.

**E. Attendance overview**

Show attendance rates for completed classes where sufficient attendance data exists.

**Data quality rules:**

- Upcoming classes must not be treated as completed classes for attendance analysis.
- Missing attendance data must not be interpreted as absence.
- Cancelled classes must be excluded from occupancy performance calculations.
- Empty datasets must produce an explanatory empty state, not misleading zero-performance conclusions.
- Label every metric clearly and display the relevant date range.

The insights page should help an administrator answer questions such as:

- Which classes tend to fill up?
- Which time slots consistently have low occupancy?
- Is Reformer or Mat more popular?
- Which instructors or class types have higher demand?
- What proportion of booked members attend completed classes?

Do not claim causation or make predictions from insufficient data.

### 5.11 In-App Notifications

Provide a simple notification center.

MVP notification events:

- Booking confirmed.
- Booking cancelled.
- Class cancelled by the studio.
- Class schedule changed in a way that affects a member's booking.
- Membership approaching expiration, where the notification can be generated reliably.

Each notification should contain:

- Recipient.
- Type.
- Message.
- Related entity where relevant.
- Creation timestamp.
- Read/unread status.

Notifications must be stored in the database and visible only to their intended recipients or authorized administrators.

Do not implement external delivery integrations in the MVP.

---

## 6. Business Rules

Implement the following rules centrally in server-side business logic and enforce relevant invariants in the database.

### 6.1 Booking rules

A booking is allowed only when:

1. The user is authenticated.
2. The user is an active member.
3. The class exists and is not cancelled.
4. The class has not started.
5. The member has an active membership valid for the class date.
6. The member has at least one available credit.
7. The class has available capacity.
8. The member does not already have an active booking for the class.
9. The member does not have another active booking that overlaps in time.

A booking operation must be atomic.

The system must prevent race conditions where two users attempt to book the last available spot simultaneously.

Booking, credit deduction, and credit transaction creation must succeed together or fail together.

### 6.2 Cancellation rules

Default policy: members can cancel without penalty until 12 hours before the class starts.

This value must be configurable by the administrator.

- Early cancellation: cancel the booking and restore the consumed credit.
- Late cancellation: cancel the booking but do not restore the credit.
- Studio-initiated cancellation: restore the consumed credit regardless of the cancellation cutoff.
- Repeated cancellation requests must not refund credits more than once.

The server must determine whether a cancellation is early or late using the class start time and the configured policy.

### 6.3 Capacity rules

- Active bookings must never exceed class capacity.
- Cancelled bookings do not count toward capacity.
- Editing capacity below the current number of active bookings must be rejected or require an explicit administrative resolution.
- Concurrent booking attempts must be handled safely.

### 6.4 Credit rules

- Credits cannot become negative.
- Every credit adjustment must create a transaction record.
- Booking and cancellation operations must be idempotent where possible.
- Administrators must provide a reason for manual credit adjustments.
- Credit transactions must not be silently edited or deleted.
- A membership's credit balance and transaction history must remain consistent.

Use a transactional credit ledger as the audit trail. If a cached `credits_remaining` field is stored for performance, it must be updated atomically and remain consistent with the ledger.

### 6.5 Time and date rules

- Store timestamps consistently in the database, preferably as timezone-aware timestamps.
- Display class times in the studio's configured timezone.
- Configure the studio timezone explicitly; use `Asia/Jerusalem` for the initial deployment unless the studio specifies otherwise.
- Handle daylight saving time correctly.
- Do not compare date strings when timestamp comparisons are required.

---

## 7. Database Design

Use PostgreSQL with foreign keys, appropriate indexes, constraints, and migrations.

The following is the logical data model. Exact SQL types and implementation details should be decided during database setup.

### 7.1 `profiles`

Application profile associated with a Supabase Auth user.

Fields:

- `id` — primary key and reference to the Auth user.
- `full_name`
- `email`
- `phone` — optional.
- `role` — `admin`, `instructor`, or `member`.
- `is_active`
- `created_at`
- `updated_at`

Role assignment must be controlled by trusted server-side logic.

### 7.2 `class_sessions`

Represents one scheduled class occurrence.

Fields:

- `id`
- `title`
- `class_type` — `reformer` or `mat`.
- `instructor_id` — reference to `profiles`.
- `start_time`
- `end_time`
- `capacity`
- `description` — optional.
- `status` — `scheduled`, `cancelled`, or `completed`.
- `created_at`
- `updated_at`

### 7.3 `membership_plans`

Reusable membership definitions.

Fields:

- `id`
- `name`
- `credits_included`
- `validity_days`
- `description` — optional.
- `price` — optional, for display only.
- `is_active`
- `created_at`
- `updated_at`

### 7.4 `memberships`

An individual membership assigned to a member.

Fields:

- `id`
- `member_id`
- `plan_id`
- `start_date`
- `end_date`
- `credits_remaining`
- `status` — `active`, `expired`, or `cancelled`.
- `created_at`
- `updated_at`

The application must check both membership status and validity dates before accepting a booking.

### 7.5 `bookings`

Represents a member's booking for a class.

Fields:

- `id`
- `session_id`
- `member_id`
- `membership_id`
- `status` — `booked` or `cancelled`.
- `attendance_status` — `pending`, `present`, or `absent`.
- `booked_at`
- `cancelled_at` — nullable.
- `cancellation_type` — optional, such as `member_early`, `member_late`, or `studio`.
- `created_at`
- `updated_at`

Add appropriate indexes and database protections against duplicate active bookings.

### 7.6 `credit_transactions`

Immutable audit trail for credit movements.

Fields:

- `id`
- `membership_id`
- `booking_id` — nullable.
- `amount` — signed integer; positive for credits added, negative for credits consumed.
- `reason`
- `created_by` — nullable for system-generated actions.
- `created_at`

Every credit-changing operation must write the corresponding transaction.

### 7.7 `studio_settings`

Stores studio-level configuration.

Fields:

- `id`
- `studio_name`
- `timezone`
- `cancellation_cutoff_hours`
- `low_occupancy_threshold`
- `created_at`
- `updated_at`

For a single-studio MVP, a single settings record is sufficient.

### 7.8 `notifications`

Fields:

- `id`
- `recipient_id`
- `type`
- `title`
- `message`
- `related_booking_id` — nullable.
- `related_session_id` — nullable.
- `is_read`
- `created_at`

### 7.9 Additional design requirements

- Use UUIDs for entity identifiers unless the existing project has a strong reason not to.
- Add foreign keys and appropriate delete behavior.
- Prefer deactivation or soft deletion for important business records.
- Add indexes for class dates, instructor schedules, member bookings, membership lookups, and notifications.
- Add database constraints wherever they can safely enforce business invariants.
- Define unique constraints for preventing duplicate active bookings using a reliable schema design.
- Use migrations for every schema change.
- Seed only development or demo data; never create production users with shared default passwords.

---

## 8. Security and Authorization

Security is a core requirement, not a later enhancement.

### Supabase requirements

Enable RLS on every table exposed to the client.

Policies must enforce the following:

- Members can read and update only the permitted fields of their own profile.
- Members can read their own memberships, bookings, credit transactions, and notifications.
- Members cannot directly modify credit balances or create arbitrary credit transactions.
- Instructors can access attendance and rosters only for classes assigned to them.
- Administrators can manage studio data according to their role.
- Role changes and administrative operations cannot be performed by untrusted clients.

Critical operations, such as booking, cancellation, and credit adjustments, must execute through trusted server-side logic or secure database functions.

Do not trust role information supplied by the browser.

Do not expose service-role keys or other privileged credentials to client code.

Test authorization rules with users from each role, including attempts to access another member's data.

---

## 9. User Experience and Design

The interface should feel professional, calm, modern, and appropriate for a Pilates studio.

### Visual direction

- Minimal and clean layout.
- Warm neutral colors with a restrained accent color.
- Clear typography and generous spacing.
- Consistent components and interaction patterns.
- Avoid excessive decoration or unnecessary animations.
- Prioritize readability and booking speed.

### Language and layout

- The initial interface should support Hebrew and right-to-left (RTL) layout.
- Keep code identifiers, database field names, and internal enums in English.
- Ensure forms, navigation, tables, calendar views, and dialogs behave correctly in RTL.
- Structure text so English content can be displayed when necessary.

### Responsive behavior

Support:

- Desktop administrative workflows.
- Tablet use by instructors.
- Mobile-first booking flows for members.

### Required UI states

Every data-driven screen must support:

- Loading.
- Empty state.
- Success feedback.
- Validation errors.
- Server errors.
- Permission-denied state.
- Confirmation before destructive or consequential actions.

Do not show fake success messages when an operation fails.

Use confirmation dialogs for cancelling classes, changing important membership details, and other consequential actions.

---

## 10. Testing Requirements

Create tests for the critical business rules before considering the MVP complete.

### Booking tests

- Successful booking.
- Booking with an expired membership.
- Booking with zero credits.
- Booking a full class.
- Duplicate booking attempt.
- Overlapping booking attempt.
- Booking a cancelled class.
- Booking after the class has started.
- Two simultaneous attempts to book the last spot.

### Cancellation tests

- Early cancellation restores one credit.
- Late cancellation does not restore a credit.
- Studio cancellation restores a credit.
- Repeated cancellation does not issue multiple refunds.
- Cancellation of an already cancelled booking is handled safely.

### Credit tests

- Credits never become negative.
- Manual adjustment requires a reason.
- Every adjustment has an audit record.
- Balance and ledger remain consistent after failures.

### Attendance tests

- Authorized instructor can mark attendance for an assigned class.
- Instructor cannot edit attendance for an unrelated class.
- Attendance submission does not create duplicate credit movements.

### Authorization tests

- Member cannot access another member's data.
- Member cannot change their role.
- Member cannot directly change their credit balance.
- Unauthenticated users cannot access protected pages or data.
- Administrator-only actions are rejected for other roles.

### Insights tests

- Occupancy is calculated correctly.
- Cancelled bookings are excluded.
- Cancelled classes are excluded where required.
- Upcoming classes are not included in completed-class attendance metrics.
- Empty data produces an appropriate empty state.

---

## 11. Development Plan

Implement the project incrementally. Each phase must be functional and tested before moving to the next.

### Phase 0 — Repository inspection and planning

- Inspect the existing repository.
- Identify the current framework, package manager, and existing implementation.
- Create or update `SPEC.md`.
- Create `CLAUDE.md` with project conventions and development instructions.
- Propose the implementation plan.
- Do not overwrite existing work without understanding it.

### Phase 1 — Application shell and UI

Build:

- Authentication screens and placeholder protected routes.
- Navigation and shared layout.
- Admin dashboard.
- Class schedule.
- Member portal.
- Instructor portal.
- Insights page with clearly labeled sample data.

At this stage, the goal is a coherent, navigable interface.

Do not pretend sample data is persisted. Clearly separate mock data from real backend functionality.

### Phase 2 — Database and authentication

- Configure Supabase.
- Create database migrations.
- Implement authentication and profiles.
- Implement role-based routing and authorization.
- Add RLS policies.
- Create development seed data.
- Verify role isolation.

### Phase 3 — Class management

- Implement class CRUD.
- Add schedule filtering.
- Add instructor assignment.
- Implement validation and overlap checks.
- Implement studio-initiated class cancellation.

### Phase 4 — Memberships, bookings, and credits

- Implement membership plans and assignments.
- Implement atomic booking operations.
- Implement early and late cancellation.
- Implement the credit transaction ledger.
- Implement in-app booking notifications.
- Test concurrency and duplicate requests.

### Phase 5 — Attendance and insights

- Implement attendance management.
- Implement the insights calculations.
- Add date and class-type filters.
- Verify all metrics against known test datasets.

### Phase 6 — QA and deployment

- Run automated tests.
- Run type checking and linting.
- Test responsive behavior and RTL.
- Review RLS policies.
- Fix critical defects.
- Document environment variables and deployment steps.
- Prepare a demo environment with non-sensitive sample data.

---

## 12. Definition of Done

A feature is complete only when:

1. Its UI is implemented.
2. Its business logic works.
3. Its data persists correctly when persistence is required.
4. Permissions are enforced.
5. Loading, empty, success, and error states are handled.
6. Relevant tests pass.
7. No secrets are exposed.
8. The feature works on supported screen sizes.
9. The documentation is updated when necessary.

Do not mark a feature complete merely because its UI looks correct.

---

## 13. Instructions for Claude Code

Act as a senior full-stack engineer working incrementally on this project.

Before writing code:

1. Inspect the existing repository and read its configuration.
2. Read this specification and `CLAUDE.md`, if present.
3. Identify what already exists and what is missing.
4. Propose a concise plan for the current phase.
5. Explain any important technical decisions or conflicts with the specification.

During implementation:

- Work on one phase or a small, coherent feature at a time.
- Reuse existing components and conventions where appropriate.
- Prefer simple, maintainable solutions over unnecessary abstraction.
- Do not implement excluded features without explicit approval.
- Do not fabricate backend behavior or use mock data as if it were real.
- Do not weaken security to make a feature easier to implement.
- Never expose privileged environment variables to the browser.
- Run relevant tests, type checks, and linting after changes.
- Fix errors introduced by the implementation before moving forward.
- Ask for clarification when a decision materially affects the product or data model; otherwise, choose a reasonable default and document it.

At the end of each phase, report:

- What was implemented.
- Which files were created or changed.
- Which tests and checks were run and their results.
- What remains incomplete.
- Any configuration or manual action required from the developer.

**Immediate task:** Start with Phase 0, inspect the repository, and then implement Phase 1 only after presenting the proposed plan. Do not build the entire application in a single pass.
