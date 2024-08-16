import { readFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Repository, DeepPartial, getMetadataArgsStorage } from 'typeorm';
import { AppConfig } from '@common/config';
import {
  BaseEntity, User, Country, Artist, ArtistCategory, Artwork, ArtworkGenre, ArtworkMaterial,
  ArtworkTechnique, ArtworkWorktype, Gallery, Exhibition
} from '@modules/app-db/entities';
import * as entities from '@modules/app-db/entities';

const allEntities = Object.values(entities).filter(e => e instanceof Function);

const imageRootPath = "../frontend/public";

function getImage(name: string) {
  const path = `${imageRootPath}/${name}`;
  return readFileSync(path);
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
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(allEntities),
  ],
})
export class CreateDataModule { }

async function main() {
  const app = await NestFactory.create(CreateDataModule);
  const createEntities = async <T>(type: { new(): T }, items: DeepPartial<T>[]) => {
    const repo = app.get<Repository<T>>(getRepositoryToken(type));
    const entities = items.map(item => repo.create(item));
    return repo.save(entities);
  };
  const tables = getMetadataArgsStorage().tables;
  for (const table of tables) {
    if (!(table.target instanceof Function))
      continue;
    const repository = app.get(getRepositoryToken(table.target));
    const tableName = repository.metadata.tableName;
    await repository.query(`TRUNCATE "${tableName}" RESTART IDENTITY CASCADE;`);
  }
  const users = await createEntities(User, [
    {
      "email": "lubo@ivancak.sk",
      "password": "202cb962ac59075b964b07152d234b70",
      "name": "Ľubo Ivančák",
      "description": "<p>grafik, programátor, tvorca počítačových hier</p>",
      "avatar": getImage("users/avatar-01.jpg"),
    }
  ]);
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
      "user": users[0],
    }
  ]);
  const artworks = await createEntities(Artwork, [
    {
      "name": "Liptovské Hole",
      "description": "<p>Liptovské Hole je jedno z typických diel Martina Benku, ktoré zachytáva idylický obraz slovenského vidieka. Dielo zobrazuje skupinu roľníkov pracujúcich na poli počas žatvy. Benka svojím jedinečným štýlom zvýrazňuje dynamiku pohybu a harmóniu medzi človekom a prírodou. V popredí vidíme postavy roľníkov v tradičných krojoch, ktoré sú pre Benku charakteristické. Na pozadí sa rozprestierajú zelené kopce a modrá obloha, čo pridáva obrazu pocit pokoja a rovnováhy. Toto dielo nielen oslavuje pracovný život slovenského ľudu, ale aj krásu a jedinečnosť slovenskej krajiny.</p>",
      "image": getImage("artworks/01.jpg"),
      "year": "1925",
      "measurements": "68 x 43 cm",
      "width": 1,
      "height": 0,
      "artist": artists[0],
      "artworkGenre": artworkGenres[0],
      "artworkWorktype": artworkWorktypes[0],
      "artworkMaterial": artworkMaterials[0],
      "artworkTechnique": artworkTechniques[0],
    },
    {
      "name": "Za dedinou",
      "description": "",
      "image": getImage("artworks/02.jpg"),
      "year": "1920",
      "measurements": "62,5 x 44,5 cm",
      "width": 1,
      "height": 0,
      "artist": artists[1],
      "artworkGenre": artworkGenres[0],
      "artworkWorktype": artworkWorktypes[0],
      "artworkMaterial": artworkMaterials[0],
      "artworkTechnique": artworkTechniques[0],
    },
    {
      "name": "Sklabina Valley",
      "description": "",
      "image": getImage("artworks/03.jpg"),
      "year": "1935",
      "measurements": "132 x 100 cm",
      "width": 1,
      "height": 1,
      "artist": artists[0],
      "artworkGenre": artworkGenres[0],
      "artworkWorktype": artworkWorktypes[0],
      "artworkMaterial": artworkMaterials[0],
      "artworkTechnique": artworkTechniques[0],
    },
    {
      "name": "Z Liptova",
      "description": "",
      "image": getImage("artworks/04.jpg"),
      "year": "1937",
      "measurements": "100 x 132 cm",
      "width": 1,
      "height": 1,
      "artist": artists[0],
      "artworkGenre": artworkGenres[0],
      "artworkWorktype": artworkWorktypes[0],
      "artworkMaterial": artworkMaterials[0],
      "artworkTechnique": artworkTechniques[0],
    },
    {
      "name": "Drevári",
      "description": "",
      "image": getImage("artworks/05.jpg"),
      "year": "1933",
      "measurements": "67 x 46 cm",
      "width": 1,
      "height": 0,
      "artist": artists[0],
      "artworkGenre": artworkGenres[0],
      "artworkWorktype": artworkWorktypes[0],
      "artworkMaterial": artworkMaterials[0],
      "artworkTechnique": artworkTechniques[0],
    },
    {
      "name": "Štúdia – Revúca",
      "description": "",
      "image": getImage("artworks/06.jpg"),
      "year": "1933",
      "measurements": "32.5 x 44 cm",
      "width": 0,
      "height": 0,
      "artist": artists[0],
      "artworkGenre": artworkGenres[0],
      "artworkWorktype": artworkWorktypes[0],
      "artworkMaterial": artworkMaterials[0],
      "artworkTechnique": artworkTechniques[0],
    },
    {
      "name": "WOMEN FARMERS II",
      "description": "",
      "image": getImage("artworks/07.jpg"),
      "year": "1948",
      "measurements": "30 x 40 cm",
      "width": 0,
      "height": 0,
      "artist": artists[0],
      "artworkGenre": artworkGenres[0],
      "artworkWorktype": artworkWorktypes[0],
      "artworkMaterial": artworkMaterials[0],
      "artworkTechnique": artworkTechniques[0],
    },
    {
      "name": "Outside the village",
      "description": "",
      "image": getImage("artworks/08.jpg"),
      "year": "1932",
      "measurements": "62,5 x 44 cm",
      "width": 1,
      "height": 0,
      "artist": artists[0],
      "artworkGenre": artworkGenres[0],
      "artworkWorktype": artworkWorktypes[0],
      "artworkMaterial": artworkMaterials[0],
      "artworkTechnique": artworkTechniques[0],
    },
    {
      "name": "Barn",
      "description": "",
      "image": getImage("artworks/09.jpg"),
      "year": "1929",
      "measurements": "38 x 30 cm",
      "width": 0,
      "height": 0,
      "artist": artists[0],
      "artworkGenre": artworkGenres[0],
      "artworkWorktype": artworkWorktypes[0],
      "artworkMaterial": artworkMaterials[0],
      "artworkTechnique": artworkTechniques[0],
    },
    {
      "name": "MOŘE U CAPRI",
      "description": "",
      "image": getImage("artworks/10.jpg"),
      "year": "1927",
      "measurements": "52 x 35x5 cm",
      "width": 1,
      "height": 0,
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
      "artworks": [artworks[0], artworks[1], artworks[3], artworks[8], artworks[2]],
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
  await app.close();
}

main().catch(e => console.error(e));
