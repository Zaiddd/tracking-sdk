

#  Getting Started

##  Run KPI service 
démarer le service kpi : 

```bash
docker compose up
```

## Installer et démarer le dashboard

pour démarer le dashboard : 

```bash
cd Dashboard
npm i
npm run dev
```

## créer un compte sur le dashboard 

une fois le dashboard est démarré , aller sur la page : see [http://localhost:5173/analytics/dashboard](http://localhost:5173/analytics/dashboard).

créer un compte, et se connecter, puis aller sur la page [http://localhost:5173/analytics/getting-started](http://localhost:5173/analytics/getting-started) pour voir comment implementer le tracker dans votre projet


##  Implementer le tracker

Instal le Middle :

```bash
cd Middle
npm i
node server.js
```

Instal le tracker :  In your VueJS project, create a directory "plugins/tracker". For example :your_project/src/plugins/tracker/

aller sur Tracker/src/tracker et telecharger le fichier Tracker.js.

Put the Tracker.js file in this directory


## Configure
In your main.js file (or index.js), put this code :
                            
    // Path to Tracker.js
    import Tracker from "./tracker/Tracker";

    app.use(Tracker, {
        AppId: "APP_WJPORRMZ",
    });



## Usage
In your Vue components, you can add the directive "v-track" on your elements followed by the event you want to detect. Example :

                            
    <img alt="My Image" src="./assets/logo.svg" v-track:click="'YOUR_CLICK_TAG'"/>

    <button v-track:mouseover="'YOUR_MOUSEOVER_TAG'">My Button<button>
                            
                        
The events ":click" and ":mouseover" must be explicitly written as shown. You can add other Javascript events.
The tags "YOUR_CLICK_TAGS" and "YOUR_MOUSEOVER_TAG" are custom tags you can create here and use them in your project. They will be displayed with the event you use in the dashboard so you can organize your analytics.
You can use as many tags and events as you want.


## Visualize
Your data will be displayed on the dashboard in real time.




## Faire un test sur projet déja existe ( Tracker )  :

Tu peux faire un teste sur projet existe déja ( dossier Tracker )

Démarrer le projet vue :

```bash
cd Tracker
npm i
npm run dev
```
