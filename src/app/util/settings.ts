export class Settings {
  public static LOGIN_TIMEOUT = 3000;
  public static NEWS_FETCH_COUNT = 7;
  public static SEARCH_VEHICLE_FETCH_COUNT = 2;
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
    { key: 56, val: 'BAJAJ'},
    { key: 3, val: 'BMW'},
    { key: 4, val: 'CHERY'},
    { key: 5, val: 'CHEVROLET'},
    { key: 6, val: 'CHRYSLER'},
    { key: 7, val: 'CITROEN'},
    { key: 8, val: 'DAEWOO'},
    { key: 9, val: 'DAIHATSU'},
    { key: 10, val: 'DATSUN'},
    { key: 10, val: 'DEMARK'},
    { key: 11, val: 'DFSK'},
    { key: 12, val: 'EICHER'},
    { key: 13, val: 'FIAT'},
    { key: 14, val: 'FORD'},
    { key: 15, val: 'GEELY'},
    { key: 16, val: 'HERO'},
    { key: 16, val: 'HILLMAN'},
    { key: 17, val: 'HONDA'},
    { key: 18, val: 'HYUNDAI'},
    { key: 19, val: 'ISUZU'},
    { key: 20, val: 'JAGUAR'},
    { key: 21, val: 'JEEP'},
    { key: 22, val: 'JMC'},
    { key: 23, val: 'JONWAY'},
    { key: 24, val: 'KIA'},
    { key: 25, val: 'LAND ROVER'},
    { key: 26, val: 'LEXUS'},
    { key: 27, val: 'LEYLAND'},
    { key: 28, val: 'MAHINDRA'},
    { key: 29, val: 'MARUTI SUZUKI'},
    { key: 30, val: 'MAZDA'},
    { key: 31, val: 'MERCEDES BENZ'},
    { key: 32, val: 'MG'},
    { key: 33, val: 'MICRO'},
    { key: 34, val: 'MINI'},
    { key: 35, val: 'MITSUBISHI'},
    { key: 36, val: 'MORRIS'},
    { key: 37, val: 'NISSAN'},
    { key: 38, val: 'OPEL'},
    { key: 39, val: 'PERODUA'},
    { key: 40, val: 'PEUGEOT'},
    { key: 41, val: 'PORSCHE'},
    { key: 42, val: 'PROTON'},
    { key: 43, val: 'RENAULT'},
    { key: 44, val: 'ROVER'},
    { key: 45, val: 'SCANIA'},
    { key: 46, val: 'SSANG TONG'},
    { key: 47, val: 'SUBARU'},
    { key: 48, val: 'SUZUKI'},
    { key: 49, val: 'TATA'},
    { key: 50, val: 'TESLA'},
    { key: 51, val: 'TOYOTA'},
    { key: 52, val: 'TUSCANI'},
    { key: 57, val: 'TVS'},
    { key: 53, val: 'VOLKSWAGON'},
    { key: 54, val: 'VOLVO'},
    { key: 54, val: 'YAMAHA'},
    { key: 55, val: 'ZOTYE'},


  ];
  public static COUNTRIES = [
    { key: 1, val: 'JAPAN'},
    { key: 2, val: 'INDIA'},
    { key: 3, val: 'UNITED KINDOM'},
    { key: 4, val: 'GERM'},
  ];
  public static FUEL_TYPES = ['Petrol', 'Hybrid', 'Disel', 'Electric'];
  public static VALIDATE_ADD_VEHICLE = true;
  public static MENU_OPTIONS = [
    { disp: 'Discussion', route: '/secure/news/1'},
    { disp: 'My Vehicles', route: '/secure/profile'},
  ];
  public static TIME_URL = 'https://worldclockapi.com/api/json/utc/now';
  public static TIME_CHECK_INTERVAL = 60000;
  public static COMMENT_SEPARATOR = '{[]}';
}

export class UserSettings {
  public static NON_INTERESTS = [];
  public static ID = 'userSettings';
}
