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
# Secret 12/24 word phrase for wallet that will do trialmint
WALLET_SECRET_KEY: string;
# URL for NFT MODULE
NFT_MODULE_URL: string;
# Hardcoded collection ID that will be used for trial mint
EVA_GALLERY_COLLECTION: string;
# IPFS node URL address
IPFS_URL: string;
# IPFS node user name authentification
IPFS_NAME: string;
# IPFS node password authentification
IPFS_PASSWORD: string;
# Provider for blockchain interaction
WSS_PROVIDER: string;
# Eva gallery wallet address
EVA_GALLERY_WALLET_ADDRESS: string;
```

## migrations
```
npm run migration:generate ./src/migrations/$MIGRATION_NAME
npm run migration:run
```
