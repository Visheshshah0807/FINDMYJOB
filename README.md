# FindMyJob

FindMyJob is a responsive job portal web application that helps users search and apply for jobs easily while enabling recruiters to post job listings and manage applicants. It is designed to be user-friendly and modern, offering seamless navigation and robust features for job seekers and employers.

## 🛠️ Tech Stack

- **Frontend:** React.js + Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** Supabase
- **Other Tools:** Redux Toolkit, Axios, JWT Authentication

## ☁️ AWS Cloud Integration

FindMyJob uses several AWS services to ensure high availability, scalability, and ease of deployment:

- **AWS Amplify:** For hosting and CI/CD of the frontend React app
- **AWS Lambda:** Serverless compute for handling backend logic
- **API Gateway:** To expose RESTful APIs that connect the frontend with Lambda functions
- **Amazon SES (Simple Email Service):** For sending transactional emails (like application confirmations)
- **IAM (Identity and Access Management):** For managing Lambda execution permissions securely
- **Amazon CloudWatch:** For real-time monitoring, logging, and debugging of backend Lambda functions

These integrations help maintain a fully cloud-native, scalable, and secure infrastructure.

## ✨ Features

### 👨‍💼 For Job Seekers:
- Register/Login with secure authentication
- Search and filter jobs by title, location, and category
- View detailed job descriptions
- Apply to jobs with a single click
- Track applied jobs in the dashboard

### 🏢 For Recruiters:
- Register/Login securely
- Post new job listings
- Manage posted jobs (edit/delete)
- View applicants and their details

