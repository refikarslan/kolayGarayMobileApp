import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {CONSTANT} from '../../constant/Constant';
import Spinner from 'react-native-loading-spinner-overlay';

export class CommercialUserOffer extends Component {
  constructor() {
    super();
  }

  state = {
    response: null,
    myOfferList: [],
    spinner: false,
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.setState({
        spinner: !this.state.spinner,
      });
      fetch(CONSTANT.baseUrl + 'session', {
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
            window.commercialInfo = res.data.commercialInfo;
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({
            spinner: !this.state.spinner,
          });
        });
      fetch(CONSTANT.baseUrl + 'offer/my-offers', {
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
                request_id: node.request_id,
                request: node.request,
                status: node.status,
                description: node.description,
                price: node.price,
                creation_date: node.creation_date,
              };
              listData.push(obj);
            });
            window.listD = listData;
            this.setState({
              response: res.data,
              myOfferList: listData,
              spinner: !this.state.spinner,
            });
          } else {
            Alert.alert(
              'Kolay Garaj',
              'Oluşturulmuş teklifiniz bulunmamaktadır.',
              [
                {
                  text: 'Tamam',
                  onPress: () => {
                    this.setState({
                      spinner: !this.state.spinner,
                    });
                  },
                },
              ],
            );
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

  onClickProduct(item) {
    let id = item.id;
    window.selected_request = item;
    Alert.alert(
      'Kolay Garaj',
      'Teklifinizi silmek istediğinizden emin misiniz?',
      [
        {text: 'Hayır', onPress: () => null},
        {
          text: 'Evet',
          onPress: () => {
            fetch(CONSTANT.baseUrl + 'offer/' + id, {
              method: 'DELETE',
              dataType: 'json',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            })
              .then(response => response.json())
              .then(res => {
                console.log(res);
                if (res.status !== 'fail') {
                  Alert.alert('Kolay Garaj', 'Teklif başarıyla silinmiştir.', [
                    {
                      text: 'Tamam',
                      onPress: () => {
                        const {navigation} = this.props;
                        navigation.reset({
                          index: 0,
                          routes: [{name: 'CommercialUserOfferScreen'}],
                        });
                      },
                    },
                  ]);
                } else {
                  Alert.alert(
                    'Kolay Garaj',
                    'Teklif silme işlemi gerçekleştirilemedi.',
                    [{text: 'Tamam', onPress: () => null}],
                  );
                }
              })
              .catch(e => {
                console.log(e);
              });
          },
        },
      ],
    );
  }

  renderMyOffer = ({item, index}) => {
    let commercialCategoryId =
      window.commercialInfo.category !== undefined
        ? window.commercialInfo.category
        : 0;

    if (commercialCategoryId === 1) {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
            }}>
            <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
              <Image
                source={require('../../assets/images/delete.png')}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.listStyle}>
            <View style={styles.listChildView_2}>
              <Text style={styles.itemText_Bold}>İl-İlçe</Text>
              <Text style={styles.itemText}>
                {item.request.location_city + '-' + item.request.location_state}
              </Text>
              <Text style={styles.itemText_Bold}>Talep Detayı</Text>
              <Text style={styles.itemText}>{item.request.description}</Text>

              <Text style={styles.itemText_Bold}>Teklif Detayı</Text>
              <Text style={styles.itemText}>{item.description}</Text>

              <Text style={styles.itemText_Bold}>Teklif Tutarı</Text>
              <Text style={styles.itemText}>{item.price + ' ₺'}</Text>
            </View>
            <Image
              source={require('../../assets/images/iconPng/carTire.png')}
              style={{
                width: 75,
                height: 75,
                opacity: 0.5,
              }}
            />
          </View>
        </View>
      );
    } else if (commercialCategoryId === 3) {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
            }}>
            <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
              <Image
                source={require('../../assets/images/delete.png')}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.listStyle}>
            <View style={styles.listChildView_2}>
              <Text style={styles.itemText_Bold}>İl-İlçe</Text>
              <Text style={styles.itemText}>
                {item.request.location_city + '-' + item.request.location_state}
              </Text>
              <Text style={styles.itemText_Bold}>Talep Detayı</Text>
              <Text style={styles.itemText}>{item.request.description}</Text>

              <Text style={styles.itemText_Bold}>Teklif Detayı</Text>
              <Text style={styles.itemText}>{item.description}</Text>

              <Text style={styles.itemText_Bold}>Teklif Tutarı</Text>
              <Text style={styles.itemText}>{item.price + ' ₺'}</Text>
            </View>
            <Image
              source={require('../../assets/images/iconPng/carTow.png')}
              style={{
                width: 75,
                height: 75,
                opacity: 0.5,
              }}
            />
          </View>
        </View>
      );
    } else if (commercialCategoryId === 4) {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
            }}>
            <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
              <Image
                source={require('../../assets/images/delete.png')}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.listStyle}>
            <View style={styles.listChildView_2}>
              <Text style={styles.itemText_Bold}>İl-İlçe</Text>
              <Text style={styles.itemText}>
                {item.request.location_city + '-' + item.request.location_state}
              </Text>
              <Text style={styles.itemText_Bold}>Talep Detayı</Text>
              <Text style={styles.itemText}>{item.request.description}</Text>

              <Text style={styles.itemText_Bold}>Teklif Detayı</Text>
              <Text style={styles.itemText}>{item.description}</Text>

              <Text style={styles.itemText_Bold}>Teklif Tutarı</Text>
              <Text style={styles.itemText}>{item.price + ' ₺'}</Text>
            </View>
            <Image
              source={require('../../assets/images/iconPng/carService.png')}
              style={{
                width: 75,
                height: 75,
                opacity: 0.5,
              }}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
            }}>
            <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
              <Image
                source={require('../../assets/images/delete.png')}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.listStyle}>
            <View style={styles.listChildView_2}>
              <Text style={styles.itemText_Bold}>İl-İlçe</Text>
              <Text style={styles.itemText}>
                {item.request.location_city + '-' + item.request.location_state}
              </Text>
              <Text style={styles.itemText_Bold}>Talep Detayı</Text>
              <Text style={styles.itemText}>{item.request.description}</Text>

              <Text style={styles.itemText_Bold}>Teklif Detayı</Text>
              <Text style={styles.itemText}>{item.description}</Text>

              <Text style={styles.itemText_Bold}>Teklif Tutarı</Text>
              <Text style={styles.itemText}>{item.price + ' ₺'}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.spinner} color="#1d5cdd" />

        <View style={{flex: 0.9}}>
          <FlatList
            data={this.state.myOfferList}
            renderItem={this.renderMyOffer}
          />
        </View>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
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
    alignItems: 'flex-start',
    width: (width - 40) / 2,
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
    marginBottom: 10,
  },
  itemText_Bold: {
    color: 'rgb(14,68,145)',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
