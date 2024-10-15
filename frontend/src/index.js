import { AppRegistry } from 'react-native';
import appConfig from '../app.json';
import App from './App.tsx';

AppRegistry.registerComponent(appConfig.name, () => App);

AppRegistry.runApplication(appConfig.name, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
