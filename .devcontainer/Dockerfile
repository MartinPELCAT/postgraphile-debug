FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

# FLYWAY
## JRE : Eclipse Temurin : https://adoptium.net/installation/
RUN mkdir -p /etc/apt/keyrings && \
    wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | sudo tee /etc/apt/keyrings/adoptium.asc && \
    echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | sudo tee /etc/apt/sources.list.d/adoptium.list && \
    sudo apt update && \
    sudo apt install -y temurin-17-jdk

## FLYWAY CMD LINE :
ARG FLYWAY_VERSION=8.3.0
ARG FLYWAY_ARTIFACT_URL=https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/

RUN wget -qO- ${FLYWAY_ARTIFACT_URL}${FLYWAY_VERSION}/flyway-commandline-${FLYWAY_VERSION}.tar.gz | tar xvz && \
    sudo ln -s `pwd`/flyway-${FLYWAY_VERSION}/flyway /usr/local/bin
