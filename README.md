# Mail Worker

This is a microservice container that processes mail send jobs for the main SPA app. It does this to ensure we do not hit any associated rate limits.

--- 

## Environment variables:

To get this service to work, you need to set a few environment variables. They are documented in `src/env.ts`
