export class Settings {
  public static LOGIN_TIMEOUT = 3000;
  public static NEWS_FETCH_COUNT = 7;
  public static SEARCH_VEHICLE_FETCH_COUNT = 7;
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
  public static COUNTRIES = [
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
  public static VALIDATE_ADD_VEHICLE = true;
  public static MENU_OPTIONS = [
    { disp: 'Buy Vehicle', icon: 'shopping-cart', route: '/secure/search'},
    { disp: 'News', icon: 'asterisk', route: ['/secure/news/1', {isNewsView: true}]},
    { disp: 'Profile', icon: 'car', route: ['/secure/profile/1', {isNewsView: false, isProfile: true}]},
  ];
  public static TIME_URL = 'https://worldclockapi.com/api/json/utc/now';
  public static TIME_CHECK_INTERVAL = 60000;
  public static COMMENT_SEPARATOR = '{[]}';
}

export class UserSettings {
  public static NON_INTERESTS = [];
  public static ID = 'userSettings';
}
