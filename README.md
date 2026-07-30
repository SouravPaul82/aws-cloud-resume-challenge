# AWS Cloud Resume Challenge

A comprehensive cloud-based resume project showcasing modern web development and AWS cloud infrastructure skills.

## 📋 Project Overview

This repository implements the **AWS Cloud Resume Challenge**, a hands-on project designed to demonstrate proficiency in:

- **Cloud Infrastructure**: AWS services and cloud architecture
- **Frontend Development**: HTML, CSS, and JavaScript
- **Backend Development**: Python-based serverless functions
- **Infrastructure as Code**: Automated deployment and configuration

The project is structured as a full-stack application with a frontend resume website and a backend API, all deployed on AWS.

## 🏗️ Project Structure

```
aws-cloud-resume-challenge/
├── frontend/          # Frontend application (HTML, CSS, JavaScript)
├── backend/           # Backend Lambda functions (Python)
├── infra/             # Infrastructure as Code configurations
└── .github/           # GitHub Actions workflows
```

### Directory Breakdown

- **frontend**: Contains the resume website UI with styling and interactivity
- **backend**: Python Lambda functions for backend logic and API endpoints
- **infra**: Infrastructure configuration for AWS resources
- **.github**: CI/CD workflows for automated testing and deployment

## 💻 Tech Stack

| Language | Usage | Percentage |
|----------|-------|-----------|
| CSS | Styling & Layout | 38.3% |
| HTML | Structure & Markup | 35.9% |
| Python | Backend Logic | 14.4% |
| JavaScript | Interactivity | 11.4% |

## 🚀 Key Features

- **Responsive Design**: Modern, mobile-friendly resume website
- **Serverless Backend**: AWS Lambda-powered API
- **Infrastructure as Code**: Automated AWS resource management
- **CI/CD Pipeline**: GitHub Actions for continuous integration and deployment
- **Cloud-Native**: Built on AWS services for scalability and reliability

## 📦 AWS Services Used

This project leverages the following AWS services:

- **S3**: Static website hosting
- **CloudFront**: Content delivery and caching
- **Lambda**: Serverless compute for backend logic
- **API Gateway**: RESTful API management
- **DynamoDB**: NoSQL database (if applicable)
- **Route 53**: Domain routing and DNS
- **CloudWatch**: Monitoring and logging
- **IAM**: Access management and security

## 🛠️ Getting Started

### Prerequisites

- AWS Account
- Git
- Python 3.x (for backend development)
- Node.js/npm (if frontend build tools are used)
- AWS CLI configured with appropriate credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SouravPaul82/aws-cloud-resume-challenge.git
   cd aws-cloud-resume-challenge
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   # Open index.html in a browser or deploy to S3
   ```

3. **Backend Setup**
   ```bash
   cd backend
   # Install Python dependencies (if requirements.txt exists)
   pip install -r requirements.txt
   ```

4. **Infrastructure Setup**
   ```bash
   cd infra
   # Deploy AWS resources using your preferred IaC tool
   # (Terraform, CloudFormation, SAM, etc.)
   ```

## 📝 Development

### Frontend Development
- Modify HTML files in the `frontend/` directory
- Update CSS for styling changes
- Add interactivity with JavaScript

### Backend Development
- Create/modify Lambda functions in the `backend/` directory
- Update API handlers and business logic
- Test locally before deployment

### Infrastructure Updates
- Modify IaC files in the `infra/` directory
- Test configuration changes in a staging environment
- Deploy to production through the CI/CD pipeline

## 🔄 CI/CD Pipeline

GitHub Actions workflows are configured to:
- Run automated tests
- Validate infrastructure code
- Deploy changes to AWS automatically on push to main branch

See `.github/workflows/` for workflow definitions.

## 🌐 Deployment

The project is deployed to AWS with the following architecture:

1. **Frontend** is served via S3 + CloudFront CDN
2. **Backend API** runs on AWS Lambda with API Gateway
3. **Infrastructure** is managed through IaC automation

