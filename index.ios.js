// choose tournament
// watch players in this tournament order by seed
//

import Navigation from 'react-native-navigation';

import {registerContainers} from './screens';
registerContainers();

// start the app
Navigation.events().onAppLaunched(() => {
	Navigation.setRoot({
		container: {
			name: 'alarme.Tournaments'
		}
	});
});
