# MDCATemy / QuizBuilder Mini - DevOps Semester Project

## Project Overview

This project is a containerized web application developed for the SE202L Development Operations Lab semester project.

The project demonstrates a complete DevOps lifecycle using:

- Git and GitHub
- Docker
- Docker Compose
- GitHub Actions CI/CD
- AWS EC2 deployment
- Docker Hub image registry
- Terraform Infrastructure as Code

The application consists of three main services:

- Frontend
- Backend API
- PostgreSQL Database

The complete system is deployed on an AWS EC2 instance using Docker containers.

---

## Branch Used

The main development and deployment branch for this project is:

```bash
quizbuilder-demo

MDCATemy/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── quizbuilder-mini/
│   ├── frontend/
│   │   └── Dockerfile
│   │
│   ├── backend/
│   │   └── Dockerfile
│   │
│   └── docker-compose.yml
│
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
│
└── README.md
