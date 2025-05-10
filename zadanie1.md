# Zadanie 1 

- Zbudowanie kontenera:
  ```
  docker build -f Dockerfile_base -t local/zadanie1_eg:v101 .
  ```
- Uruchomienie kontenera:
  ```
  docker run -p 3001:3001 --name chmurkaapp local/zadanie1_eg:v101
  ```
- Uzyskanie logów:
  ```
    docker logs chmurkaapp
  ```
- Sprawdzenie ile warstw ma kontener:
  ```
  docker inspect imagetools inspect local/zadanie1_eg:v101
  ```
  - albo:
  ```
  docker history local/zadanie1_eg:v101
  ```

- Pobranie rozmiaru obrazu:
  ```
  docker image ls local/zadanie1_eg:v101
  ```