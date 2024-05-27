## My List API Documentation

## Overview

This API provides endpoints to manage the "My List" feature for an OTT platform. Users can add their favorite movies and TV shows to a personalized list, remove items from the list, and retrieve their list with pagination and caching optimizations.


## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
```

## Test only end to end tests [Integration Tests]

```bash
# e2e tests
$ pnpm run test:e2e
```

## Default scripts
 - Added scripts to insert default records for User, Movie and TvShows. Make sure to make changes for testing and dev environment.

 ```bash
 $ pnpm run add:users
 $ pnpm run add:movies
 $ pnpm run add:tvshows
 ```

## Environment Variables
 - Check .env.dev and .env.test for variables for MongoURI.

## Users, Movie and TVShows added on Prod DB, use these ids to add to User MyList
```sh
Users: [6654135df8b78768eae0296b, 6654135df8b78768eae0296d]
Movies: [665413819d2ed6292ca16064, 665413819d2ed6292ca16065, 665413819d2ed6292ca16066]
TVShows: [6654138bd9423b0d534ffaf0, 6654138bd9423b0d534ffaf3, 6654138bd9423b0d534ffaf6]
```

## Requirements
 - Ensure to install mongodb and redis which can run locally on default port. You can use docker and expose default port. 
## Endpoints
  - #### See reqeusts.http file in root directory

### 1. Add Item to My List

**Endpoint:**

```sh
POST /my-list/add/list
```
**Description:**
- Adds a movie or TV show to the user's list.
**Headers:**
- `Content-Type: application/json`
- `userId: 6654135df8b78768eae0296b`
**Request Body:**
```json
{
  "contentId": "664f2790bd0129b14fe238ae",
  "contentType": "TVShow"
}
```

### 2. Remove Item from My List
**Endpoint**
```sh
POST /my-list/remove/list
```
**Description:**
- Removes a movie or TV show from the user's list.
**Headers:**
- `Content-Type: application/json`
- `userId: 6654135df8b78768eae0296b`
**Request Body:**

```json
{
  "contentId": "664f2790bd0129b14fe238ae"
}
```

**Response:**
- `200 OK - Item successfully removed from the list.`
- `400 Bad Request - Invalid request parameters.`
- `500 Internal Server Error - An error occurred while processing the request.`

### 3. Get User's My List with Caching and Pagination
**Endpoint**
```sh
GET /my-list/user/list?page=1&limit=10
```
**Description:**
- Retrieves the items in the user's list with pagination and caching optimizations.

**Headers:**
- `userId: 6654135df8b78768eae0296b`

**Query Parameters:**
- `page (optional) - Page number for pagination. Default is 1.`
- `limit (optional) - Number of items per page. Default is 10.`

**Response:**
- `200 OK - List of items in the user's list.`
- `400 Bad Request - Invalid request parameters.`
- `500 Internal Server Error - An error occurred while processing the request.`


## Design Choices
 ### Database Schema:
  Separate schemas for User, Movie, TVShow, and MyList. Indexes on userId in MyList for efficient querying.
  ### Performance:
    - Used indexes and minimzed the necessary response.
    - Caching to store the already fetched MyList information of the user.
    - We can use mongodb sharding and cluster module
  ### Scalability:  
    - Pagination used for listing items to fast and limited retreival.
  ### Assumptions
    - Basic user authentication is in place.
    - Assumed already stored information is valid, skipped extra validation to find records on db
    - MongoDB is used as the primary database.
    - Not found enough time for deployment. [Skipped that part]
  ### Functionality: 
    - Meets all functional requirements.
    - Code Quality: Tried to write modular and cleaner code.
    - Added validation for input.
  ### Design
    - Well-designed API, database schema, and caching strategy.
  ### Testing
    - Integration Test written due to time limitation, few were remained.
    - Could write the unite test cases, if got time.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).