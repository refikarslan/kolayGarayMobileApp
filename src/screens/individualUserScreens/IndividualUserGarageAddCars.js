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
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANT} from '../../constant/Constant';
import RadioButtonRN from 'radio-buttons-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import SelectDropdown from 'react-native-select-dropdown';

const car_year = [
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
  '1999',
  '1998',
  '1997',
  '1996',
  '1995',
  '1994',
  '1993',
  '1992',
  '1991',
  '1990',
  '1989',
  '1988',
  '1987',
  '1986',
  '1985',
  '1984',
  '1983',
  '1982',
  '1981',
  '1980',
  '1979',
  '1978',
  '1977',
  '1976',
  '1975',
  '1974',
  '1973',
  '1972',
  '1971',
  '1970',
  'Daha Eski',
];

const carFuelType = ['Benzin', 'LPG', 'Dizel', 'Hibrit'];

const carGearType = ['Manuel Vites', 'Otomatik Vites', 'Yarı Otomatik Vites'];

const carDataType = [
  'Otomobil',
  'Arazi-SUV',
  'Mini Van-Panel Van',
  'Ticari Araç',
];

const carColor = [
  'Bej',
  'Beyaz',
  'Bordo',
  'Füme',
  'Gri',
  'Gümüş Gri',
  'Kahverengi',
  'Kırmızı',
  'Lacivert',
  'Mavi',
  'Mor',
  'Pembe',
  'Sarı',
  'Siyah',
  'Şampanya',
  'Turkuaz',
  'Turuncu',
  'Yeşil',
];

export class IndividualUserGarageAddCars extends Component {
  constructor() {
    super();
    this.handleName = this.handleName.bind(this);
    this.handleCarBrand = this.handleCarBrand.bind(this);
    this.handleCarBrandModel = this.handleCarBrandModel.bind(this);
    this.handleCarBrandModelDetail = this.handleCarBrandModelDetail.bind(this);
    this.handleCarYear = this.handleCarYear.bind(this);
    this.getCarBrandModel = this.getCarBrandModel.bind(this);
    this.getCarBrandModelPack = this.getCarBrandModelPack.bind(this);
    this.handleCarPlate = this.handleCarPlate.bind(this);
    this.carAddGarage = this.carAddGarage.bind(this);
    this.handleCarTireSize = this.handleCarTireSize.bind(this);

    this.state = {
      full_brand: [],
      full_brand_model: [],
      full_brand_pack_model: [],
      name: null,
      car_type: null,
      brand: null,
      brand_model: null,
      brand_model_pack: null,
      car_year: null,
      car_fuel_type: null,
      car_gear_type: null,
      car_color: null,
      car_plate: null,
      car_tire_size: null,
      spinner: false,
      brand_list: [],
      brandModel_list: [],
      brandModelPack_list: [],
      disabledBrandModelSelectBox: true,
      disabledBrandModelPackSelectBox: true,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      fetch(CONSTANT.baseUrl + 'brand', {
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
            let carBrandList = [];
            res.data.map(node => {
              carBrandList.push(node.name);
            });
            this.setState({
              full_brand: res.data,
              brand_list: carBrandList,
            });
            if (window.selectedGarageCarUpd !== undefined) {
              this.state.full_brand.map(node => {
                if (window.selectedGarageCarUpd.brand === node.name) {
                  fetch(CONSTANT.baseUrl + 'brand/model/list/' + node.id, {
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
                        let carBrandModelList = [];
                        res.data.map(node => {
                          carBrandModelList.push(node.name);
                        });
                        this.setState({
                          full_brand_model: res.data,
                          brandModel_list: carBrandModelList,
                          disabledBrandModelSelectBox: false,
                        });
                        this.state.full_brand_model.map(node => {
                          if (
                            window.selectedGarageCarUpd.brand_model ===
                            node.name
                          ) {
                            fetch(
                              CONSTANT.baseUrl +
                                'brand/model/pack/list/' +
                                node.id,
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
                                  let carBrandModelPackList = [];
                                  res.data.map(node => {
                                    carBrandModelPackList.push(node.name);
                                  });
                                  this.setState({
                                    full_brand_pack_model: res.data,
                                    brandModelPack_list: carBrandModelPackList,
                                    disabledBrandModelPackSelectBox: false,
                                  });
                                  this.setState({
                                    car_id: window.selectedGarageCarUpd.id,
                                    name: window.selectedGarageCarUpd.name,
                                    car_type:
                                      window.selectedGarageCarUpd.car_type,
                                    brand: window.selectedGarageCarUpd.brand,
                                    brand_model:
                                      window.selectedGarageCarUpd.brand_model,
                                    brand_model_pack:
                                      window.selectedGarageCarUpd
                                        .brand_model_pack,
                                    car_year:
                                      window.selectedGarageCarUpd.car_year,
                                    car_fuel_type:
                                      window.selectedGarageCarUpd.car_fuel_type,
                                    car_gear_type:
                                      window.selectedGarageCarUpd.car_gear_type,
                                    car_color:
                                      window.selectedGarageCarUpd.car_color,
                                    car_plate:
                                      window.selectedGarageCarUpd.car_plate,
                                    car_tire_size:
                                      window.selectedGarageCarUpd.car_tire_size,
                                  });
                                } else {
                                  Alert.alert(
                                    'VAL-E',
                                    'Araç model detayları getirelemedi.',
                                    [{text: 'Tamam', onPress: () => null}],
                                  );
                                }
                              })
                              .catch(e => {
                                console.log(e);
                              });
                          }
                        });
                      } else {
                        Alert.alert('VAL-E', 'Araç modelleri getirelemedi.', [
                          {text: 'Tamam', onPress: () => null},
                        ]);
                      }
                    })
                    .catch(e => {
                      console.log(e);
                    });
                }
              });
            }
          } else {
            Alert.alert('VAL-E', 'Araç markaları getirelemedi.', [
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

  getCarBrandModel(brand) {
    this.state.full_brand.map(node => {
      if (brand === node.name) {
        fetch(CONSTANT.baseUrl + 'brand/model/list/' + node.id, {
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
              let carBrandModelList = [];
              res.data.map(node => {
                carBrandModelList.push(node.name);
              });
              this.setState({
                full_brand_model: res.data,
                brandModel_list: carBrandModelList,
              });
            } else {
              Alert.alert('VAL-E', 'Araç modelleri getirelemedi.', [
                {text: 'Tamam', onPress: () => null},
              ]);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  }

  getCarBrandModelPack(brandPack) {
    this.state.full_brand_model.map(node => {
      if (brandPack === node.name) {
        fetch(CONSTANT.baseUrl + 'brand/model/pack/list/' + node.id, {
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
              let carBrandModelPackList = [];
              res.data.map(node => {
                carBrandModelPackList.push(node.name);
              });
              this.setState({
                full_brand_pack_model: res.data,
                brandModelPack_list: carBrandModelPackList,
              });
            } else {
              Alert.alert('VAL-E', 'Araç model detayları getirelemedi.', [
                {text: 'Tamam', onPress: () => null},
              ]);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  }

  carAddGarage() {
    if (window.selectedGarageCarUpd !== undefined) {
      if (
        this.state.name === null ||
        this.state.car_type === null ||
        this.state.brand === null ||
        this.state.brand_model === null ||
        this.state.brand_model_pack === null ||
        this.state.car_year === null ||
        this.state.car_fuel_type === null ||
        this.state.car_gear_type === null
      ) {
        Alert.alert(
          'Uyarı !',
          'Sizlere daha iyi hizmet sunabilmemiz için lütfen tüm alanları eksiksiz doldurduğunuzdan emin olun.',
          [
            {
              text: 'Tamam',
              onPress: () => {},
            },
          ],
        );
      } else {
        const {navigation} = this.props;
        this.setState({
          spinner: !this.state.spinner,
        });
        fetch(CONSTANT.baseUrl + 'garage/' + this.state.car_id, {
          method: 'PUT',
          dataType: 'json',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            car_type: this.state.car_type,
            brand: this.state.brand,
            brand_model: this.state.brand_model,
            brand_model_pack: this.state.brand_model_pack,
            car_fuel_type: this.state.car_fuel_type,
            car_gear_type: this.state.car_gear_type,
            car_year: this.state.car_year,
            car_plate: this.state.car_plate,
            car_color: this.state.car_color,
            car_tire_size: this.state.car_tire_size,
          }),
        })
          .then(response => response.json())
          .then(res => {
            if (res.status !== 'fail') {
              this.setState({response: res, spinner: !this.state.spinner});
              Alert.alert('Başarılı !', 'Aracınız garaja park edilmiştir :)', [
                {
                  text: 'Tamam',
                  onPress: () => {
                    const {navigation} = this.props;
                    navigation.navigate('IndividualUserHome');
                  },
                },
              ]);
            } else {
              this.setState({
                spinner: !this.state.spinner,
              });
              Alert.alert('HATA !', 'Hata, bir sıkıntı oldu !', [
                {text: 'Tamam', onPress: () => null},
              ]);
            }
          })
          .catch(e => {
            console.log(e);
            this.setState({
              spinner: !this.state.spinner,
            });
          });
      }
    } else {
      if (
        this.state.name === null ||
        this.state.car_type === null ||
        this.state.brand === null ||
        this.state.brand_model === null ||
        this.state.brand_model_pack === null ||
        this.state.car_year === null ||
        this.state.car_fuel_type === null ||
        this.state.car_gear_type === null
      ) {
        Alert.alert(
          'Uyarı !',
          'Sizlere daha iyi hizmet sunabilmemiz için lütfen tüm alanları eksiksiz doldurduğunuzdan emin olun.',
          [
            {
              text: 'Tamam',
              onPress: () => {},
            },
          ],
        );
      } else {
        const {navigation} = this.props;
        this.setState({
          spinner: !this.state.spinner,
        });
        fetch(CONSTANT.baseUrl + 'garage', {
          method: 'POST',
          dataType: 'json',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            car_type: this.state.car_type,
            brand: this.state.brand,
            brand_model: this.state.brand_model,
            brand_model_pack: this.state.brand_model_pack,
            car_fuel_type: this.state.car_fuel_type,
            car_gear_type: this.state.car_gear_type,
            car_year: this.state.car_year,
            car_plate: this.state.car_plate,
            car_color: this.state.car_color,
            car_tire_size: this.state.car_tire_size,
          }),
        })
          .then(response => response.json())
          .then(res => {
            if (res.status !== 'fail') {
              this.setState({response: res, spinner: !this.state.spinner});
              Alert.alert('Başarılı !', 'Aracınız garaja park edilmiştir :)', [
                {
                  text: 'Tamam',
                  onPress: () => {
                    const {navigation} = this.props;
                    navigation.navigate('IndividualUserHome');
                  },
                },
              ]);
            } else {
              this.setState({
                spinner: !this.state.spinner,
              });
              Alert.alert('HATA !', 'Hata, bir sıkıntı oldu !', [
                {text: 'Tamam', onPress: () => null},
              ]);
            }
          })
          .catch(e => {
            console.log(e);
            this.setState({
              spinner: !this.state.spinner,
            });
          });
      }
    }
  }

  handleCarTireSize = text => {
    this.setState({car_tire_size: text});
  };

  handleCarPlate = text => {
    this.setState({car_plate: text});
  };

  handleName = text => {
    this.setState({name: text});
  };

  handleCarBrand = text => {
    this.setState({brand: text});
  };

  handleCarBrandModel = text => {
    this.setState({brand_model: text});
  };

  handleCarBrandModelDetail = text => {
    this.setState({brand_model_pack: text});
  };

  handleCarYear = text => {
    this.setState({car_year: parseInt(text, 10)});
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <Spinner visible={this.state.spinner} color="#1d5cdd" />
          <View style={styles.View0}>
            <Text style={styles.textStandart}>Araç İsimlendirme</Text>
            <TextInput
              placeholder=" Örn. Kendi Aracım"
              placeholderTextColor="#808080"
              style={styles.mailInput}
              textContentType="name"
              onChangeText={this.handleName}
              value={this.state.name}
            />
          </View>
          <View style={styles.View5}>
            <Text style={styles.textStandart}>Araç Tipi</Text>
            <SelectDropdown
              data={carDataType}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                this.setState({car_type: selectedItem});
              }}
              defaultButtonText={'Araç Tipi Seçiniz'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <MaterialCommunityIcons
                    name={isOpened ? 'arrow-up' : 'arrow-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              defaultValue={this.state.car_type}
            />
          </View>
          <View style={styles.View5}>
            <Text style={styles.textStandart}>Araç Marka</Text>
            <SelectDropdown
              data={this.state.brand_list}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                this.setState({
                  brand: selectedItem,
                  disabledBrandModelSelectBox: false,
                });
                this.getCarBrandModel(selectedItem);
              }}
              defaultButtonText={'Marka Seçiniz'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <MaterialCommunityIcons
                    name={isOpened ? 'arrow-up' : 'arrow-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              defaultValue={this.state.brand}
            />
          </View>
          <View style={styles.View5}>
            <Text style={styles.textStandart}>Araç Model</Text>
            <SelectDropdown
              data={this.state.brandModel_list}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                this.setState({
                  brand_model: selectedItem,
                  disabledBrandModelPackSelectBox: false,
                });

                this.getCarBrandModelPack(selectedItem);
              }}
              defaultButtonText={'Model Seçiniz'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <MaterialCommunityIcons
                    name={isOpened ? 'arrow-up' : 'arrow-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              disabled={this.state.disabledBrandModelSelectBox}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              defaultValue={this.state.brand_model}
            />
          </View>
          <View style={styles.View5}>
            <Text style={styles.textStandart}>Araç Model Detay</Text>
            <SelectDropdown
              data={this.state.brandModelPack_list}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                this.setState({brand_model_pack: selectedItem});
              }}
              defaultButtonText={'Model Detayı Seçiniz'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <MaterialCommunityIcons
                    name={isOpened ? 'arrow-up' : 'arrow-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              disabled={this.state.disabledBrandModelSelectBox}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              defaultValue={this.state.brand_model_pack}
            />
          </View>
          <View style={styles.View5}>
            <Text style={styles.textStandart}>Araç Model Yılı</Text>
            <SelectDropdown
              data={car_year}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                this.setState({car_year: selectedItem});
              }}
              defaultButtonText={'Model Yılı Seçiniz'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <MaterialCommunityIcons
                    name={isOpened ? 'arrow-up' : 'arrow-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              defaultValue={this.state.car_year}
            />
          </View>
          <View style={styles.View3}>
            <Text style={styles.textStandart}>Araç Yakıt Tipi</Text>
            <SelectDropdown
              data={carFuelType}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                this.setState({car_fuel_type: selectedItem});
              }}
              defaultButtonText={'Araç Yakıtı Seçiniz'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <MaterialCommunityIcons
                    name={isOpened ? 'arrow-up' : 'arrow-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              defaultValue={this.state.car_fuel_type}
            />
          </View>
          <View style={styles.View4}>
            <Text style={styles.textStandart}>Araç Vites Tipi</Text>
            <SelectDropdown
              data={carGearType}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                this.setState({car_gear_type: selectedItem});
              }}
              defaultButtonText={'Vites Tipi Seçiniz'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <MaterialCommunityIcons
                    name={isOpened ? 'arrow-up' : 'arrow-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              defaultValue={this.state.car_gear_type}
            />
          </View>
          <View style={styles.View4}>
            <Text style={styles.textStandart}>Araç Lastik Ebatı</Text>
            <TextInput
              placeholder=" Örn. 215-65-16"
              placeholderTextColor="#808080"
              style={styles.mailInput}
              textContentType="name"
              onChangeText={this.handleCarTireSize}
              value={this.state.car_tire_size}
            />
          </View>
          <View style={styles.View4}>
            <Text style={styles.textStandart}>Araç Renk</Text>
            <SelectDropdown
              data={carColor}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                this.setState({car_color: selectedItem});
              }}
              defaultButtonText={'Renk Seçiniz'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <MaterialCommunityIcons
                    name={isOpened ? 'arrow-up' : 'arrow-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              defaultValue={this.state.car_color}
            />
          </View>
          <View style={styles.View4}>
            <Text style={styles.textStandart}>Araç Plaka</Text>
            <TextInput
              placeholder=" Örn. 06ABC123"
              placeholderTextColor="#808080"
              style={styles.mailInput}
              textContentType="name"
              onChangeText={this.handleCarPlate}
              value={this.state.car_plate}
            />
          </View>

          <View style={styles.signUpButtonView}>
            <TouchableOpacity style={styles.button} onPress={this.carAddGarage}>
              <View style={styles.kayitOlRow}>
                <Text style={styles.kayitOl}>Aracımı Ekle</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    height: height,
  },
  image: {
    width: 200,
    height: 200,
  },
  radioGrup: {
    height: 45,
    width: width - 60,
  },
  radioGrup_2: {
    height: 45,
    width: width - 60,
  },
  View0: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  View1: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View2: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View3: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View4: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View5: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  signUpButtonView: {
    flex: 1,
    alignItems: 'center',
    margin: 30,
  },
  nameInput: {
    color: '#121212',
    height: 40,
    width: width - 60,
    borderColor: '#0E4491FF',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingLeft: 10,
    shadowColor: '#015b7e',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  phoneInput: {
    color: '#121212',
    height: 40,
    width: width - 60,
    borderColor: '#0E4491FF',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingLeft: 10,
    shadowColor: '#015b7e',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  mailInput: {
    color: '#121212',
    height: 40,
    width: width - 60,
    borderColor: '#0E4491FF',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingLeft: 10,
    shadowColor: '#015b7e',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  detailInput: {
    color: '#121212',
    height: 100,
    width: width - 60,
    borderColor: '#0E4491FF',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingLeft: 10,
    shadowColor: '#015b7e',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  button: {
    width: width - 60,
    height: 45,
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
  headText: {
    color: 'rgb(0,0,0)',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    marginTop: 4,
  },
  girisYap: {
    color: 'rgb(0,0,0)',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginTop: 4,
  },
  girisYapButton: {
    color: '#015b7e',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginTop: 4,
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 40,
    height: 44,
    width: 40,
    marginLeft: 150,
  },
  girisYapRow: {
    height: 40,
    width: width - 60,
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
  },
  kayitOl: {
    color: 'rgb(255,255,255)',
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraLight',
    fontWeight: 'bold',
    marginTop: 2,
  },
  kayitOlRow: {
    height: 44,
    width: width - 40,
    flex: 1,
    alignItems: 'center',
    marginTop: 6,
  },
  textStandart: {
    color: 'rgb(0,0,0)',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'flex-start',
    marginLeft: 25,
    height: 25,
  },
  dropdown1BtnStyle: {
    flex: 1,
    height: 40,
    width: width - 60,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#015b7e',
    margin: 5,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left', fontSize: 12},
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
    borderColor: '#015b7e',
    borderRadius: 5,
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    height: 40,
  },
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left', fontSize: 13},
});
