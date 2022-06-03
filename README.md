# Wordpress Auth Nuxt3, Wp-graphql ans Tailwind

This is a boilerplate for Nuxt3 with Wordpress backend and WP-graphql.

## Usage

You need to install WP-graphql and WP-graphql-jwt-authentication plugins in your wordpress backend

ivanmartin33/wp-graphql-jwt-authentication:feature/add-set-cookies-option


### Nuxt3 and GraphQL

In Nuxt3, you can use the following module for GraphQL : 
https://nuxt-graphql-client.web.app/


### Auth

You can use the composable useAuth() for authenticate with JWT and WP-graphql backend.

The backend sent a X-Refresh cookie with the refresh token from wp-graphql-jwt-authentication
# Setup Nuxt3

Make sure to install the dependencies:

```bash
# yarn
yarn install

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```
