# EchoJS mobile server

## Server setup

Expected platform is Ubuntu 14.04

### Install software

```
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs
```

### Give your user permission to use port 80

```
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep /usr/bin/nodejs
```

## Running the application

cd into the app directory, then run `npm run start:release`
