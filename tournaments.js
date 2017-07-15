import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	ListView,
	TouchableHighlight,
	View
} from 'react-native';
import {parseString} from 'react-native-xml2js';
import Navigation from 'react-native-navigation';

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
		Navigation.push(this.props.containerId, {
			name: 'alarme.Schedule',
			passProps: {
				t_id: rowID
			}
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
