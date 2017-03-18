// choose tournament
// watch players in this tournament order by seed
//

import {Navigation} from 'react-native-navigation';

import {registerScreens} from './screens';
registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
	tabs: [
		{
			label: 'Tournaments',
			screen: 'alarme.Tournaments', // this is a registered name for a screen
			// icon: require('../img/one.png'),
			// selectedIcon: require('../img/one_selected.png'), // iOS only
			title: 'Tournaments'
		}
		/*{
			label: 'MyAlarms',
			screen: 'alarme.MyAlarms',
			// icon: require('../img/two.png'),
			// selectedIcon: require('../img/two_selected.png'), // iOS only
			title: 'MyAlarms'
		}*/
	]
});
