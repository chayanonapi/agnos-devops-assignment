# Agnos DevOps Assignment

## Overview
This repository demonstrates a production-style DevOps implementation for a simple system composed of an **API service** and a **background worker**.  
The objective is to showcase **containerization, Kubernetes orchestration, CI/CD automation, scalability, and reliability**.

---


## Architecture
- **API Service**
  - Exposes `/health` endpoint
  - Used for readiness and liveness probes
- **Background Worker**
  - Runs asynchronous background jobs
  - Independent lifecycle and scaling
- **Kubernetes**
  - Handles orchestration, scaling, and self-healing
- **CI/CD Pipeline**
  - Builds images and deploys to Kubernetes automatically

---

## Setup Instructions

This guide explains how to set up, build, and deploy the project locally using **Docker** and **Kubernetes**.

### Prerequisites

Make sure the following tools are installed on your machine:

- Docker
- kubectl
- Git

**Verify installation:**

```bash
docker version
kubectl version --client
git --version
```
---

## Usage Instructions

This section explains how to use the application once it has been deployed to Kubernetes.

### 1. Check Application Status

Verify that all pods are running:

```bash
kubectl get pods
kubectl get deployments
kubectl get svc
```

### 2. Access the API Service

Forward the API service port to your local machine:

```bash
kubectl port-forward svc/api-service 8080:80
```

### 3. Call the Health Endpoint

Use curl or a browser to verify the API is healthy:

```bash
curl http://localhost:8080/health
```

---

## Failure Scenario
- **API crashes during peak hours**
  - Check pod status and logs.
  - Scale API replicas if needed.
  - Increase resource limits or optimize code.

- **Worker fails and infinitely retries**
  - Inspect worker logs.
  - Scale worker to zero to stop retries.
  - Fix retry logic (add retry limits or backoff).
  - Restart worker after fix.

- **Bad deployment is released**
  - Pause rollout if needed.
  - Roll back to previous stable version.
  - Fix issue and redeploy.

- **Kubernetes node goes down**
  - Verify node and pod status.
  - Scale deployments if capacity is reduced.
  - Replace or recover failed node at infrastructure level.