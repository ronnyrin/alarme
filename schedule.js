import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	ListView,
	TouchableHighlight,
	View
} from 'react-native';
import {parseString} from 'react-native-xml2js';
import _ from 'lodash';

export default class Schedule extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => true
			}),
			day: ''
		}
	}

	selectGame(matchId) {
		fetch('https://alarme.herokuapp.com/alarms/new', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user: 1111,
				game: matchId,
			})
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>{this.state.day}</Text>

				<ListView
					style={styles.wrapper}
					dataSource={this.state.dataSource}
					renderRow={(rowData, sectionID, rowID) => <TouchableHighlight
						onPress={() => this.selectGame(rowData.MatchId)}><Text
						style={styles.row}>{rowData.MatchupDisplayLine}</Text></TouchableHighlight>}
				/>
			</View>
		);
	}

	componentDidMount() {
		this.getSchedule();
	}

	getSchedule() {
		fetch(`http://ws.protennislive.com/LiveScoreSystem/M/Medium/GetOOPXML.aspx?year=2017&id=${this.props.t_id}`)
			.then((res) => {
				return res.text();
			})
			.then((data) => {
				parseString(data, (err, result) => {
					parseString(result.TournamentOOP.OOPWrapper[0].OOPXML[0], (err, result1) => {
						const index = result1.OOP.Schedule[0].Day.length - 1;
						this.setState({
							dataSource: this.state.dataSource.cloneWithRows(this.getGames(result1.OOP.Schedule[0].Day[index])),
							day: result1.OOP.Schedule[0].Day[index].DisplayDate[0]
						});
					});
				});
			})
			.catch(error => {
				console.log('errr', error);
			});
	}

	getGames(data) {
		let result = _.reduce(data.Court, function(result, value, key) {
			result.push(value.Matches[0].Match);
			return result;
		}, []);

		return _.flatten(result);
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
		margin: 10,
		backgroundColor: '#F6F6F6',
	},
	wrapper: {
		flex: 1,
		paddingTop: 50,
	},
});
