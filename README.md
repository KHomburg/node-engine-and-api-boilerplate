## Description
Complete boilerplate for building node based webapps serving an api and template engine with single set of controllers

## Installation
1. Create a  Postgres DB
2. Download this Repo
3. fill in credentials in .env
4. run npm install
5. run gulp
6. start the app

## Documentation
### Controllers
- Controllers are located in the 'controllers' folder. Controllers for single routes should contain logic and return only an object containing the information for the frontend or return an array of errors.
- Controllers should follow a resource pattern following a CRUD principle, so the exported module is an object with get, post, update, destroy functions consumed by the routing

### Routing
- Routing logic is located in the 'routes' folder which contains a 'router.js' file and two folders dedicated for defining resource files for routes/paths for each, frontend rendered by the template engine, and an api.
- These resource files already contain the response that is to be sent (either as json or a rendered template)
- These should export a router module which can be imported to the router.js file. The path defined in each router are additions to the base resource path
- In the router.js the resource files are imported and assigned a resource base path.
- further in the router.js file the resources can be assigned with middleware executed on all routes of a resource. For assigning middleware to a single route, that has to be done in the resource files

### Middleware
- Middleware is located in the 'middleware' folder, which comes with authentication handled by passport

### Helpers
- In the Helpers folder helpers such as validators etc. are stored

### Frontend
- Built-in frontend is rendered by Handlebars
- Handlebars templates can be found and stored in the 'views' folder
- Other frontend resources (scss and js) can be developed in the 'resources' folder. Resources can compiled by executing 'gulp default'. Compiled resources are stored in the 'public' folder

## Todo:
- implement watcher for hotreload with gulp for frontend development
- implement prebuilt authentication