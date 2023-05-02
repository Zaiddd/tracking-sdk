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
- In your Vue components, you can add the directive "v-track" on your elements followed by the event you want to detect. Example :
    ```js
  <img alt="My Image" src="./assets/logo.svg" v-track:click="'YOUR_CLICK_TAGS'"/>
  
  <button v-track:click="'YOUR_MOUSEOVER_TAG'">My Button</button>
    ```

- The events ":click" and ":mouseover" must be explicitly written as shown. You can add other Javascript events.
- The tags "YOUR_CLICK_TAGS" and "YOUR_MOUSEOVER_TAG" are custom tags you can create on the analytics platform and use them in your project.
- You can use as many tags and events as you want.