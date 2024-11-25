# E.V.A. Gallery Backend Setup

## example .env config
```
# port on which backend runs
PORT=3000
# frontend url used for CORS
FRONTEND_URL=http://localhost:4200
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
```

## migrations
```
npm run migration:generate ./src/migrations/$MIGRATION_NAME
npm run migration:run
```
