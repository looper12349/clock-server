# Clock Server

A simple Node.js server providing health check and date/time endpoints.

## Endpoints

- `GET /health` - Health check endpoint
- `GET /datetime` - Returns current date and time

## Local Development

```bash
npm install
npm start
```

Server runs on port 3000 by default.

## Testing

```bash
npm test        # Run tests
npm run lint    # Lint code
```

## Docker

Build and run:
```bash
docker build -t clock-server .
docker run -p 3000:3000 clock-server
```

## CI/CD

### CI Pipeline
Runs on every push to main:
- Unit tests
- Code linting
- OWASP Dependency Check (SCA)
- CodeQL SAST analysis
- Docker build
- Trivy container security scan
- Push to Docker Hub
- Runtime smoke tests

### CD Pipeline
Triggers after successful CI:
- Deploys to DigitalOcean Kubernetes
- Verifies rollout status

### Required GitHub Secrets

**Docker Hub:**
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

**DigitalOcean:**
- `DIGITALOCEAN_ACCESS_TOKEN`
- `DIGITALOCEAN_CLUSTER_NAME`

## Kubernetes Deployment

Update the image reference in `k8s/deployment.yml` with your Docker Hub username, then:

```bash
kubectl apply -f k8s/deployment.yml
```
