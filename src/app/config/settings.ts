export class Settings {
  public static LOGIN_TIMEOUT = 3000;
  public static NEWS_FETCH_COUNT = 7;
  public static SEARCH_VEHICLE_FETCH_COUNT = 2;
  public static VEHICLE_CATEGORIES = [ 'Van', 'Bus', '3-wheeler', 'Jeep', 'Double Cab', 'Motor Bike',
    'Truck', 'Car-Sedan', 'Car-Hatchback', 'Car-Wagon'];
  public static VEHICLE_BRANDS = ['NISSAN', 'HONDA', 'TOYOTA', 'ISUZU', 'SUZUKI'];
  public static COUNTRIES = ['Japan', 'India', 'United Kindom', 'China'];
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
