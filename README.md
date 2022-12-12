# CHALET

Useful Documents:

- [Change Automation Framework](https://sap-my.sharepoint.com/:p:/r/personal/vasanth_gopa_sap_com/Documents/Microsoft%20Teams%20Chat%20Files/Change%20Automation%20Framework.pptx?d=wc0c3994beafb4a23b5491c0d297c1ff3&csf=1&web=1&e=efsZ6c)
- [AppOps Service Enablement Change Scheduling - Use case Documentation](https://sap-my.sharepoint.com/:w:/p/vasanth_gopa/EYPUDq2D_V9KiUXhcZE_QOABD5CCo1Xu2GuDlyUSbsvDWg) 

## Project setup

### Using Docker

- Install Docker from [here](https://docs.docker.com/get-docker/).
#### Building the image
 ```docker build -t chaletui:latest .```
#### Running the image
 ```docker run -it -p 8080:8080 chaletui:latest```

### Manual Setup

```npm install```

#### Compiles and hot-reloads for development
```npm run serve```

#### Compiles and minifies for production
```npm run build```

#### Lints and fixes files
```npm run lint```

## Deployment
```npm run router-build```
```cf push --vars-file vars.yml -f manifest.yml```

Binding Auth Service
```cf bind-service chalet chalet-xsuaa -c parameters.json```

Unbind Auth Service
```cf unbind-service chalet chalet-xsuaa```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### FAQ

- Helping Resource to [extend Auth Certificate](https://sap.github.io/cloud-sdk/docs/java/features/connectivity/sdk-connectivity-mtls#extending-the-validity-of-a-certificate).