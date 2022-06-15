import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  TextInput,
} from 'react-native';

import {CONSTANT} from '../../constant/Constant';
import {Rating} from 'react-native-ratings';

export class CommercialUserRatingPoints extends Component {
  constructor() {
    super();
  }

  state = {
    response: null,
    myPointList: [],
    spinner: false,
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  async componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.setState({
        spinner: !this.state.spinner,
      });
      fetch(CONSTANT.baseUrl + 'offer-review/commercial', {
        method: 'GET',
        dataType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(res => {
          if (res.status !== 'fail') {
            let listData = [];
            res.data.map(node => {
              let obj = {
                id: node.id,
                user_id: node.user_id,
                offer_id: node.offer_id,
                rating: node.rating,
                comment: node.comment,
                date: node.date,
              };
              listData.push(obj);
            });
            window.listD = listData;
            this.setState({
              response: res.data,
              myPointList: listData,
              spinner: !this.state.spinner,
            });
          } else {
            Alert.alert('', 'Size özel değerlendirme puanı bulunmamaktadır.', [
              {
                text: 'Tamam',
                onPress: () => {
                  this.setState({
                    spinner: !this.state.spinner,
                  });
                },
              },
            ]);
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({
            spinner: !this.state.spinner,
          });
        });
    });
  }

  onClickRequest(item) {}

  renderMyPoints = ({item, index}) => {
    return (
      <View style={styles.list}>
        <View style={styles.listStyle}>
          <View style={styles.listChildView_2}>
            <Text style={styles.itemText_Bold}>Tarih</Text>
            <Text style={styles.itemText}>{item.date}</Text>

            <Text style={styles.itemText_Bold}>Puan</Text>
            <Text style={styles.itemText}>{item.rating}</Text>

            <Text style={styles.itemText_Bold}>Yorum</Text>
            <Text style={styles.itemText}>{item.comment}</Text>
          </View>

          <View style={styles.listChildView_1}>
            <View style={{marginBottom: 10}}>
              <Rating
                ratingCount={5}
                imageSize={25}
                showRating={false}
                readonly={true}
                startingValue={item.rating}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let listDatas = this.state.myPointList;

    return (
      <View style={styles.container}>
        <View style={{flex: 0.9}}>
          {listDatas.length > 0 ? (
            <FlatList
              data={this.state.myPointList}
              renderItem={this.renderMyPoints}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.itemText_Bold}>
                Değerlendirme puanınız bulunmamaktadır.
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
    flex: 1,
  },
  nameInput: {
    color: '#121212',
    height: 40,
    width: width / 1.6,
    borderColor: '#0E4491FF',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingLeft: 10,
    shadowColor: '#015b7e',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginLeft: 5,
    marginBottom: 10,
  },
  button: {
    width: width / 2,
    height: 35,
    backgroundColor: '#015b7e',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#015b7e',
    shadowColor: '#015b7e',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.75,
    shadowRadius: 3,
  },
  girisYapRow: {
    height: 35,
    width: width / 2,
    flex: 1,
    alignItems: 'center',
    marginTop: 6,
  },
  girisYap: {
    color: 'rgb(255,255,255)',
    fontSize: 15,
    fontFamily: 'Montserrat-ExtraLight',
    fontWeight: 'bold',
  },
  pageHead_text: {
    color: 'rgb(14,68,145)',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    marginTop: 15,
    marginBottom: 15,
  },
  list: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    borderColor: 'rgb(14,68,145)',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 20,
  },
  listStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 40,
    paddingTop: 20,
    marginBottom: 20,
  },
  listChildView_1: {
    alignItems: 'center',
    width: (width - 40) / 3,
  },
  listChildView_2: {
    alignItems: 'center',
    width: (width - 40) / 2,
    marginTop: 15,
  },
  list_Modal: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopColor: 'rgb(14,68,145)',
    borderTopWidth: 0.3,
    flex: 1,
  },
  listStyle_Modal: {
    alignItems: 'center',
    width: width / 1.7,
    flex: 1,
  },
  listChildView_1_Modal: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: width / 1.5,
  },
  listChildView_2_Modal: {
    justifyContent: 'space-between',
    width: width / 1.5,
  },
  image: {
    width: width - 30,
    height: height / 4.5,
    resizeMode: 'stretch',
  },
  itemText: {
    color: 'rgb(0,0,0)',

    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 10,
  },
  itemTextBold: {
    color: 'rgb(0,0,0)',

    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  itemText_Bold: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    color: 'rgb(14,68,145)',
    marginBottom: 5,
    marginLeft: 5,
    alignSelf: 'flex-start',
  },
  itemButton: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    borderColor: '#00afdc',
    borderWidth: 3,
    borderRadius: 5,
  },
});
