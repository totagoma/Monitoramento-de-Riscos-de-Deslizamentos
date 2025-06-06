// Mock para o AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock para o react-native-chart-kit
jest.mock('react-native-chart-kit', () => ({
  LineChart: 'LineChart',
}));

// Mock para o react-native-svg
jest.mock('react-native-svg', () => ({
  Svg: 'Svg',
  Path: 'Path',
  Rect: 'Rect',
  G: 'G',
  Text: 'Text',
  Circle: 'Circle',
  Line: 'Line',
}));

// Mock para o react-native
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.NativeModules.StatusBarManager = { HEIGHT: 20 };
  return {
    ...rn,
    Alert: {
      alert: jest.fn(),
    },
    Dimensions: {
      get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
    },
  };
});

