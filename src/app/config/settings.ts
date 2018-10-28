export class Settings {
  public static LOGIN_TIMEOUT = 3000;
  public static NEWS_FETCH_COUNT = 7;
  public static VEHICLE_CATEGORIES = [ 'Car', 'Van', 'Bus', '3-wheeler', 'Motor Bike', 'Truck' ];
  public static VEHICLE_BRANDS = ['Nissan', 'Toyota', 'Isuzu', 'Suzuki'];
  public static COUNTRIES = ['Japan', 'India', 'United Kindom', 'China'];
  public static FUEL_TYPES = ['Petrol', 'Hybrid', 'Disel', 'Electric'];
  public static VALIDATE_ADD_VEHICLE = true;
}

export class UserSettings {
  public static NON_INTERESTS = [];
  public static ID = 'userSettings';
}
