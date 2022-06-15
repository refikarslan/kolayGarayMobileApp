import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import {CONSTANT} from '../../constant/Constant';
import Spinner from 'react-native-loading-spinner-overlay';

export class MyGarageCarList extends Component {
  constructor() {
    super();
  }

  state = {
    response: null,
    carList: [],
    spinner: false,
  };

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
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
                car_plate: node.car_plate,
                car_color: node.car_color,
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

  onClickProduct(item) {
    let categoryId = window.selectedCategoryId;
    window.selectedCarIdList = item;
    window.selectedCarName = item.name;

    Alert.alert('VAL-E', 'Talep İşlemleri', [
      {
        text: 'Geri',
        onPress: () => {},
      },
      {
        text: 'Seç',
        onPress: () => {
          if (categoryId === 1) {
            const {navigation} = this.props;
            navigation.navigate('CarTireService');
          } else if (categoryId === 2) {
            const {navigation} = this.props;
            navigation.navigate('CarWashService');
          } else if (categoryId === 3) {
            const {navigation} = this.props;
            navigation.navigate('CarTowService');
          } else if (categoryId === 4) {
            const {navigation} = this.props;
            navigation.navigate('CarRepairService');
          } else if (categoryId === 5) {
            const {navigation} = this.props;
            navigation.navigate('CarBatteryService');
          } else if (categoryId === 6) {
            const {navigation} = this.props;
            navigation.navigate('CarKeyService');
          } else if (categoryId === 7) {
            const {navigation} = this.props;
            navigation.navigate('CarPartsService');
          }
        },
      },
    ]);
  }

  renderMyCars = ({item, index}) => {
    return (
      <View style={styles.list}>
        <View
          style={{
            alignSelf: 'flex-end',
            marginTop: 5,
          }}>
          <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
            <Image
              source={require('../../assets/images/tap.png')}
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
              <Text style={styles.itemText_Bold}>Marka</Text>
              <Text style={styles.itemText}>- {item.brand}</Text>
              <Text style={styles.itemText_Bold}>Model</Text>
              <Text style={styles.itemText}>- {item.brand_model}</Text>
              <Text style={styles.itemText_Bold}>Model Detay</Text>
              <Text style={styles.itemText} numberOfLines={1}>
                - {item.brand_model_pack}
              </Text>
            </View>
            <View style={styles.listChildView_2}>
              <Text style={styles.itemText_Bold}>Model Yılı</Text>
              <Text style={styles.itemText}>- {item.car_year}</Text>
              <Text style={styles.itemText_Bold}>Yakıt Tipi</Text>
              <Text style={styles.itemText}>- {item.car_fuel_type}</Text>
              <Text style={styles.itemText_Bold}>Vites Tipi</Text>
              <Text style={styles.itemText}>- {item.car_gear_type}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let listDatas = this.state.carList;
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.spinner} color="#1d5cdd" />
        <View style={{flex: 0.9}}>
          {listDatas.length > 0 ? (
            <FlatList
              data={this.state.carList}
              renderItem={this.renderMyCars}
            />
          ) : (
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <Text style={styles.itemText_Bold}>
                Garajınıza eklenmiş araç bulunmamaktadır.
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
