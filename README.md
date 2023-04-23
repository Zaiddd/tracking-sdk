# tracking_sdk

This Tracking SDK is developed with VueJS

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# Usage

- Go to the tracking platform and create an account. You will be given an Application ID (AppId) to use it in your project
- Install the Tracker in your project
- Add the following lines in your main.js file :
    ```js
    app.use(Tracker, {
        AppId: "YOUR_APPLICATION_ID",
    });
    ```

- Create your custom tags from the tracking platform to include them in your HTML elements
- In your Vue components, you can add the tracking directives "click-track" and "mouseover-track". Example :
    ```js
  <img alt="My Image" src="./assets/logo.svg" v-click-track="'MOUSEOVER-TAG'"/>
  <button v-mouseover-track="'CLICK-TAG'">My Button</button>
    ```
  
- Preview your statistics on the dashboard
- Enjoy !