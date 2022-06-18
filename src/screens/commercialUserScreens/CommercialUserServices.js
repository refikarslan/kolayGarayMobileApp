import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {CONSTANT} from '../../constant/Constant';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Tab, TabView} from 'react-native-elements';

export class CommercialUserServices extends Component {
  constructor() {
    super();
    this.navigateAddServices = this.navigateAddServices.bind(this);
    this.logOutFunc = this.logOutFunc.bind(this);
    this.settingsFunc = this.settingsFunc.bind(this);
    this.messageBoxFunc = this.messageBoxFunc.bind(this);
    this.helpFunc = this.helpFunc.bind(this);
    this.contactFunc = this.contactFunc.bind(this);
  }

  state = {
    response: null,
    servicesList: [],
    sessionData: null,
    spinner: false,
    index: 0,
  };

  navigateAddServices() {
    const {navigation} = this.props;
    navigation.navigate('CommercialUserAddServices');
  }

  logOutFunc() {
    const {navigation} = this.props;

    fetch(CONSTANT.baseUrl + 'logout', {
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
          AsyncStorage.removeItem('phone');
          AsyncStorage.removeItem('password');
          navigation.navigate('Home');
        } else {
          Alert.alert(
            'Kolay Garaj',
            'Bir hata oldu, lütfen uygulamayı yeniden başlatınız.',
            [{text: 'Tamam', onPress: () => null}],
          );
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  settingsFunc() {}

  messageBoxFunc() {}

  helpFunc() {}

  contactFunc() {}

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
            this.setState({
              responseSession: res.data,
              sessionData: res.data,
            });
            let dataQuery = {
              company_name: res.data.commercialInfo.company_name,
            };
            fetch(
              CONSTANT.baseUrl +
                `commercial-service?company_name=${encodeURIComponent(
                  dataQuery.company_name,
                )}`,
              {
                method: 'GET',
                dataType: 'json',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              },
            )
              .then(response => response.json())
              .then(res => {
                if (res.status !== 'fail') {
                  let listData = [];
                  res.data.map(node => {
                    let obj = {
                      id: node.id,
                      user_id: node.user_id,
                      name: node.name,
                      description: node.description,
                      price: node.price,
                      company_name: node.company_name,
                      location_city: node.location_city,
                      location_state: node.location_state,
                      category: node.category,
                    };
                    listData.push(obj);
                  });
                  window.listD = listData;
                  this.setState({
                    response: res.data,
                    servicesList: listData,
                    spinner: !this.state.spinner,
                  });
                } else {
                  Alert.alert(
                    'Kolay Garaj',
                    'Kayıtlı hizmet/kampanya paketiniz bulunmamaktadır.',
                    [{text: 'Tamam', onPress: () => null}],
                  );
                  this.setState({
                    spinner: !this.state.spinner,
                  });
                }
              })
              .catch(e => {
                console.log(e);
                this.setState({
                  spinner: !this.state.spinner,
                });
              });
          } else {
            Alert.alert('Kolay Garaj', 'Session bulunmamaktadır.', [
              {text: 'Tamam', onPress: () => null},
            ]);
            this.setState({
              spinner: !this.state.spinner,
            });
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

  componentWillUnmount() {
    this._unsubscribe();
  }

  onClickProduct(item) {}

  renderMyServices = ({item, index}) => {
    return (
      <View style={styles.list}>
        <View
          style={{
            alignSelf: 'flex-end',
            marginTop: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Kolay Garaj',
                'Kayıtlı hizmet/kampanya paketinizi silmek istediğinizden emin misiniz ?',
                [
                  {text: 'Hayır', onPress: () => null},
                  {
                    text: 'Evet',
                    onPress: () => {
                      fetch(
                        CONSTANT.baseUrl + 'commercial-service/' + item.id,
                        {
                          method: 'DELETE',
                          dataType: 'json',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                        },
                      )
                        .then(response => response.json())
                        .then(res => {
                          console.log(res);
                          if (res.status !== 'fail') {
                            Alert.alert(
                              'Kolay Garaj',
                              'Kayıtlı hizmet/kampanya paketi başarıyla silinmiştir.',
                              [
                                {
                                  text: 'Tamam',
                                  onPress: () => {
                                    const {navigation} = this.props;
                                    navigation.reset({
                                      index: 0,
                                      routes: [
                                        {name: 'CommercialUserServicesScreen'},
                                      ],
                                    });
                                  },
                                },
                              ],
                            );
                          } else {
                            Alert.alert(
                              'Kolay Garaj',
                              'Kayıtlı hizmet/kampanya paketi silme işlemi gerçekleştirilemedi.',
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
            }}>
            <Image
              source={require('../../assets/images/delete.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <Text style={styles.itemText_Bold_Red}>{item.name}</Text>
        </View>
        <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
          <View style={styles.listStyle}>
            <View style={styles.listChildView_1}>
              <Text style={styles.itemText_Bold}>Firma Adı</Text>
              <Text style={styles.itemText}>- {item.company_name}</Text>
              <Text style={styles.itemText_Bold}>İl</Text>
              <Text style={styles.itemText}>- {item.location_city}</Text>
              <Text style={styles.itemText_Bold}>İlçe</Text>
              <Text style={styles.itemText}>- {item.location_state}</Text>
              <Text style={styles.itemText_Bold}>Hizmet/Paket Detayı</Text>
              <Text style={styles.itemText}>- {item.description}</Text>
              <Text style={styles.itemText_Bold}>Hizmet/Paket Fiyatı</Text>
              <Text style={styles.itemText}>- {item.price} ₺</Text>
            </View>
            <View style={styles.listChildView_2} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  handleIndex = e => {
    this.setState({index: e});
  };

  render() {
    let listDatas = this.state.servicesList;
    let index = this.state.index;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.navigateAddServices}>
          <View style={styles.girisYapRow}>
            <Text style={styles.girisYap}>HİZMET EKLE</Text>
            <Image
              source={require('../../assets/images/services-plus.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: '#015b7e',
              }}
            />
          </View>
        </TouchableOpacity>
        <Spinner visible={this.state.spinner} color="#1d5cdd" />
        <View style={{flex: 0.9}}>
          {listDatas.length > 0 ? (
            <FlatList
              data={this.state.servicesList}
              renderItem={this.renderMyServices}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.itemText_Bold}>
                Tanımlanmış özel hizmet bulunamadı.
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
    flex: 1,
    backgroundColor: '#fff',
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
    alignItems: 'flex-start',
    width: width - 60,
    marginLeft: 15,
  },
  listChildView_2: {
    alignItems: 'flex-start',
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
    marginLeft: 3,
  },
  itemText_Bold: {
    fontSize: 13,
    marginBottom: 3,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    color: 'rgb(14,68,145)',
  },
  itemText_Bold_Red: {
    fontSize: 13,
    marginBottom: 3,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    color: 'rgb(241,0,0)',
  },
  dropdown1BtnStyle: {
    flex: 1,
    height: 35,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(14,68,145)',
    margin: 5,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left', fontSize: 12},
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
    borderColor: 'rgb(14,68,145)',
    borderRadius: 5,
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    height: 40,
  },
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left', fontSize: 13},
  button: {
    width: width - 25,
    height: 55,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#015b7e',
    shadowColor: '#015b7e',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3,
    marginBottom: 10,
    marginTop: 20,
  },
  girisYap: {
    color: '#015b7e',
    fontSize: 13,
    fontFamily: 'Montserrat-ExtraLight',
    fontWeight: 'bold',
    marginTop: 2,
  },
  girisYapRow: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '7%',
  },
});
