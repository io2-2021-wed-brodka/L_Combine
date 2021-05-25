# L_Combine
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

Testy E2E frontenmdu odpalamy w folderach odpowiednich projektów poleceniem:
```
ng e2e 
```
Testy odpalamy na czystej bazie w kolejności UserTech > Admin.

Istnieją też test suity do odpowiednich sprintów. Podajemy je jako wartość dla opcji `suite`, czyli np.
```
ng e2e --suite=sprint2
```
Dostępne suity:

* UserTech:
    * sprint2
    
* Admin:
