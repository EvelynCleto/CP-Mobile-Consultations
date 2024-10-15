import { AppRegistry } from 'react-native';
import App from './App';
import appConfig from '../app.json';


// Registra o componente principal
AppRegistry.registerComponent(appConfig.name, () => App);

// Executa o aplicativo no navegador
AppRegistry.runApplication(appConfig.name, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
