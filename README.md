# CareerPilot

CareerPilot is a simple AI powered tool that helps job seekers understand how well their resume matches a target role and what they can do to improve their chances of getting hired.

Users upload their resume, choose a job type or role, and CareerPilot AI analyzes the text to highlight strengths, missing skills, and practical recommendations they can act on immediately.

This project was created as part of the **Google x Kaggle Agents Intensive Capstone Project** by team **Hire-onauts**.

---

## ✨ Features

- **Resume analysis**  
  Extracts key skills and keywords from the uploaded resume.

- **Job fit insights**  
  Compares the resume against a target role or job description concept and surfaces alignment vs gaps.

- **Missing skills and keywords**  
  Shows important skills that are commonly expected for the role but not clearly present in the resume.

- **Actionable suggestions**  
  Provides simple, concrete ideas on how the user can update their resume or profile to improve their chances.

- **Clean, focused UI**  
  A straightforward interface so users can upload a resume and get feedback in a few clicks.

---

## 🧠 How it works

1. The user uploads or pastes their resume text.
2. The app parses the content and extracts:
   - technical skills  
   - soft skills  
   - role-related keywords
3. A lightweight matching layer compares these against expectations for selected job roles.
4. The app summarizes:
   - how well the resume fits the role  
   - which skills seem to be missing  
   - what updates the user should consider making

The goal is not to replace a recruiter but to behave like a **personal career copilot** that gives clear guidance before the user applies.

---

## 🛠 Tech stack

- **Frontend:** TypeScript + React (Vite)
- **Styling:** Tailwind CSS
- **Build tooling:** Vite, ESLint, TypeScript configs
- **Package manager:** npm (lockfile included)  
  > A `bun.lockb` file is also present, but the app can be installed and run with plain `npm` as well.

---

## 🚀 Getting started

### Prerequisites

- Node.js (LTS version recommended)
- npm installed globally

### Installation

Clone the repository:

```bash
git clone https://github.com/Akhil0905/CareerPilot.git
cd CareerPilot
