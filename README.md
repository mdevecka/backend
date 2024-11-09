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
# Hardcoded collection ID that will be used for trial mint
EVA_GALLERY_COLLECTION=1;
# Provider for blockchain interaction
WSS_PROVIDER=wss://kusama-asset-hub-rpc.polkadot.io
# Eva gallery wallet address
EVA_GALLERY_WALLET_ADDRESS=DdiySauWxbBeQxUaHzFETA7qhzY53aFiENACtYZQ3Cno127
#Subscan URL
SUBSCAN_URL=https://assethub-kusama.subscan.io
```

## migrations
```
npm run migration:generate ./src/migrations/$MIGRATION_NAME
npm run migration:run
```
