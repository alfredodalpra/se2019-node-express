# RESTful APIs

In this part of the tutorial, we focus on using Express to develop a backend server that expose a RESTful API.

>Representational State Transfer (REST) is an architectural style that defines a set of constraints to be used for creating web services. Web Services that conform to the REST architectural style, or RESTful web services, provide interoperability between computer systems on the Internet. **REST-compliant web services allow the requesting systems to access and manipulate textual representations of web resources by using a uniform and predefined set of stateless operations.**  (Source [Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer))

- web resource: any resource on the web that can be identied by an URI (universal resource identifier - urls are the most common type of identifiers).
- text representation: json, xml, ...
- operations: In our case we are talking about HTTP operations (GET, POST, PUT, DELETE)

### Managing a web resource

For example, let's say we want to implement a REST API to manage products.

```json
{
  "id": 1,
  "name": "iPhone XL",
  "description": "Extra large"
}
```

We then map CRUD (or CRUSD) operations to the standard HTTP verbs.

| Operation | HTTP Verb   | URI           | Req body  | Resp body  |
| --------- | ----------- | ------------- | --------- | ---------- |
| Search    | GET         | /products     | Empty     | [Product+] |
| Create    | POST        | /products     | Product   | Empty      |
| Read      | GET         | /products/:id | Empty     | Product    |
| Update    | PUT / PATCH | /products/:id | Product\* | Product    |
| Delete    | DELETE      | /products/:id | Empty     | Empty      |

This works pretty well with simple resources. More complex APIs will require special attention to the relationship between web resources, and ways of traversing the relationships. For example, to get the list of products associated to a user (`/user/:id/products`).

Our challenge: Implementing the products API!. There is a stub implementation in `exercises/products-api`, which includes a simple client web app.

### Exercises

1. Finish implementing the Products API backend
2. Implement the web API for managing student registrations as specified here: https://www.studytonight.com/rest-web-service/designing-the-rest-api