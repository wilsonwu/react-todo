# intertodo-react
A Todo React application.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

### For build Docker image please build it first
```
npm run build
```
```
docker build . -t intertodo
```

### Run application in Docker
```
docker run -p 80:80 intertodo
```

### For deploy to Kubernetes
```
kubectl k8s/deployment.yaml
```
```
kubectl k8s/service.yaml
```