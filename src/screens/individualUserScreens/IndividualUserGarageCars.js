import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  FlatList,
  LogBox,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {CONSTANT} from '../../constant/Constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import {Tab, TabView} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Root, Popup} from 'popup-ui';

export class IndividualUserGarageCars extends Component {
  constructor() {
    super();
    this.navigateAddCar = this.navigateAddCar.bind(this);
    this.logOutFunc = this.logOutFunc.bind(this);
    this.settingsFunc = this.settingsFunc.bind(this);
    this.messageBoxFunc = this.messageBoxFunc.bind(this);
    this.helpFunc = this.helpFunc.bind(this);
    this.contactFunc = this.contactFunc.bind(this);
  }

  state = {
    response: null,
    carList: [],
    spinner: false,
    index: 0,
  };

  navigateAddCar() {
    const {navigation} = this.props;
    navigation.navigate('IndividualUserGarageAddCars');
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
            'VAL-E',
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

  helpFunc() {
    const {navigation} = this.props;
    navigation.navigate('IndividualUserHelp');
  }

  contactFunc() {
    Alert.alert('VAL-E Müşteri Hizmetleri Hattı', '0(312) 580 00 06', [
      {text: 'Tamam', onPress: () => null},
    ]);
  }

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      window.selectedGarageCarUpd = undefined;
      this.setState({
        spinner: !this.state.spinner,
      });

      fetch(CONSTANT.baseUrl + 'garage/my-garage', {
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
                name: node.name,
                brand: node.brand,
                brand_model: node.brand_model,
                brand_model_pack: node.brand_model_pack,
                car_fuel_type: node.car_fuel_type,
                car_gear_type: node.car_gear_type,
                car_year: node.car_year,
                car_type: node.car_type,
                car_color: node.car_color,
                car_plate: node.car_plate,
                car_tire_size: node.car_tire_size,
              };
              listData.push(obj);
            });
            window.listD = listData;
            this.setState({
              response: res.data,
              carList: listData,
              spinner: !this.state.spinner,
            });
          } else {
            Alert.alert('VAL-E', 'Garajda kayıtlı aracınız bulunmamaktadır.', [
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

  renderMyCars = ({item, index}) => {
    return (
      <View style={styles.list}>
        <View
          style={{
            flex: 1,
            marginTop: 5,
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'VAL-E',
                'Kayıtlı aracınızı düzenlemek istediğinizden emin misiniz ?',
                [
                  {
                    text: 'Hayır',
                    onPress: () => null,
                  },
                  {
                    text: 'Evet',
                    onPress: () => {
                      const {navigation} = this.props;
                      navigation.navigate('IndividualUserGarageAddCars');
                      window.selectedGarageCarUpd = item;
                    },
                  },
                ],
              );
            }}>
            <Image
              source={require('../../assets/images/create.png')}
              style={{
                width: 25,
                height: 25,
                marginRight: 5,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'VAL-E',
                'Kayıtlı aracınızı silmek istediğinizden emin misiniz ?',
                [
                  {
                    text: 'Hayır',
                    onPress: () => null,
                  },
                  {
                    text: 'Evet',
                    onPress: () => {
                      fetch(CONSTANT.baseUrl + 'garage/' + item.id, {
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
                            Alert.alert(
                              'VAL-E',
                              'Araç başarıyla silinmiştir.',
                              [
                                {
                                  text: 'Tamam',
                                  onPress: () => {
                                    const {navigation} = this.props;
                                    navigation.reset({
                                      index: 0,
                                      routes: [
                                        {name: 'IndividualUserMyGarageScreen'},
                                      ],
                                    });
                                  },
                                },
                              ],
                            );
                          } else {
                            Alert.alert(
                              'VAL-E',
                              'Araç silme işlemi gerçekleştirilemedi.',
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
              <Text style={styles.itemText_Bold}>Araç Tipi</Text>
              <Text style={styles.itemText}>- {item.car_type}</Text>
              <Text style={styles.itemText_Bold}>Marka</Text>
              <Text style={styles.itemText}>- {item.brand}</Text>
              <Text style={styles.itemText_Bold}>Model</Text>
              <Text style={styles.itemText}>- {item.brand_model}</Text>
              <Text style={styles.itemText_Bold}>Model Detay</Text>
              <Text style={styles.itemText} numberOfLines={1}>
                - {item.brand_model_pack}
              </Text>
              <Text style={styles.itemText_Bold}>Renk</Text>
              <Text style={styles.itemText} numberOfLines={1}>
                - {item.car_color}
              </Text>
            </View>
            <View style={styles.listChildView_2}>
              <Text style={styles.itemText_Bold}>Plaka</Text>
              <Text style={styles.itemText}>- {item.car_plate}</Text>
              <Text style={styles.itemText_Bold}>Model Yılı</Text>
              <Text style={styles.itemText}>- {item.car_year}</Text>
              <Text style={styles.itemText_Bold}>Yakıt Tipi</Text>
              <Text style={styles.itemText}>- {item.car_fuel_type}</Text>
              <Text style={styles.itemText_Bold}>Vites Tipi</Text>
              <Text style={styles.itemText}>- {item.car_gear_type}</Text>
              <Text style={styles.itemText_Bold}>Lastik Ebat</Text>
              <Text style={styles.itemText}>- {item.car_tire_size}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  handleIndex = e => {
    this.setState({index: e});
  };

  render() {
    let listDatas = this.state.carList;
    let index = this.state.index;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.navigateAddCar}>
          <View style={styles.girisYapRow}>
            <Text style={styles.girisYap}>ARAÇ EKLE</Text>
            <Image
              source={require('../../assets/images/car-plus.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: '#015b7e',
              }}
            />
          </View>
        </TouchableOpacity>
        <Spinner visible={this.state.spinner} color="#1d5cdd" />
        <View>
          {listDatas.length > 0 ? (
            <FlatList
              data={this.state.carList}
              renderItem={this.renderMyCars}
            />
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text style={styles.itemText_Bold}>
                Garajınıza eklenmiş araç bulunamadı.
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
    alignItems: 'center',
    backgroundColor: '#fff',
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
    borderColor: '#015b7e',
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
    width: width / 3,
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
