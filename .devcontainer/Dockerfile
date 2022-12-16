FROM ubuntu:22.10

ARG USERNAME=dev

ARG NVM_VER=0.39.2
ARG NODE_VER=19.3.0

RUN apt-get update \
    && apt-get install -y \
    curl \
    git \
    sudo \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* /tmp/library-scripts

RUN adduser $USERNAME --disabled-password --gecos "" \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

USER $USERNAME

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VER}/install.sh | bash
RUN curl -sSL https://storage.yandexcloud.net/yandexcloud-ydb/install.sh | bash

SHELL ["/bin/bash", "--login", "-i", "-c"]
RUN source ~/.bashrc
RUN nvm install $NODE_VER
RUN corepack enable
SHELL ["/bin/bash", "--login", "-c"]

COPY ./ydb/config/config.yaml /home/$USERNAME/ydb/config/config.yaml

CMD ["bash"]
