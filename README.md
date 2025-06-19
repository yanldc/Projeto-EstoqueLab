# Guia de Deploy - EstoqueLab

Este guia explica como realizar o deploy do projeto EstoqueLab usando Docker e Kubernetes.

## Pré-requisitos

- Docker Desktop instalado
- Kubernetes habilitado no Docker Desktop
- kubectl instalado
- Git (para clonar o repositório)

## 1. Deploy com Docker Compose

### 1.1. Construir e iniciar os containers

```bash
# Na raiz do projeto
docker-compose build
docker-compose up -d
```

### 1.2. Verificar os containers em execução

```bash
docker ps
```

### 1.3. Parar os containers

```bash
docker-compose down
```

## 2. Deploy com Kubernetes

### 2.1. Verificar se o Kubernetes está ativo

```bash
kubectl version
kubectl get nodes
```

O nó `docker-desktop` deve aparecer com status `Ready`.

### 2.2. Construir as imagens Docker

```bash
# Na raiz do projeto
docker build -t backend:latest ./backend
docker build -t frontend:latest ./frontend
```

### 2.3. Aplicar os arquivos de configuração do Kubernetes

```bash
# Na raiz do projeto
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f backend-hpa.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f frontend-hpa.yaml
```

### 2.4. Verificar os recursos criados

```bash
# Verificar deployments
kubectl get deployments

# Verificar pods
kubectl get pods

# Verificar serviços
kubectl get services

# Verificar HPAs (Horizontal Pod Autoscalers)
kubectl get hpa
```

### 2.5. Acessar a aplicação

Para acessar os serviços localmente:

```bash
# Frontend (em um terminal)
kubectl port-forward service/frontend 3000:3000

# Backend (em outro terminal)
kubectl port-forward service/backend 3001:3001
```

Acesse o frontend em: http://localhost:3000

### 2.6. Monitorar logs

```bash
# Logs do frontend
kubectl logs -f deployment/frontend

# Logs do backend
kubectl logs -f deployment/backend
```

### 2.8. Remover os recursos

```bash
kubectl delete -f .
```
