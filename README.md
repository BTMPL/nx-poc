# Monorepo setup

This project attempts to demonstrate the following:

- monorepo setup
- microfrontend integration
- "shared" service used to pass data between applications
- updating the router from outside of Angular context

The technology used is Angular and [NX](https://nx.dev).

## Installation

To install the project use `npm`:

```
npm install
```

This should install all the needed tooling. You can opt into installing `nx` package globally, or invoke it with `npx` by calling `npx nx ....`

## Contents

The project consists of the following:

### applications

#### app-one and app-two

Standard Angular applications. The `app-one` application additionally imports the shared `UserService` library.

#### appthree

A Angular application with an exposed `webpack.config.js` file which allows it to implement the [Angular module federation](https://www.angulararchitects.io/en/aktuelles/the-microfrontend-revolution-part-2-module-federation-with-angular/) mechanism in order to allow itself to be loaded by the shell application

See [this article](https://nx.dev/l/a/guides/setup-mfe-with-angular) for more information on how to setup module federation inside nx workspace app.

Please note the name of the module should be alpha-numeric only as otherwise webpack / tsc will report errors and prevent you from bundling the entry point.

#### scp

This is the "shell" of the application, used to load and orchestrate all the other applications. It will use hash routing to load iframes for `app-one` and `app-two` as well as consume `appthree` as a federated module.

The application comes with an exposed `webpack.config.js` file which allows it to resolve the federated module.

### libraries

#### ui

A barebones UI library providing the `hsbc-button` component. It also comes configured with a storybook setup. The library module (`UiModule`) is consumed by the shell (`scp`) application.

#### services

A example Angular services library providing the `UserService` to expose a very simple demo of a login / logout function with the mechanism used to help propagate the data between both federated and iframe-embeded applications.

Please see the comments in the service for more info on implementation details.

## Starting the project

You can start all the applications manually:

```
// run the "application 1"
nx run app-one:serve --port=3002

// run the "application 2"
nx run app-two:serve --port=3001

// run the "application 3", expose the remote entry point
nx run appthree:serve --port=4201

// run the "shell application"
nx run scp:serve --port=4200
```

or start all of them with a single command:

```
npm run dev
```

## Additional tools

The project comes preconfigured with a storybook:

```
nx run ui:storybook
```

and the default nx dependency grapher:

```
nx dep-graph
```

Please note you will need to restart the dependency grapher if you add/remove applications and libraries to the project as it will not reflect added/removed content on the fly. Any connections between existing content will be shown without the need to restart.

## Not covered

### shared state

The `UserService` uses local storage to synchronize data across both federated modules and applications loaded as iframe. If we were to only support module federation, we could update the code so that single service instance is created and the data is "just shared" - see ["Issues with Sharing Code and Data"](https://www.angulararchitects.io/aktuelles/pitfalls-with-module-federation-and-angular/)
