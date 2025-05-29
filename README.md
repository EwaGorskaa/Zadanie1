# Sprawozdanie z Zadania 2 - Ewa Górska

- opis wykonania:
  1. Workflow uruchamia się manualnie (workflow_dispatch) oraz przy wypchnięciu tagu w formacie "v*"
  2. "Metadata-action" deklaruje adres gdzie obraz ma zostać opublikowany w GHCR i generuje tag
  3. Instalacje w "Set up QUEMU" i "set up Buildx" umożliwiają budowę obrazu wieloarchitekturowego
  4. Krok "Setup SSH agent" umożliwia uwierzytelnienie przy korzystaniu z --mount=type=ssh podczas budowania obrazu 
  5. Wykorzystuje "cache-from" i "cache-to" do wykorzystania cache eksportera registry i backendu registry w trybie max
  6. Przesyła obraz do GHCR
  7. Wykonuje skan CVE przy pomocy Trivy z exit-code: 1, jeśli wystąpią "severity: CRITICAL,HIGH"

- tagowanie obrazów: 
  1. semver - dla tagów w formacie "v*"
  2. sha - dla automatycznych tagów stworzonych na podstawie skrótu hasza commita
   - semvera można użyć dla ładnych wersji aplikacji a sha dla wersji deweloperskich
  
- cache:
  1. Cache jest publikowany do Docker Hub z tagiem :cache i używany ponownie dzięki konfiguracji registry + mode=max.