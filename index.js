/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';


LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
    'Warning: componentWillMount is deprecated',
    'Another warning message prefix',
  ]);

AppRegistry.registerComponent(appName, () => App);
