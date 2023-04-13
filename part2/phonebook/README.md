# Phonebook app - front end
To create a production build of this front end for [part 3](https://fullstackopen.com/en/part3/deploying_app_to_internet#frontend-production-build) (full-stack phonebook app):
- Edit src/services/persons.js
```
const baseUrl = '/api/persons'
```
- Run from the root of this app: `npm run build`
- Copy build to backend dir: `cp -r build ../part3/phonebook`
- Edit src/services/persons.js back to original `const baseUrl = '/api/persons'` for this to work with json-server backend

Note: [json-server custom routes](https://www.npmjs.com/package/json-server#custom-routes-example) would cause too many requests to /api/persons with 304 response code.