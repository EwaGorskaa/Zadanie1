# Zadanie 1 

- Analiza CVE:
  ```
  trivy image local/zadanie1_eg:v101
  ```
  Obraz bazowy użyty do budowy kontenera zawiera high vulnerability:  CVE-2024-21538, dokładnie cross-spawn w wersji 7.0.3, która jest podatna na ataki denial of service. Jednak w kodzie aplikacji pakiet nie jest wykorzystywany, dlatego nie ma to wpływu na bezpieczeństwo działania aplikacji.
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