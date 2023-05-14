Theme Editor POC för Sweet Forms


Komma igång 


1.  Klona ner projektet från Repot i Github

För att få projektet till din dator behöver du installera ett cli verktyg som heter git bash, detta kan hittas här: https://git-scm.com/downloads

När installationen är klar skapar du en ny mapp på din dator.
Gå sedan in i mappen och högerklicka, välj alternativet git bash here.

Ange kommandot git init i fönstret.
Skriv sedan in git clone (urlen till repot)
Projektmappen finns nu i mappen du skapade.


2. Ladda ner visual studio code https://code.visualstudio.com/download

När installationen är klar väljer du open folder.
Navigera sedan till och välj projektmappen.
Välj alternativet view i visual studio och klicka sedan på terminal.

Kör kommandot npm install i terminalen


3. Se om alla dependencies är på plats

Dependencies är dem hjälpmedel och verktyg som jag använt mig av för att kunna bygga applikationen. Dessa kan hittas i filen package.json
Efter att npm install körts behöver dessa dependencies finnas på plats under dependencies:

"@types/node": "^16.18.23",

"@types/react": "^18.0.35",

"@types/react-dom": "^18.0.11",

"json-server": "^0.17.3",

"axios": "^1.3.5",

"react": "^18.2.0",

"react-dom": "^18.2.0",

"react-router-dom": "^6.10.0",

"react-scripts": "5.0.1",

"typescript": "^4.9.5",

"uuidv4": "^6.2.13"

Om någon av dessa ovan fattas eller har ett annat versionsnummer så behöver paketet installeras manuellt.

Obs: det är viktigt att versionen av paketet stämmer överens med versionen ovan, ange versionen efter @ om en manuell installation behövs


Manuell installation:

*React är det bibliotek/ramverk som jag använt mig av för att bygga den här applikationen.
installera React med kommandot:
npm install --save react@18.2.0 react-dom


*Dem dependencies som börjar med @types kommer från typescript och behövs för att typescript ska kunna användas med react..

För att installera dessa anger du detta kommando i terminalen:
npm install --save typescript @types/node @types/react @types/react-dom @types/jest


* json-server använder jag som en tillfällig databas för applikationen. Med detta paket får jag ett utrymme att förvara den json-data som behövs för att skapa editorn samt spara teman. Jag får också ett REST API med endpoints som används genom applikationen för att manipulera data.
Det här paketet behöver köras i en annan port på datorn. 

Installera json-server med kommandot:
npm install --save json-server@0.17.3

Med detta kommando väljer vi att json-server ska startas på port 8000:
npx json-server --watch database.json --port 8000
(Notera att json-server måste vara igång innan applikationen startar.)

* Axios använder jag för dem CRUD kommandon som behövs för att kommunicera med min   mock-backend. Exempel på dessa är när man vill skapa, spara, uppdatera och ta bort ett tema. 
Installera axios med kommandot:
npm install axios@1.3.5


*React-router-dom behövs för att kunna navigera genom appen.

Installera med kommandot:
npm install --save react-router-dom@6.10.0


*uuidv4 behövs för att generera unika idn för nya teman.

Installera med kommandot:
npm install uuidv4@6.2.13


4. Installera tillägget Live Sass Compiler genom extensions alternativet.


5. Starta applikationen

Starta json-server med:
json-server --watch database.json --port 8000
och kör sedan:
npm run start

Applikationen startar i browsern.
