# L_Combine

## Backend skonteneryzowany

Aby uruchomić backend w kontenerze należy wykonać:

```
docker-compose up
```
Backend dostępny jest na porcie 8080 z protokołu HTTP (HTTPS nie wiadomo czy działa).
Można dodać parametr `--build` przy zmianach w kodzie. Wtedy docker na pewno przebuduje kontenery i zastosuje zmiany.
Polecenie powinno uruchomić 2 kontenery:
- aplikacja backendu (l_combine_backend)
- bazę danych (l_combine_mssql)
Uruchomienie kontenerów powinno zając trochę czasu. Backend specjalnie czeka na pełne uruchomienie bazy danych.
Aby w prosty sposób sprawdzić, czy aplikacja sdziała prawidłowo, można uruchomić polecenie z folderu głownego repozytorium
```
./scripts/run_test.sh Tests/PostmanTests/ Backend/BackendAPI/
```
Skrypt wykona testy postmanowe (pierwszy na pewno powinien przejść).

---

## Fronted

Aby uruchomić aplikację kliencką należy:
 
1. Mieć zainstalowanego npm'a. Można go zainstalować razem z node.js z tej strony: https://nodejs.org/en/
2. Mieć zainstalowanego angulara. Można to zrobić przez wpisanie w terminalu: 
```
npm install -g @angular/cli
```
3. Zainstalować node-packages. Aby to zrobić w terminalu (np. VS Code) przejdź do folderu zawierającego aplikację (UserTech lub Admin) i wpisz komendę: 
```
npm install
```
4. Uruchomić aplikację (w tym samym katalogu) poleceniem: 
```
ng s 
```

Aplikacja UserTech działa pod adresem localhost:4200, a Admin pod localhost:4300.

### Testy E2E

Testy E2E frontenmdu odpalamy w odpowiednich folderach projektów poleceniem:
```
ng e2e 
```
Testy odpalamy na czystej bazie w kolejności UserTech > Admin.
