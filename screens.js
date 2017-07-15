import Navigation from 'react-native-navigation';

import Tournaments from './tournaments';
import Schedule from './schedule';

export function registerContainers() {
	Navigation.registerContainer('alarme.Tournaments', () => Tournaments);
	Navigation.registerContainer('alarme.Schedule', () => Schedule);
}
