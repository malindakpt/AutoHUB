export class Settings {
  public static LOGIN_TIMEOUT = 3000;
  public static ALLOW_ADS = false;
  public static NEWS_FETCH_COUNT = 10;
  public static SEARCH_VEHICLE_FETCH_COUNT = 10;
  public static SEARCH_VEHICLE_YEAR_GAP = 5;
  public static AD_FREQ_NEWS = 1000;
  public static AD_FREQ_VEHICLE_NEWS = 1000;
  public static VEHICLE_CATEGORIES = [
    { key: 1, val: 'Bus'},
    { key: 2, val: 'Van'},
    { key: 3, val: 'Car Sedan'},
    { key: 4, val: 'Car Hatchback'},
    { key: 5, val: 'Car Wagon'},
    { key: 6, val: 'Car CUV'},
    { key: 7, val: 'SUV'},
    { key: 8, val: 'Pickup'},
    { key: 9, val: 'Truck Container'},
    { key: 10, val: 'Truck Mini'},
    { key: 11, val: 'Truck 4-wheels'},
    { key: 12, val: 'Truck 6-wheels'},
    { key: 13, val: 'Truck 10-wheels'},
    { key: 14, val: '3-wheeler'},
    { key: 15, val: 'Bike'},
    ];
  public static VEHICLE_BRANDS = [
    { key: 1, val: 'AUDI'},
    { key: 2, val: 'AUSTIN'},
    { key: 3, val: 'BAJAJ'},
    { key: 4, val: 'BMW'},
    { key: 5, val: 'CHERY'},
    { key: 6, val: 'CHEVROLET'},
    { key: 7, val: 'CHRYSLER'},
    { key: 8, val: 'CITROEN'},
    { key: 9, val: 'DAEWOO'},
    { key: 10, val: 'DAIHATSU'},
    { key: 11, val: 'DATSUN'},
    { key: 12, val: 'DEMARK'},
    { key: 13, val: 'DFSK'},
    { key: 14, val: 'EICHER'},
    { key: 15, val: 'FIAT'},
    { key: 16, val: 'FORD'},
    { key: 17, val: 'GEELY'},
    { key: 18, val: 'HERO'},
    { key: 19, val: 'HILLMAN'},
    { key: 20, val: 'HONDA'},
    { key: 21, val: 'HYUNDAI'},
    { key: 22, val: 'ISUZU'},
    { key: 23, val: 'JAGUAR'},
    { key: 24, val: 'JEEP'},
    { key: 25, val: 'JMC'},
    { key: 26, val: 'JONWAY'},
    { key: 27, val: 'KIA'},
    { key: 28, val: 'LAND ROVER'},
    { key: 29, val: 'LEXUS'},
    { key: 30, val: 'LEYLAND'},
    { key: 31, val: 'MAHINDRA'},
    { key: 32, val: 'MARUTI SUZUKI'},
    { key: 33, val: 'MAZDA'},
    { key: 34, val: 'MERCEDES BENZ'},
    { key: 35, val: 'MG'},
    { key: 36, val: 'MICRO'},
    { key: 37, val: 'MINI'},
    { key: 38, val: 'MITSUBISHI'},
    { key: 39, val: 'MORRIS'},
    { key: 40, val: 'NISSAN'},
    { key: 41, val: 'OPEL'},
    { key: 42, val: 'PERODUA'},
    { key: 43, val: 'PEUGEOT'},
    { key: 44, val: 'PORSCHE'},
    { key: 45, val: 'PROTON'},
    { key: 46, val: 'RENAULT'},
    { key: 47, val: 'ROVER'},
    { key: 48, val: 'SCANIA'},
    { key: 49, val: 'SSANG TONG'},
    { key: 50, val: 'SUBARU'},
    { key: 51, val: 'SUZUKI'},
    { key: 52, val: 'TATA'},
    { key: 53, val: 'TESLA'},
    { key: 54, val: 'TOYOTA'},
    { key: 55, val: 'TUSCANI'},
    { key: 56, val: 'TVS'},
    { key: 57, val: 'VOLKSWAGON'},
    { key: 58, val: 'VOLVO'},
    { key: 59, val: 'YAMAHA'},
    { key: 60, val: 'ZOTYE'},
  ];
  public static COUNTRIES = [{ key: 1, val: 'Afghanistan'}, { key: 2, val: 'Albania'}, { key: 3, val: 'Algeria'}, { key: 4, val: 'Andorra'}, { key: 5, val: 'Angola'}, { key: 6, val: 'Antigua and Barbuda'}, { key: 7, val: 'Argentina'}, { key: 8, val: 'Armenia'}, { key: 9, val: 'Australia'}, { key: 10, val: 'Austria'}, { key: 11, val: 'Azerbaijan'}, { key: 12, val: 'The Bahamas'}, { key: 13, val: 'Bahrain'}, { key: 14, val: 'Bangladesh'}, { key: 15, val: 'Barbados'}, { key: 16, val: 'Belarus'}, { key: 17, val: 'Belgium'}, { key: 18, val: 'Belize'}, { key: 19, val: 'Benin'}, { key: 20, val: 'Bhutan'}, { key: 21, val: 'Bolivia'}, { key: 22, val: 'Bosnia and Herzegovina'}, { key: 23, val: 'Botswana'}, { key: 24, val: 'Brazil'}, { key: 25, val: 'Brunei'}, { key: 26, val: 'Bulgaria'}, { key: 27, val: 'Burkina Faso'}, { key: 28, val: 'Burundi'}, { key: 29, val: 'Cabo Verde'}, { key: 30, val: 'Cambodia'}, { key: 31, val: 'Cameroon'}, { key: 32, val: 'Canada'}, { key: 33, val: 'Central African Republic'}, { key: 34, val: 'Chad'}, { key: 35, val: 'Chile'}, { key: 36, val: 'China'}, { key: 37, val: 'Colombia'}, { key: 38, val: 'Comoros'}, { key: 39, val: 'Congo Democratic Republic of the'}, { key: 40, val: 'Congo Republic of the'}, { key: 41, val: 'Costa Rica'}, { key: 42, val: 'Côte d’Ivoire'}, { key: 43, val: 'Croatia'}, { key: 44, val: 'Cuba'}, { key: 45, val: 'Cyprus'}, { key: 46, val: 'Czech Republic'}, { key: 47, val: 'Denmark'}, { key: 48, val: 'Djibouti'}, { key: 49, val: 'Dominica'}, { key: 50, val: 'Dominican Republic'}, { key: 51, val: 'East Timor (Timor-Leste)'}, { key: 52, val: 'Ecuador'}, { key: 53, val: 'Egypt'}, { key: 54, val: 'El Salvador'}, { key: 55, val: 'Equatorial Guinea'}, { key: 56, val: 'Eritrea'}, { key: 57, val: 'Estonia'}, { key: 58, val: 'Ethiopia'}, { key: 59, val: 'Fiji'}, { key: 60, val: 'Finland'}, { key: 61, val: 'France'}, { key: 62, val: 'Gabon'}, { key: 63, val: 'The Gambia'}, { key: 64, val: 'Georgia'}, { key: 65, val: 'Germany'}, { key: 66, val: 'Ghana'}, { key: 67, val: 'Greece'}, { key: 68, val: 'Grenada'}, { key: 69, val: 'Guatemala'}, { key: 70, val: 'Guinea'}, { key: 71, val: 'Guinea-Bissau'}, { key: 72, val: 'Guyana'}, { key: 73, val: 'Haiti'}, { key: 74, val: 'Honduras'}, { key: 75, val: 'Hungary'}, { key: 76, val: 'Iceland'}, { key: 77, val: 'India'}, { key: 78, val: 'Indonesia'}, { key: 79, val: 'Iran'}, { key: 80, val: 'Iraq'}, { key: 81, val: 'Ireland'}, { key: 82, val: 'Israel'}, { key: 83, val: 'Italy'}, { key: 84, val: 'Jamaica'}, { key: 85, val: 'Japan'}, { key: 86, val: 'Jordan'}, { key: 87, val: 'Kazakhstan'}, { key: 88, val: 'Kenya'}, { key: 89, val: 'Kiribati'}, { key: 90, val: 'Korea North'}, { key: 91, val: 'Korea South'}, { key: 92, val: 'Kosovo'}, { key: 93, val: 'Kuwait'}, { key: 94, val: 'Kyrgyzstan'}, { key: 95, val: 'Laos'}, { key: 96, val: 'Latvia'}, { key: 97, val: 'Lebanon'}, { key: 98, val: 'Lesotho'}, { key: 99, val: 'Liberia'}, { key: 100, val: 'Libya'}, { key: 101, val: 'Liechtenstein'}, { key: 102, val: 'Lithuania'}, { key: 103, val: 'Luxembourg'}, { key: 104, val: 'Macedonia'}, { key: 105, val: 'Madagascar'}, { key: 106, val: 'Malawi'}, { key: 107, val: 'Malaysia'}, { key: 108, val: 'Maldives'}, { key: 109, val: 'Mali'}, { key: 110, val: 'Malta'}, { key: 111, val: 'Marshall Islands'}, { key: 112, val: 'Mauritania'}, { key: 113, val: 'Mauritius'}, { key: 114, val: 'Mexico'}, { key: 115, val: 'Micronesia Federated States of'}, { key: 116, val: 'Moldova'}, { key: 117, val: 'Monaco'}, { key: 118, val: 'Mongolia'}, { key: 119, val: 'Montenegro'}, { key: 120, val: 'Morocco'}, { key: 121, val: 'Mozambique'}, { key: 122, val: 'Myanmar (Burma)'}, { key: 123, val: 'Namibia'}, { key: 124, val: 'Nauru'}, { key: 125, val: 'Nepal'}, { key: 126, val: 'Netherlands'}, { key: 127, val: 'New Zealand'}, { key: 128, val: 'Nicaragua'}, { key: 129, val: 'Niger'}, { key: 130, val: 'Nigeria'}, { key: 131, val: 'Norway'}, { key: 132, val: 'Oman'}, { key: 133, val: 'Pakistan'}, { key: 134, val: 'Palau'}, { key: 135, val: 'Panama'}, { key: 136, val: 'Papua New Guinea'}, { key: 137, val: 'Paraguay'}, { key: 138, val: 'Peru'}, { key: 139, val: 'Philippines'}, { key: 140, val: 'Poland'}, { key: 141, val: 'Portugal'}, { key: 142, val: 'Qatar'}, { key: 143, val: 'Romania'}, { key: 144, val: 'Russia'}, { key: 145, val: 'Rwanda'}, { key: 146, val: 'Saint Kitts and Nevis'}, { key: 147, val: 'Saint Lucia'}, { key: 148, val: 'Saint Vincent and the Grenadines'}, { key: 149, val: 'Samoa'}, { key: 150, val: 'San Marino'}, { key: 151, val: 'Sao Tome and Principe'}, { key: 152, val: 'Saudi Arabia'}, { key: 153, val: 'Senegal'}, { key: 154, val: 'Serbia'}, { key: 155, val: 'Seychelles'}, { key: 156, val: 'Sierra Leone'}, { key: 157, val: 'Singapore'}, { key: 158, val: 'Slovakia'}, { key: 159, val: 'Slovenia'}, { key: 160, val: 'Solomon Islands'}, { key: 161, val: 'Somalia'}, { key: 162, val: 'South Africa'}, { key: 163, val: 'Spain'}, { key: 164, val: 'Sri Lanka'}, { key: 165, val: 'Sudan'}, { key: 166, val: 'Sudan South'}, { key: 167, val: 'Suriname'}, { key: 168, val: 'Swaziland'}, { key: 169, val: 'Sweden'}, { key: 170, val: 'Switzerland'}, { key: 171, val: 'Syria'}, { key: 172, val: 'Taiwan'}, { key: 173, val: 'Tajikistan'}, { key: 174, val: 'Tanzania'}, { key: 175, val: 'Thailand'}, { key: 176, val: 'Togo'}, { key: 177, val: 'Tonga'}, { key: 178, val: 'Trinidad and Tobago'}, { key: 179, val: 'Tunisia'}, { key: 180, val: 'Turkey'}, { key: 181, val: 'Turkmenistan'}, { key: 182, val: 'Tuvalu'}, { key: 183, val: 'Uganda'}, { key: 184, val: 'Ukraine'}, { key: 185, val: 'United Arab Emirates'}, { key: 186, val: 'United Kingdom'}, { key: 187, val: 'United States'}, { key: 188, val: 'Uruguay'}, { key: 189, val: 'Uzbekistan'}, { key: 190, val: 'Vanuatu'}, { key: 191, val: 'Vatican City'}, { key: 192, val: 'Venezuela'}, { key: 193, val: 'Vietnam'}, { key: 194, val: 'Yemen'}, { key: 195, val: 'Zambia'}, { key: 196, val: 'Zimbabwe'}]
  public static COUNTRIES2 = [
    { key: 1, val: 'JAPAN'},
    { key: 2, val: 'INDIA'},
    { key: 3, val: 'UNITED KINDOM'},
    { key: 4, val: 'GERMANY'},
    { key: 5, val: 'SRI LANKA'},
    { key: 5, val: 'CHINA'},
    { key: 5, val: 'FRANCE'},
    { key: 5, val: 'TAILAND'},
  ];
  public static FUEL_TYPES = ['Petrol', 'Hybrid', 'Disel', 'Electric'];
  public static MENU_OPTIONS = [
    { disp: 'Buy Vehicle', icon: 'shopping-cart', route: '/secure/search'},
    { disp: 'Discuss', icon: 'book', route: ['/secure/news/1', {isNewsView: true}]},
    { disp: 'Profile', icon: 'car', route: ['/secure/profile/1', {isNewsView: false, isProfile: true}]},
    { disp: 'Settings', icon: 'gear', route: '/secure/settings'},
  ];
  public static TIME_URL = 'https://worldclockapi.com/api/json/utc/now';
  public static TIME_CHECK_INTERVAL = 60000;
  public static COMMENT_SEPARATOR = '{[]}';
}

export class UserSettings {
  public static NON_INTERESTS = [];
  public static ID = 'userSettings';
}
