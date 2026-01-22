# Bio Site - Token-Gated Portfolio

A private, serverless portfolio website built with AWS infrastructure. Access requires a unique authentication token for privacy and analytics.

## Private Access

This portfolio is not publicly accessible. Access is granted through unique, time-limited tokens for privacy and tracking purposes.

## Tech Stack

### Frontend
- **React** with **TypeScript**
- **Vite** for build tooling
- **React Router** for routing

### Backend & Infrastructure
- **AWS Lambda** - Serverless functions for token validation and redirects
- **AWS API Gateway** - RESTful API endpoints
- **AWS DynamoDB** - Token storage with automatic TTL expiration
- **AWS CloudFront** - Global CDN for fast content delivery
- **AWS S3** - Static website hosting
- **AWS Route 53** - DNS management

### DevOps
- **AWS SAM CLI** - Infrastructure as Code
- **CloudFormation** - Resource provisioning
- **Git** - Version control

## Architecture

- Serverless architecture using AWS Lambda and API Gateway
- Token-based authentication system
- Privacy-respecting analytics without invasive tracking
- CloudFront CDN for optimal performance
- DynamoDB with automatic token expiration (TTL)

## Features

- Private, token-gated access
- Serverless infrastructure
- Automatic token expiration
- Analytics tracking
- SEO blocking (robots.txt, noindex)

---

**Note:** This repository contains the source code for demonstration purposes. The live site requires authentication tokens for access.
