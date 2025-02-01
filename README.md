# E.V.A. Gallery Backend Setup

## example .env config
```
# port on which backend runs
PORT=3000
# frontend url used for CORS and auth callbacks
FRONTEND_URL=http://localhost:4200
# allow CORS for all localhost requests
ALLOW_LOCALHOST_REQUESTS=true
# force send cookies with samesite=none, not recommended for production environments
FORCE_SAMESITE_NONE=false
# address of postgres db
POSTGRES_HOST=127.0.0.1
# port of postgres db
POSTGRES_PORT=5432
# username of postgres db
POSTGRES_USER=postgres
# password of postgres user
POSTGRES_PASSWORD=don't give away your secret!
# main database
POSTGRES_DATABASE=eva-gallery
# duration in seconds until inactive user's session expires
SESSION_LIFETIME=600
# log incoming requests including url, response status and duration
LOG_REQUESTS=true
# URL for NFT MODULE
NFT_MODULE_URL=http://localhost:3000
#Kodadot NFT Explorer
KODADOT_URL=https://kodadot.xyz/ahk 
#Subscan URL
SUBSCAN_URL=https://assethub-kusama.subscan.io
# Server domain used for auth callbacks
AUTH_CALLBACK_DOMAIN=http://localhost:3000
# Frontend route to redirect to after unsuccessful login
AUTH_FAILURE_ROUTE=/failure
# Frontend route to redirect to when user logs in for the first time
AUTH_CREATE_USER_ROUTE=/create-user
# Frontend route to redirect to when user requests password reset
AUTH_RESET_USER_ROUTE=/reset-user
# Google app client ID
GOOGLE_CLIENT_ID=
# Google app client secret
GOOGLE_CLIENT_SECRET=
# Google email used for sending emails
GOOGLE_EMAIL=email@gmail.com
# Google email refresh token
GOOGLE_EMAIL_REFRESH_TOKEN=
# Google email mailbox
GOOGLE_MAILBOX=EMAIL <email@gmail.com>
# AI module base URL
AI_MODULE_URL=http://localhost:5000
# JWT access token secret used for auth between AI module and backend
AI_ACCESS_TOKEN_SECRET=
# Interval in seconds for sending images to AI for processing (defaults to 30)
AI_AUTO_PROCESS_INTERVAL=30
# Pixel limit for AI processing, image is rescaled to limit if exceeded
AI_IMAGE_PIXEL_LIMIT=10000000
# Folder for static images generated from public images; if empty no static images will be generated 
STATIC_FILE_ROOT=static
```

## migrations
```
npm run migration:generate ./src/migrations/$MIGRATION_NAME
npm run migration:run
```
