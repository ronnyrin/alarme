import {Navigation} from 'react-native-navigation';

import Tournaments from './tournaments';
import Schedule from './schedule';

// register all screens of the app (including internal ones)
export function registerScreens() {
	Navigation.registerComponent('alarme.Tournaments', () => Tournaments);
	Navigation.registerComponent('alarme.Schedule', () => Schedule);
}
