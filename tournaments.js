import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	ListView,
	TouchableHighlight,
	View
} from 'react-native';
import {parseString} from 'react-native-xml2js';


export default class Tournaments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => true
			})
		}
	}

	clickOnTournament(rowID) {
		this.props.navigator.push({
			screen: 'alarme.Schedule', // unique ID registered with Navigation.registerScreen
			title: 'Schedule', // navigation bar title of the pushed screen (optional)
			// titleImage: require('../../img/my_image.png'), //navigation bar title image instead of the title text of the pushed screen (optional)
			passProps: {t_id: rowID}, // simple serializable object that will pass as props to the pushed screen (optional)
			animated: true, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
			navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
			navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView
					style={styles.wrapper}
					dataSource={this.state.dataSource}
					renderRow={(rowData, sectionID, rowID) => <TouchableHighlight onPress={() => this.clickOnTournament(rowData.$.id)}><Text
						style={styles.row}>{rowData.$.name}</Text></TouchableHighlight>}
				/>
			</View>
		);
	}

	componentDidMount() {
		this.getTournaments();
	}

	getTournaments() {
		fetch('http://ws.protennislive.com/LiveScoreSystem/M/Long/GetTournaments.aspx?lang=en-IL&wkno=99')
			.then((res) => {
				return res.text();
			})
			.then((data) => {
				parseString(data, (err, result) => {
					this.setState({dataSource: this.state.dataSource.cloneWithRows(result.Tournaments.Tournament)});
				});
			})
			.catch(error => {
				console.log('errr', error);
			});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: '#F6F6F6',
	},
	wrapper: {
		flex: 1,
		paddingTop: 50,
	},
});
