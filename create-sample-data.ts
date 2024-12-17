import { readFileSync } from 'fs';
import { hash } from 'bcrypt';
import * as sharp from 'sharp';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Repository, DataSource, DeepPartial, getMetadataArgsStorage } from 'typeorm';
import { AppConfig } from '@modules/config';
import { filterEntities } from '@common/helpers';
import { randomUUID } from 'crypto';
import {
  BaseEntity, User, Country, Artist, ArtistCategory, Artwork, ArtworkGenre, ArtworkMaterial,
  ArtworkTechnique, ArtworkWorktype, Gallery, Exhibition, Nft, Resource,
  UnityRoom, UnityWall, UnityImage, UnityLamp, UnityItem, UnityItemType,
  LoginType
} from '@modules/app-db/entities';
import * as entities from '@modules/app-db/entities';

const allEntities = filterEntities(Object.values(entities));

const imageRootPath = "../frontend/public";
const imageCache = new Map<string, Buffer>();

function getImage(name: string) {
  const path = `${imageRootPath}/${name}`;
  let imageData = imageCache.get(path);
  if (imageData == null) {
    imageData = readFileSync(path);
    imageCache.set(path, imageData);
  }
  return imageData;
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<AppConfig>) => ({
        type: 'postgres',
        host: config.get("POSTGRES_HOST"),
        port: parseInt(config.get("POSTGRES_PORT")),
        username: config.get("POSTGRES_USER"),
        password: config.get("POSTGRES_PASSWORD"),
        database: config.get("POSTGRES_DATABASE"),
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
        dropSchema: true,
        migrationsTableName: "migration",
        migrations: ["src/migrations/*.ts"],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(allEntities),
  ],
})
export class CreateDataModule { }

async function main() {
  const app = await NestFactory.create(CreateDataModule);
  const dataSource = app.get(DataSource);
  const onlyOptions = process.argv.some(opt => opt === "-oo");
  try {
    await dataSource.transaction(async manager => {
      const createEntities = async <T>(type: { new(): T }, items: DeepPartial<T>[]) => {
        const repo = manager.getRepository<T>(type);
        const entities = items.map(item => repo.create(item));
        return repo.save(entities);
      };
      const countries = await createEntities(Country, [
        {
          "name": "Afghanistan",
          "code": "AF"
        },
        {
          "name": "Albania",
          "code": "AL"
        },
        {
          "name": "Algeria",
          "code": "DZ"
        },
        {
          "name": "Andorra",
          "code": "AD"
        },
        {
          "name": "Angola",
          "code": "AO"
        },
        {
          "name": "Antigua and Barbuda",
          "code": "AG"
        },
        {
          "name": "Argentina",
          "code": "AR"
        },
        {
          "name": "Armenia",
          "code": "AM"
        },
        {
          "name": "Australia",
          "code": "AU"
        },
        {
          "name": "Austria",
          "code": "AT"
        },
        {
          "name": "Azerbaijan",
          "code": "AZ"
        },
        {
          "name": "Bahamas",
          "code": "BS"
        },
        {
          "name": "Bahrain",
          "code": "BH"
        },
        {
          "name": "Bangladesh",
          "code": "BD"
        },
        {
          "name": "Barbados",
          "code": "BB"
        },
        {
          "name": "Belarus",
          "code": "BY"
        },
        {
          "name": "Belgium",
          "code": "BE"
        },
        {
          "name": "Belize",
          "code": "BZ"
        },
        {
          "name": "Benin",
          "code": "BJ"
        },
        {
          "name": "Bhutan",
          "code": "BT"
        },
        {
          "name": "Bolivia",
          "code": "BO"
        },
        {
          "name": "Bosnia and Herzegovina",
          "code": "BA"
        },
        {
          "name": "Botswana",
          "code": "BW"
        },
        {
          "name": "Brazil",
          "code": "BR"
        },
        {
          "name": "Brunei Darussalam",
          "code": "BN"
        },
        {
          "name": "Bulgaria",
          "code": "BG"
        },
        {
          "name": "Burkina Faso",
          "code": "BF"
        },
        {
          "name": "Burundi",
          "code": "BI"
        },
        {
          "name": "Cabo Verde",
          "code": "CV"
        },
        {
          "name": "Cambodia",
          "code": "KH"
        },
        {
          "name": "Cameroon",
          "code": "CM"
        },
        {
          "name": "Canada",
          "code": "CA"
        },
        {
          "name": "Central African Republic",
          "code": "CF"
        },
        {
          "name": "Chad",
          "code": "TD"
        },
        {
          "name": "Chile",
          "code": "CL"
        },
        {
          "name": "China",
          "code": "CN"
        },
        {
          "name": "Colombia",
          "code": "CO"
        },
        {
          "name": "Comoros",
          "code": "KM"
        },
        {
          "name": "Congo",
          "code": "CG"
        },
        {
          "name": "Costa Rica",
          "code": "CR"
        },
        {
          "name": "Croatia",
          "code": "HR"
        },
        {
          "name": "Cuba",
          "code": "CU"
        },
        {
          "name": "Cyprus",
          "code": "CY"
        },
        {
          "name": "Czech Republic",
          "code": "CZ"
        },
        {
          "name": "Denmark",
          "code": "DK"
        },
        {
          "name": "Djibouti",
          "code": "DJ"
        },
        {
          "name": "Dominica",
          "code": "DM"
        },
        {
          "name": "Dominican Republic",
          "code": "DO"
        },
        {
          "name": "Ecuador",
          "code": "EC"
        },
        {
          "name": "Egypt",
          "code": "EG"
        },
        {
          "name": "El Salvador",
          "code": "SV"
        },
        {
          "name": "Equatorial Guinea",
          "code": "GQ"
        },
        {
          "name": "Eritrea",
          "code": "ER"
        },
        {
          "name": "Estonia",
          "code": "EE"
        },
        {
          "name": "Eswatini",
          "code": "SZ"
        },
        {
          "name": "Ethiopia",
          "code": "ET"
        },
        {
          "name": "Fiji",
          "code": "FJ"
        },
        {
          "name": "Finland",
          "code": "FI"
        },
        {
          "name": "France",
          "code": "FR"
        },
        {
          "name": "Gabon",
          "code": "GA"
        },
        {
          "name": "Gambia",
          "code": "GM"
        },
        {
          "name": "Georgia",
          "code": "GE"
        },
        {
          "name": "Germany",
          "code": "DE"
        },
        {
          "name": "Ghana",
          "code": "GH"
        },
        {
          "name": "Greece",
          "code": "GR"
        },
        {
          "name": "Grenada",
          "code": "GD"
        },
        {
          "name": "Guatemala",
          "code": "GT"
        },
        {
          "name": "Guinea",
          "code": "GN"
        },
        {
          "name": "Guinea-Bissau",
          "code": "GW"
        },
        {
          "name": "Guyana",
          "code": "GY"
        },
        {
          "name": "Haiti",
          "code": "HT"
        },
        {
          "name": "Honduras",
          "code": "HN"
        },
        {
          "name": "Hungary",
          "code": "HU"
        },
        {
          "name": "Iceland",
          "code": "IS"
        },
        {
          "name": "India",
          "code": "IN"
        },
        {
          "name": "Indonesia",
          "code": "ID"
        },
        {
          "name": "Iran",
          "code": "IR"
        },
        {
          "name": "Iraq",
          "code": "IQ"
        },
        {
          "name": "Ireland",
          "code": "IE"
        },
        {
          "name": "Israel",
          "code": "IL"
        },
        {
          "name": "Italy",
          "code": "IT"
        },
        {
          "name": "Jamaica",
          "code": "JM"
        },
        {
          "name": "Japan",
          "code": "JP"
        },
        {
          "name": "Jordan",
          "code": "JO"
        },
        {
          "name": "Kazakhstan",
          "code": "KZ"
        },
        {
          "name": "Kenya",
          "code": "KE"
        },
        {
          "name": "Kiribati",
          "code": "KI"
        },
        {
          "name": "Korea (North)",
          "code": "KP"
        },
        {
          "name": "Korea (South)",
          "code": "KR"
        },
        {
          "name": "Kuwait",
          "code": "KW"
        },
        {
          "name": "Kyrgyzstan",
          "code": "KG"
        },
        {
          "name": "Laos",
          "code": "LA"
        },
        {
          "name": "Latvia",
          "code": "LV"
        },
        {
          "name": "Lebanon",
          "code": "LB"
        },
        {
          "name": "Lesotho",
          "code": "LS"
        },
        {
          "name": "Liberia",
          "code": "LR"
        },
        {
          "name": "Libya",
          "code": "LY"
        },
        {
          "name": "Liechtenstein",
          "code": "LI"
        },
        {
          "name": "Lithuania",
          "code": "LT"
        },
        {
          "name": "Luxembourg",
          "code": "LU"
        },
        {
          "name": "Madagascar",
          "code": "MG"
        },
        {
          "name": "Malawi",
          "code": "MW"
        },
        {
          "name": "Malaysia",
          "code": "MY"
        },
        {
          "name": "Maldives",
          "code": "MV"
        },
        {
          "name": "Mali",
          "code": "ML"
        },
        {
          "name": "Malta",
          "code": "MT"
        },
        {
          "name": "Marshall Islands",
          "code": "MH"
        },
        {
          "name": "Mauritania",
          "code": "MR"
        },
        {
          "name": "Mauritius",
          "code": "MU"
        },
        {
          "name": "Mexico",
          "code": "MX"
        },
        {
          "name": "Micronesia",
          "code": "FM"
        },
        {
          "name": "Moldova",
          "code": "MD"
        },
        {
          "name": "Monaco",
          "code": "MC"
        },
        {
          "name": "Mongolia",
          "code": "MN"
        },
        {
          "name": "Montenegro",
          "code": "ME"
        },
        {
          "name": "Morocco",
          "code": "MA"
        },
        {
          "name": "Mozambique",
          "code": "MZ"
        },
        {
          "name": "Myanmar",
          "code": "MM"
        },
        {
          "name": "Namibia",
          "code": "NA"
        },
        {
          "name": "Nauru",
          "code": "NR"
        },
        {
          "name": "Nepal",
          "code": "NP"
        },
        {
          "name": "Netherlands",
          "code": "NL"
        },
        {
          "name": "New Zealand",
          "code": "NZ"
        },
        {
          "name": "Nicaragua",
          "code": "NI"
        },
        {
          "name": "Niger",
          "code": "NE"
        },
        {
          "name": "Nigeria",
          "code": "NG"
        },
        {
          "name": "North Macedonia",
          "code": "MK"
        },
        {
          "name": "Norway",
          "code": "NO"
        },
        {
          "name": "Oman",
          "code": "OM"
        },
        {
          "name": "Pakistan",
          "code": "PK"
        },
        {
          "name": "Palau",
          "code": "PW"
        },
        {
          "name": "Panama",
          "code": "PA"
        },
        {
          "name": "Papua New Guinea",
          "code": "PG"
        },
        {
          "name": "Paraguay",
          "code": "PY"
        },
        {
          "name": "Peru",
          "code": "PE"
        },
        {
          "name": "Philippines",
          "code": "PH"
        },
        {
          "name": "Poland",
          "code": "PL"
        },
        {
          "name": "Portugal",
          "code": "PT"
        },
        {
          "name": "Qatar",
          "code": "QA"
        },
        {
          "name": "Romania",
          "code": "RO"
        },
        {
          "name": "Russia",
          "code": "RU"
        },
        {
          "name": "Rwanda",
          "code": "RW"
        },
        {
          "name": "Saint Kitts and Nevis",
          "code": "KN"
        },
        {
          "name": "Saint Lucia",
          "code": "LC"
        },
        {
          "name": "Saint Vincent and the Grenadines",
          "code": "VC"
        },
        {
          "name": "Samoa",
          "code": "WS"
        },
        {
          "name": "San Marino",
          "code": "SM"
        },
        {
          "name": "Sao Tome and Principe",
          "code": "ST"
        },
        {
          "name": "Saudi Arabia",
          "code": "SA"
        },
        {
          "name": "Senegal",
          "code": "SN"
        },
        {
          "name": "Serbia",
          "code": "RS"
        },
        {
          "name": "Seychelles",
          "code": "SC"
        },
        {
          "name": "Sierra Leone",
          "code": "SL"
        },
        {
          "name": "Singapore",
          "code": "SG"
        },
        {
          "name": "Slovakia",
          "code": "SK"
        },
        {
          "name": "Slovenia",
          "code": "SI"
        },
        {
          "name": "Solomon Islands",
          "code": "SB"
        },
        {
          "name": "Somalia",
          "code": "SO"
        },
        {
          "name": "South Africa",
          "code": "ZA"
        },
        {
          "name": "South Sudan",
          "code": "SS"
        },
        {
          "name": "Spain",
          "code": "ES"
        },
        {
          "name": "Sri Lanka",
          "code": "LK"
        },
        {
          "name": "Sudan",
          "code": "SD"
        },
        {
          "name": "Suriname",
          "code": "SR"
        },
        {
          "name": "Sweden",
          "code": "SE"
        },
        {
          "name": "Switzerland",
          "code": "CH"
        },
        {
          "name": "Syria",
          "code": "SY"
        },
        {
          "name": "Taiwan",
          "code": "TW"
        },
        {
          "name": "Tajikistan",
          "code": "TJ"
        },
        {
          "name": "Tanzania",
          "code": "TZ"
        },
        {
          "name": "Thailand",
          "code": "TH"
        },
        {
          "name": "Timor-Leste",
          "code": "TL"
        },
        {
          "name": "Togo",
          "code": "TG"
        },
        {
          "name": "Tonga",
          "code": "TO"
        },
        {
          "name": "Trinidad and Tobago",
          "code": "TT"
        },
        {
          "name": "Tunisia",
          "code": "TN"
        },
        {
          "name": "Turkey",
          "code": "TR"
        },
        {
          "name": "Turkmenistan",
          "code": "TM"
        },
        {
          "name": "Tuvalu",
          "code": "TV"
        },
        {
          "name": "Uganda",
          "code": "UG"
        },
        {
          "name": "Ukraine",
          "code": "UA"
        },
        {
          "name": "United Arab Emirates",
          "code": "AE"
        },
        {
          "name": "United Kingdom",
          "code": "GB"
        },
        {
          "name": "United States",
          "code": "US"
        },
        {
          "name": "Uruguay",
          "code": "UY"
        },
        {
          "name": "Uzbekistan",
          "code": "UZ"
        },
        {
          "name": "Vanuatu",
          "code": "VU"
        },
        {
          "name": "Vatican City",
          "code": "VA"
        },
        {
          "name": "Venezuela",
          "code": "VE"
        },
        {
          "name": "Vietnam",
          "code": "VN"
        },
        {
          "name": "Yemen",
          "code": "YE"
        },
        {
          "name": "Zambia",
          "code": "ZM"
        },
        {
          "name": "Zimbabwe",
          "code": "ZW"
        }
      ]);
      const artworkGenres = await createEntities(ArtworkGenre, [
        {
          "name": "Landscape"
        },
        {
          "name": "Portrait"
        },
        {
          "name": "Akt"
        }
      ]);
      const artworkMaterials = await createEntities(ArtworkMaterial, [
        {
          "name": "Canvas"
        },
        {
          "name": "Paper"
        }
      ]);
      const artworkTechniques = await createEntities(ArtworkTechnique, [
        {
          "name": "Acrylic"
        }
      ]);
      const artworkWorktypes = await createEntities(ArtworkWorktype, [
        {
          "name": "Oil painting"
        },
        {
          "name": "Drawing"
        },
        {
          "name": "Photography"
        },
        {
          "name": "Graphics"
        }
      ]);
      const artistCategories = await createEntities(ArtistCategory, [
        {
          "name": "Painter"
        },
        {
          "name": "Photographer"
        }
      ]);
      const itemTypes = await createEntities(UnityItemType, [
        {
          "name": "Plant-01"
        },
        {
          "name": "Plant-02"
        },
        {
          "name": "Plant-03"
        },
        {
          "name": "Plant-04"
        },
        {
          "name": "Plant-05"
        },
        {
          "name": "Bench-01"
        },
        {
          "name": "Bench-02"
        },
        {
          "name": "Bench-03"
        },
        {
          "name": "Bench-04"
        },
        {
          "name": "Bench-05"
        },
        {
          "name": "Figure-01"
        },
        {
          "name": "Figure-02"
        },
        {
          "name": "Figure-03"
        }
      ]);
      if (onlyOptions)
        return;
      const nfts = await createEntities(entities.Nft, [
        {
          artwork: null,
          wallet: null,
          nftData: {
            id: "425-8",
            name: "Random NFT",
            description: "NFT meta",
            image: "https://ipfs.io/ipfs/bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7aay",
          },
        },
        {
          artwork: null,
          wallet: null,
          nftData: {
            id: "425-9",
            name: "Random NFT 2",
            description: "Great artwork",
            image: "https://ipfs.io/ipfs/bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7bby",
          }
        },
        {
          artwork: null,
          wallet: null,
          nftData: {
            id: "425-10",
            name: "Random NFT 3",
            description: "Great artwork",
            image: "https://ipfs.io/ipfs/bafybhdmeoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7bby",
          }
        },
        {
          artwork: null,
          wallet: null,
          nftData: {
            id: "u-425-11",
            name: "Random NFT 4",
            description: "Great artwork",
            image: "https://ipfs.io/ipfs/bafybhdeeqqiema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7bby",
          }
        }
      ]);
      const collections = await createEntities(entities.Collection, [
        {
          wallet: null,
          colData: {
            id: "425-8",
            name: "Random Col",
            description: "Great collection",
            image: "https://ipfs.io/ipfs/bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7eey",
          },
          nfts: [nfts[0]],
        },
        {
          wallet: null,
          colData: {
            id: "425-9",
            name: "Random Col 2",
            description: "Col metadata",
            image: "https://ipfs.io/ipfs/bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp722y",
          },
          nfts: [nfts[1]],
        }
      ]);
      const wallets = await createEntities(entities.Wallet, [
        {
          walletAddress: "0x1234567890",
          nfts: [nfts[0], nfts[2], nfts[3]],
          collections: [collections[0]],
        },
        {
          walletAddress: "0x0987654321",
          nfts: [nfts[1]],
          collections: [collections[1]],
        },
      ]);
      const users = await createEntities(User, [
        {
          "email": "lubo@ivancak.sk",
          "password": await hash("test", 10),
          "loginType": LoginType.Credentials,
          "name": "Ľubo Ivančák",
          "description": "<p>grafik, programátor, tvorca počítačových hier</p>",
          "avatar": { buffer: getImage("users/avatar-01.jpg"), mimeType: "image/jpeg" },
          "wallets": [wallets[0]],
        },
        {
          "email": "john.snow@winterfell.castle",
          "password": await hash("niteking", 10),
          "loginType": LoginType.Credentials,
          "name": "John Snow",
          "description": "Lord Commander of the Night's Watch",
          "avatar": { buffer: getImage("users/avatar-01.jpg"), mimeType: "image/jpeg" },
          "wallets": [wallets[1]],
        }
      ]);
      const resources = await createEntities(Resource, [
        {
          name: "great song",
          data: readFileSync("./samples/sound 22.mp3"),
          mimeType: "audio/mpeg",
          user: users[0],
        },
        {
          name: "desert environment",
          data: getImage("artworks/01.jpg"),
          mimeType: "image/jpeg",
          user: users[0],
        },
      ]);
      const artists = await createEntities(Artist, [
        {
          "name": "Martin Benka",
          "born": "1888-09-21",
          "biography": "<p>Zakladateľ moderného slovenského prejavu v maľbe a v kresbe. Venoval sa gobelínovej tvorbe, scénickému výtvarníctvu, hudbe a husliarstvu. </p>",
          "country": countries.find(c => c.code === "SK"),
          "artistCategory": artistCategories[0],
          "user": users[0],
        },
        {
          "name": "Peter Koloman",
          "born": "1975-05-04",
          "biography": "<p>Peter Koloman sa narodil v Bratislave, kde od malička prejavoval záujem o umenie a fotografiu. Jeho prvý fotoaparát dostal od svojho otca, ktorý ho inšpiroval k objavovaniu krásy okolo seba. Počas štúdií na Vysokej škole výtvarných umení sa zameriaval na portrétnu fotografiu a dokumentárne snímanie.</p>",
          "country": countries.find(c => c.code === "SK"),
          "artistCategory": artistCategories[1],
          "user": users[1],
        },
      ]);
      const artworks = await createEntities(Artwork, [
        {
          "name": "Liptovské Hole",
          "description": "<p>Liptovské Hole je jedno z typických diel Martina Benku, ktoré zachytáva idylický obraz slovenského vidieka. Dielo zobrazuje skupinu roľníkov pracujúcich na poli počas žatvy. Benka svojím jedinečným štýlom zvýrazňuje dynamiku pohybu a harmóniu medzi človekom a prírodou. V popredí vidíme postavy roľníkov v tradičných krojoch, ktoré sú pre Benku charakteristické. Na pozadí sa rozprestierajú zelené kopce a modrá obloha, čo pridáva obrazu pocit pokoja a rovnováhy. Toto dielo nielen oslavuje pracovný život slovenského ľudu, ale aj krásu a jedinečnosť slovenskej krajiny.</p>",
          "image": { id: randomUUID(), buffer: getImage("artworks/01.jpg"), mimeType: "image/jpeg" },
          "year": "1925",
          "measurements": "68 x 43 cm",
          "artist": artists[0],
          "artworkGenre": artworkGenres[0],
          "artworkWorktype": artworkWorktypes[0],
          "artworkMaterial": artworkMaterials[0],
          "artworkTechnique": artworkTechniques[0],
          "nft": nfts[0],
        },
        {
          "name": "Za dedinou",
          "description": "",
          "image": { id: randomUUID(), buffer: getImage("artworks/02.jpg"), mimeType: "image/jpeg" },
          "year": "1920",
          "measurements": "62,5 x 44,5 cm",
          "artist": artists[1],
          "artworkGenre": artworkGenres[0],
          "artworkWorktype": artworkWorktypes[0],
          "artworkMaterial": artworkMaterials[0],
          "artworkTechnique": artworkTechniques[0],
        },
        {
          "name": "Sklabina Valley",
          "description": "",
          "image": { id: randomUUID(), buffer: getImage("artworks/03.jpg"), mimeType: "image/jpeg" },
          "year": "1935",
          "measurements": "132 x 100 cm",
          "artist": artists[0],
          "artworkGenre": artworkGenres[0],
          "artworkWorktype": artworkWorktypes[0],
          "artworkMaterial": artworkMaterials[0],
          "artworkTechnique": artworkTechniques[0],
        },
        {
          "name": "Z Liptova",
          "description": "",
          "image": { id: randomUUID(), buffer: getImage("artworks/04.jpg"), mimeType: "image/jpeg" },
          "year": "1937",
          "measurements": "100 x 132 cm",
          "artist": artists[0],
          "artworkGenre": artworkGenres[0],
          "artworkWorktype": artworkWorktypes[0],
          "artworkMaterial": artworkMaterials[0],
          "artworkTechnique": artworkTechniques[0],
        },
        {
          "name": "Drevári",
          "description": "",
          "image": { id: randomUUID(), buffer: getImage("artworks/05.jpg"), mimeType: "image/jpeg" },
          "year": "1933",
          "measurements": "67 x 46 cm",
          "artist": artists[0],
          "artworkGenre": artworkGenres[0],
          "artworkWorktype": artworkWorktypes[0],
          "artworkMaterial": artworkMaterials[0],
          "artworkTechnique": artworkTechniques[0],
        },
        {
          "name": "Štúdia – Revúca",
          "description": "",
          "image": { id: randomUUID(), buffer: getImage("artworks/06.jpg"), mimeType: "image/jpeg" },
          "year": "1933",
          "measurements": "32.5 x 44 cm",
          "artist": artists[0],
          "artworkGenre": artworkGenres[0],
          "artworkWorktype": artworkWorktypes[0],
          "artworkMaterial": artworkMaterials[0],
          "artworkTechnique": artworkTechniques[0],
        },
        {
          "name": "WOMEN FARMERS II",
          "description": "",
          "image": { id: randomUUID(), buffer: getImage("artworks/07.jpg"), mimeType: "image/jpeg" },
          "year": "1948",
          "measurements": "30 x 40 cm",
          "artist": artists[0],
          "artworkGenre": artworkGenres[0],
          "artworkWorktype": artworkWorktypes[0],
          "artworkMaterial": artworkMaterials[0],
          "artworkTechnique": artworkTechniques[0],
        },
        {
          "name": "Outside the village",
          "description": "",
          "image": { id: randomUUID(), buffer: getImage("artworks/08.jpg"), mimeType: "image/jpeg" },
          "year": "1932",
          "measurements": "62,5 x 44 cm",
          "artist": artists[0],
          "artworkGenre": artworkGenres[0],
          "artworkWorktype": artworkWorktypes[0],
          "artworkMaterial": artworkMaterials[0],
          "artworkTechnique": artworkTechniques[0],
        },
        {
          "name": "Barn",
          "description": "",
          "image": { id: randomUUID(), buffer: getImage("artworks/09.jpg"), mimeType: "image/jpeg" },
          "year": "1929",
          "measurements": "38 x 30 cm",
          "artist": artists[0],
          "artworkGenre": artworkGenres[0],
          "artworkWorktype": artworkWorktypes[0],
          "artworkMaterial": artworkMaterials[0],
          "artworkTechnique": artworkTechniques[0],
        },
        {
          "name": "MOŘE U CAPRI",
          "description": "",
          "image": { id: randomUUID(), buffer: getImage("artworks/10.jpg"), mimeType: "image/jpeg" },
          "year": "1927",
          "measurements": "52 x 35x5 cm",
          "artist": artists[0],
          "artworkGenre": artworkGenres[0],
          "artworkWorktype": artworkWorktypes[0],
          "artworkMaterial": artworkMaterials[0],
          "artworkTechnique": artworkTechniques[0],
        }
      ]);
      const galleries = await createEntities(Gallery, [
        {
          "name": "Slovenská národná galéria",
          "description": "<p>Slovenská národná galéria je v zriaďovacej listine definovaná ako najvyššia a centrálna galerijná inštitúcia Slovenska.\\r\\n</p><p>Táto požiadavka sa postupne napĺňala prostredníctvom činnosti galérie. SNG možno chápať ako zbierkotvornú galerijnú inštitúciu, ktorá plní očakávania odbornej i širokej verejnosti: Jej úlohou je rozvíjať sa ako celonárodná umenovedná inštitúcia a zároveň zbierať, chrániť a interpretovať umelecké diela v domácom i v medzinárodnom priestore.</p>",
          "address": "Riečna 1\n810 01 Bratislava",
          "gps": "48.1404819N, 17.1078978E",
          "country": countries.find(c => c.code === "SK"),
          "user": users[0],
        },
        {
          "name": "Schaubmarov mlyn",
          "description": "",
          "address": "Pezinok",
          "gps": "",
          "country": countries.find(c => c.code === "SK"),
          "user": users[0],
        },
        {
          "name": "Galéria Ľudovíta Fullu",
          "description": "",
          "address": "Ružomberok",
          "gps": "",
          "country": countries.find(c => c.code === "SK"),
          "user": users[0],
        },
        {
          "name": "Zvolenský zámok",
          "description": "",
          "address": "Zvolen",
          "gps": "",
          "country": countries.find(c => c.code === "SK"),
          "user": users[0],
        },
        {
          "name": "Kaštieľ Strážky",
          "description": "",
          "address": "Spišská Belá-Strážky",
          "gps": "",
          "country": countries.find(c => c.code === "SK"),
          "user": users[0],
        }
      ]);
      const exhibitions = await createEntities(Exhibition, [
        {
          "name": "Jarná výstava 2024",
          "fromDate": "2024-06-14",
          "toDate": "2024-06-29",
          "curator": "Tomáš Lukačka",
          "gallery": galleries[0],
          "artworks": [artworks[0], artworks[3], artworks[8], artworks[2]],
        },
        {
          "name": "Naše leto",
          "fromDate": "2024-06-29",
          "toDate": "2024-07-27",
          "curator": "Tomáš Lukačka",
          "gallery": galleries[3],
          "artworks": [artworks[7], artworks[9]],
        }
      ]);
      const items = await createEntities(UnityItem, [
        {
          "itemType": itemTypes[0],
          "x": 3.8,
          "y": 0.0,
          "z": 4.2,
          "rotation": 0
        },
        {
          "itemType": itemTypes[1],
          "x": -4,
          "y": 0.0,
          "z": 4,
          "rotation": -180
        },
        {
          "itemType": itemTypes[3],
          "x": 2.8,
          "y": 0.0,
          "z": -1.5,
          "rotation": 0
        },
        {
          "itemType": itemTypes[5],
          "x": 2.7,
          "y": 0.0,
          "z": 0,
          "rotation": 90
        },
        {
          "itemType": itemTypes[6],
          "x": -1.6,
          "y": 0.0,
          "z": 2.6,
          "rotation": 0
        },
        {
          "itemType": itemTypes[10],
          "x": -2.6,
          "y": 0.0,
          "z": 0.32,
          "rotation": -74
        },
        {
          "itemType": itemTypes[11],
          "x": 1.6,
          "y": 0.0,
          "z": 2.6,
          "rotation": 0
        },
        {
          "itemType": itemTypes[12],
          "x": -1.6,
          "y": 0.0,
          "z": -3.0,
          "rotation": -180
        }
      ]);
      const lamps = await createEntities(UnityLamp, [
        {
          "x": 0,
          "y": 3.5,
          "z": 0,
          "range": 10,
          "shadow": true
        },
        {
          "x": -3,
          "y": 3.5,
          "z": -2,
          "range": 10,
          "shadow": false
        },
        {
          "x": 1.5,
          "y": 3.5,
          "z": -1.8,
          "range": 10,
          "shadow": false
        }
      ]);
      const images = await createEntities(UnityImage, [
        {
          "artwork": artworks[0],
          "x": 2,
          "y": 1.8,
          "scale": 2
        },
        {
          "artwork": artworks[0],
          "x": 4,
          "y": 1.4,
          "scale": 2
        },
        {
          "artwork": artworks[2],
          "x": 7,
          "y": 1.6,
          "scale": 1.8
        },
        {
          "artwork": artworks[4],
          "x": 2,
          "y": 1.6,
          "scale": 2
        },
        {
          "artwork": artworks[8],
          "x": 4,
          "y": 1.6,
          "scale": 2
        },
        {
          "artwork": artworks[5],
          "x": 6,
          "y": 1.6,
          "scale": 2
        },
        {
          "artwork": artworks[5],
          "x": 2,
          "y": 1.4,
          "scale": 2
        },
        {
          "artwork": artworks[6],
          "x": 4,
          "y": 1.6,
          "scale": 3
        },
        {
          "artwork": artworks[7],
          "x": 6,
          "y": 1.6,
          "scale": 2
        }
      ]);
      const walls = await createEntities(UnityWall, [
        {
          "x": 0,
          "y": 0,
          "z": 5,
          "rotation": 0,
          "width": 10,
          "height": 3.6,
          "thick": 0.15,
          "color": "#3983bb",
          "images": [images[0], images[1], images[2]],
        },
        {
          "x": 5,
          "y": 0,
          "z": 0,
          "rotation": 90,
          "width": 10,
          "height": 3.6,
          "thick": 0.15,
          "color": "#bb6739",
          "images": [images[3], images[4], images[5]],
        },
        {
          "x": 1.5,
          "y": 0,
          "z": -5,
          "rotation": 180,
          "width": 7,
          "height": 3.6,
          "thick": 0.15,
          "color": "#f2d4c4",
          "images": [images[6], images[7], images[8]],
        },
        {
          "x": 0,
          "y": 0,
          "z": 10,
          "rotation": 180,
          "width": 10,
          "height": 3.6,
          "thick": 0.15,
          "color": "#aaa",
          "opacity": 1,
          "artwork": artworks[9],
        },
      ]);
      const rooms = await createEntities(UnityRoom, [
        {
          "name": "Malá sála",
          "x": 0,
          "y": 0,
          "width": 10,
          "length": 10,
          "height": 3.6,
          "walls": walls,
          "lamps": lamps,
          "items": items,
          "exhibition": exhibitions[0],
          "environmentImage": resources[1],
          "backgroundMusic": resources[0],
        }
      ]);
    });
  }
  finally {
    await app.close();
  }
}

main().catch(e => console.error(e));
