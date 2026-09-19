# KirillaPhysio

Marketing site for physiotherapist **Kirilla Réka**, live at **https://kirillareka.hu**.
Angular 22 — standalone + zoneless + signals, clean-path routing, SSG prerender.

> This Angular app replaced an earlier React (CRA) site, which is archived at tag `react-final`
> and branch `react-legacy`. See [CLAUDE.md](./CLAUDE.md) for architecture and deployment details.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Deploying

The site is served by the external `kirillaphysio/kirillaphysio.github.io` GitHub Pages repo.
Deploys are manual:

```bash
npm run deploy
```

This builds and publishes `dist/kirilla-physio/browser/` (which includes `public/CNAME` for the
custom domain and a `404.html` deep-link fallback). See [CLAUDE.md](./CLAUDE.md#deployment) for
the auth/PAT and `core.longpaths` notes.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
