# Część dodatkowa zadania 1 

- Stworzenie buildera
  ```
    docker buildx create --driver docker-container --name builder-zadanie1 --use --bootstrap
  ```
- Zbudowanie obrazu wieloarchitekturowego 
  ```
    docker login
    docker build -t docker.io/ewagorskaa/repository_gorska:zadanie1_eg --platform linux/arm64,linux/amd64 --push .
  ```
- Zbudowanie razem z cache'm i backendem registry
  ```
  DOCKER_BUILDKIT=1 docker buildx build --platform linux/amd64,linux/arm64 --tag docker.io/ewagorskaa/repository_gorska:zadanie1_eg_ssh --push --cache-from=type=registry,ref=docker.io/ewagorskaa/repository_gorska:cache --cache-to=type=registry,ref=docker.io/ewagorskaa/repository_gorska:cache,mode=max --ssh default=$HOME/.ssh/github_lab .
  ```
- Uruchomienie kontenera (pull z repo):  
  
  ```
  docker run -p 3001:3001 --name chmurkaapp_ssh docker.io/ewagorskaa/repository_gorska:zadanie1_eg_ssh
  ```

- Sprawdzenie manifestu, czy obraz na pewno jest wieloarchitekturowy
  ```
  docker buildx imagetools inspect docker.io/ewagorskaa/repository_gorska:zadanie1_eg_ssh
  ```

- Sprawdzenie liczby warstw obrazu:
  ```
  docker history docker.io/ewagorskaa/repository_gorska:zadanie1_eg_ssh
  ```

- Sprawdznie rozmiaru kontenera: 
  ```
  docker image ls ewagorskaa/repository_gorska:zadanie1_eg_ssh
  ```

- Sprawdzenie logów kontenera:
  ```
  docker logs chmurkaapp_ssh
  ```