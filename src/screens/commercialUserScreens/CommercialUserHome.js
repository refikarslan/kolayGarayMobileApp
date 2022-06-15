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
  TextInput,
  ScrollView,
  Linking,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import {CONSTANT} from '../../constant/Constant';

export class CommercialUserHome extends Component {
  constructor() {
    super();
    this.createOffer = this.createOffer.bind(this);
    this.handlePriceTest = this.handlePriceTest.bind(this);
  }

  state = {
    response: null,
    myRequestList: [],
    spinner: false,
    modalVisible: false,
    myOfferList: [],
  };
  createOffer() {
    if (
      window.selected_request.id === null ||
      window.selected_request.id === undefined ||
      window.offer_price === null ||
      window.offer_price === undefined
    ) {
      Alert.alert(
        'Uyarı !',
        'Teklif tutarı alanını doğru ve eksiksiz doldurduğunuzdan emin olun.',
        [
          {
            text: 'Tamam',
            onPress: () => {},
          },
        ],
      );
    } else {
      let bodyParameter = {
        request_id: window.selected_request.id,
        status: 0,
        description: window.offer_description,
        price: window.offer_price,
      };
      fetch(CONSTANT.baseUrl + 'offer', {
        method: 'POST',
        dataType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyParameter),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status !== 'fail') {
            Alert.alert('Başarılı !', 'Hizmet teklifiniz alınmıştır.', [
              {
                text: 'Tamam',
                onPress: () => {
                  window.offer_description = null;
                  window.offer_price = null;
                  this.setState({modalVisible: false});
                },
              },
            ]);
          } else if (res.status === 'fail') {
            if (res.data === 'Bu talebe teklif oluşturulamaz.') {
              Alert.alert(
                'VALE',
                'Bu talebe daha önceden teklif verdiğiniz için yeniden teklif veremezsiniz. ' +
                  'Dilerseniz Tekliflerim sayfasından eski teklifinizi silerek yeni teklif oluşturabilirsiniz.',
                [{text: 'Tamam', onPress: () => null}],
              );
            } else {
              Alert.alert(
                'VALE',
                'Teklif verebilmeniz için yeterli VAL-E Jetonunuz bulunmamaktadır.',
                [
                  {text: 'Tamam', onPress: () => null},
                  {
                    text: 'Jeton Satın Al',
                    onPress: () => {
                      Linking.openURL('https://val-e.app/');
                    },
                  },
                ],
              );
            }
          } else {
            Alert.alert('HATA !', 'Hata, bir sıkıntı oldu !', [
              {text: 'Tamam', onPress: () => null},
            ]);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
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
      fetch(CONSTANT.baseUrl + 'request/available', {
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
                user_name: node.user_name,
                extra: node.extra,
                creation_date: node.creation_date,
                modification_date: node.modification_date,
                status: node.status,
                category: node.category,
                sub_category: node.sub_category,
                car_type: node.car_type,
                location_city: node.location_city,
                location_state: node.location_state,
                description: node.description,
              };
              listData.push(obj);
            });
            window.listD = listData;
            this.setState({
              response: res.data,
              myRequestList: listData,
              spinner: !this.state.spinner,
            });
          } else {
            Alert.alert('', 'Teklif bekleyen hizmet talebi bulunmamaktadır.', [
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

  onClickRequest(item) {
    let listData = [];
    listData.push(item);
    this.setState({modalVisible: true, myOfferList: listData});
    window.selected_request = item;
  }

  onClickOffer(item) {}

  handlePriceTest(e) {
    let price = parseInt(e);
    if (price > 0) {
      window.offer_price = price;
    } else {
      window.offer_price = null;
    }
  }

  renderMyOffer = ({item, index}) => {
    if (item.category === 1) {
      if (item.sub_category === 1) {
        return (
          <View style={styles.list_Modal}>
            <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
              <View style={styles.listStyle_Modal}>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>İl-İlçe </Text>
                  <Text style={styles.itemText}>
                    {item.location_city + '-' + item.location_state}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Araç Tipi </Text>
                  <Text style={styles.itemText}>{item.car_type}</Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>
                    Lastik otel hizmeti ister misiniz?
                  </Text>
                  <Text style={styles.itemText}>
                    {item.extra.tire_hotel_service === 1 ? 'Evet' : 'Hayır'}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>
                    VAL-E hizmeti ister misiniz?
                  </Text>
                  <Text style={styles.itemText}>
                    {item.extra.valet_service === 1 ? 'Evet' : 'Hayır'}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Detay </Text>
                  <Text style={styles.itemText}>{item.description}</Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Teklif Açıklaması </Text>
                  <TextInput
                    placeholder=" Teklife dair açıklama."
                    placeholderTextColor="#808080"
                    style={styles.nameInput}
                    textContentType="name"
                    onChangeText={e => (window.offer_description = e)}
                    value={window.offer_description}
                  />
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Teklif Tutarı </Text>
                  <TextInput
                    placeholder=" Fiyat "
                    placeholderTextColor="#808080"
                    style={styles.nameInput}
                    textContentType="name"
                    onChangeText={e => {
                      if (parseInt(e) > 0) {
                        window.offer_price = e;
                      } else {
                        window.offer_price = undefined;
                      }
                    }}
                    value={window.offer_price}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.listChildView_1_Modal}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.createOffer}>
                    <View style={styles.girisYapRow}>
                      <Text style={styles.girisYap}>Teklif Ver</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else if (item.sub_category === 2) {
        return (
          <View style={styles.list_Modal}>
            <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
              <View style={styles.listStyle_Modal}>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>İl-İlçe </Text>
                  <Text style={styles.itemText}>
                    {item.location_city + '-' + item.location_state}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Araç Tipi </Text>
                  <Text style={styles.itemText}>{item.car_type}</Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Araç Lastik Tipi</Text>
                  <Text style={styles.itemText}>
                    {item.extra.tire_type === 'SUMMER'
                      ? 'YAZLIK'
                      : item.extra.tire_type === 'WINTER'
                      ? 'KIŞLIK'
                      : '4 MEVSİM'}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Araç Lastik Ebatı</Text>
                  <Text style={styles.itemText}>{item.extra.tire_sizes}</Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>
                    VAL-E hizmeti ister misiniz?
                  </Text>
                  <Text style={styles.itemText}>
                    {item.extra.valet_service === 1 ? 'Evet' : 'Hayır'}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Detay </Text>
                  <Text style={styles.itemText}>{item.description}</Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Teklif Açıklaması </Text>
                  <TextInput
                    placeholder=" Teklife dair açıklama."
                    placeholderTextColor="#808080"
                    style={styles.nameInput}
                    textContentType="name"
                    onChangeText={e => (window.offer_description = e)}
                    value={window.offer_description}
                  />
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Teklif Tutarı </Text>
                  <TextInput
                    placeholder=" Fiyat "
                    placeholderTextColor="#808080"
                    style={styles.nameInput}
                    textContentType="name"
                    onChangeText={e => {
                      if (parseInt(e) > 0) {
                        window.offer_price = e;
                      } else {
                        window.offer_price = undefined;
                      }
                    }}
                    value={window.offer_price}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.listChildView_1_Modal}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.createOffer}>
                    <View style={styles.girisYapRow}>
                      <Text style={styles.girisYap}>Teklif Ver</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    } else if (item.category === 2) {
      if (item.sub_category === 1) {
        return (
          <View style={styles.list_Modal}>
            <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
              <View style={styles.listStyle_Modal}>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>İl-İlçe </Text>
                  <Text style={styles.itemText}>
                    {item.location_city + '-' + item.location_state}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Araç Tipi </Text>
                  <Text style={styles.itemText}>{item.car_type}</Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Yıkama Tipi</Text>
                  <Text style={styles.itemText}>
                    {item.extra.wash_type === 'INT_EXT'
                      ? 'İç - Dış Yıkama'
                      : item.extra.wash_type === 'EXTERIOR'
                      ? 'Sadece Dış Yıkama'
                      : item.extra.wash_type === 'INTERIOR'
                      ? 'Sadece İç Yıkama'
                      : 'Detaylı Temizlik'}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>
                    Motor temizliği ister misiniz?
                  </Text>
                  <Text style={styles.itemText}>
                    {item.extra.wash_engine === 1 ? 'Evet' : 'Hayır'}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>
                    Koltuk temizliği ister misiniz?
                  </Text>
                  <Text style={styles.itemText}>
                    {item.extra.wash_seat === 1 ? 'Evet' : 'Hayır'}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>
                    Dezenfeksiyon ister misiniz?
                  </Text>
                  <Text style={styles.itemText}>
                    {item.extra.wash_disenfection === 1 ? 'Evet' : 'Hayır'}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>
                    VAL-E hizmeti ister misiniz?
                  </Text>
                  <Text style={styles.itemText}>
                    {item.extra.valet_service === 1 ? 'Evet' : 'Hayır'}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Detay </Text>
                  <Text style={styles.itemText}>{item.description}</Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Teklif Açıklaması </Text>
                  <TextInput
                    placeholder=" Teklife dair açıklama."
                    placeholderTextColor="#808080"
                    style={styles.nameInput}
                    textContentType="name"
                    onChangeText={e => (window.offer_description = e)}
                    value={window.offer_description}
                  />
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Teklif Tutarı </Text>
                  <TextInput
                    placeholder=" Fiyat "
                    placeholderTextColor="#808080"
                    style={styles.nameInput}
                    textContentType="name"
                    onChangeText={e => {
                      if (parseInt(e) > 0) {
                        window.offer_price = e;
                      } else {
                        window.offer_price = undefined;
                      }
                    }}
                    value={window.offer_price}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.listChildView_1_Modal}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.createOffer}>
                    <View style={styles.girisYapRow}>
                      <Text style={styles.girisYap}>Teklif Ver</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else if (item.sub_category === 2) {
        return (
          <View style={styles.list_Modal}>
            <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
              <View style={styles.listStyle_Modal}>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>İl-İlçe </Text>
                  <Text style={styles.itemText}>
                    {item.location_city + '-' + item.location_state}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Araç Tipi </Text>
                  <Text style={styles.itemText}>{item.car_type}</Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>
                    VAL-E hizmeti ister misiniz?
                  </Text>
                  <Text style={styles.itemText}>
                    {item.extra.valet_service === 1 ? 'Evet' : 'Hayır'}
                  </Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Detay </Text>
                  <Text style={styles.itemText}>{item.description}</Text>
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Teklif Açıklaması </Text>
                  <TextInput
                    placeholder=" Teklife dair açıklama."
                    placeholderTextColor="#808080"
                    style={styles.nameInput}
                    textContentType="name"
                    onChangeText={e => (window.offer_description = e)}
                    value={window.offer_description}
                  />
                </View>
                <View style={styles.listChildView_2_Modal}>
                  <Text style={styles.itemText_Bold}>Teklif Tutarı </Text>
                  <TextInput
                    placeholder=" Fiyat "
                    placeholderTextColor="#808080"
                    style={styles.nameInput}
                    textContentType="name"
                    onChangeText={e => {
                      if (parseInt(e) > 0) {
                        window.offer_price = e;
                      } else {
                        window.offer_price = undefined;
                      }
                    }}
                    value={window.offer_price}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.listChildView_1_Modal}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.createOffer}>
                    <View style={styles.girisYapRow}>
                      <Text style={styles.girisYap}>Teklif Ver</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    } else if (item.category === 3) {
      return (
        <View style={styles.list_Modal}>
          <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
            <View style={styles.listStyle_Modal}>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>İl-İlçe </Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_state}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Tipi </Text>
                <Text style={styles.itemText}>{item.car_type}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Alınacak Yer </Text>
                <Text style={styles.itemText}>{item.extra.towing_source}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Bırakılacak Yer </Text>
                <Text style={styles.itemText}>
                  {item.extra.towing_destination}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>
                  Araç çekiciye yüklenir mi?
                </Text>
                <Text style={styles.itemText}>
                  {item.extra.towing_block === 1 ? 'Evet' : 'Yüklenmesi Zor'}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>
                  Araç kazalı mı?/arızalı mı?
                </Text>
                <Text style={styles.itemText}>
                  {item.extra.towing_crashed === 1
                    ? 'Evet'
                    : 'Hayır Kazalı Değil'}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Detay </Text>
                <Text style={styles.itemText}>{item.description}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Açıklaması </Text>
                <TextInput
                  placeholder=" Teklife dair açıklama."
                  placeholderTextColor="#808080"
                  style={styles.nameInput}
                  textContentType="name"
                  onChangeText={e => (window.offer_description = e)}
                  value={window.offer_description}
                />
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Tutarı </Text>
                <TextInput
                  placeholder=" Fiyat "
                  placeholderTextColor="#808080"
                  style={styles.nameInput}
                  textContentType="name"
                  onChangeText={e => {
                    if (parseInt(e) > 0) {
                      window.offer_price = e;
                    } else {
                      window.offer_price = undefined;
                    }
                  }}
                  value={window.offer_price}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.listChildView_1_Modal}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.createOffer}>
                  <View style={styles.girisYapRow}>
                    <Text style={styles.girisYap}>Teklif Ver</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 4) {
      return (
        <View style={styles.list_Modal}>
          <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
            <View style={styles.listStyle_Modal}>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>İl-İlçe </Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_state}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Tipi </Text>
                <Text style={styles.itemText}>{item.car_type}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Marka </Text>
                <Text style={styles.itemText}>{item.extra.brand}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model </Text>
                <Text style={styles.itemText}>{item.extra.brand_model}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model Detay </Text>
                <Text style={styles.itemText}>
                  {item.extra.brand_model_pack}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model Yılı</Text>
                <Text style={styles.itemText}>{item.extra.car_year}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Yakıt Tipi</Text>
                <Text style={styles.itemText}>{item.extra.car_fuel_type}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Vites Tipi</Text>
                <Text style={styles.itemText}>{item.extra.car_gear_type}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Detay </Text>
                <Text style={styles.itemText}>{item.description}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Açıklaması </Text>
                <TextInput
                  placeholder=" Teklife dair açıklama."
                  placeholderTextColor="#808080"
                  style={styles.nameInput}
                  textContentType="name"
                  onChangeText={e => (window.offer_description = e)}
                  value={window.offer_description}
                />
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Tutarı </Text>
                <TextInput
                  placeholder=" Fiyat "
                  placeholderTextColor="#808080"
                  style={styles.nameInput}
                  textContentType="name"
                  onChangeText={e => {
                    if (parseInt(e) > 0) {
                      window.offer_price = e;
                    } else {
                      window.offer_price = undefined;
                    }
                  }}
                  value={window.offer_price}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.listChildView_1_Modal}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.createOffer}>
                  <View style={styles.girisYapRow}>
                    <Text style={styles.girisYap}>Teklif Ver</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 5) {
      return (
        <View style={styles.list_Modal}>
          <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
            <View style={styles.listStyle_Modal}>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>İl-İlçe </Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_state}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Tipi </Text>
                <Text style={styles.itemText}>{item.car_type}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Marka </Text>
                <Text style={styles.itemText}>{item.extra.brand}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model </Text>
                <Text style={styles.itemText}>{item.extra.brand_model}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model Detay </Text>
                <Text style={styles.itemText}>
                  {item.extra.brand_model_pack}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model Yılı</Text>
                <Text style={styles.itemText}>{item.extra.car_year}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Yakıt Tipi</Text>
                <Text style={styles.itemText}>{item.extra.car_fuel_type}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Start/Stop Akü ?</Text>
                <Text style={styles.itemText}>{item.extra.car_ss_type}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Akü Voltajı</Text>
                <Text style={styles.itemText}>{item.extra.battery_volt}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Akü Amperi</Text>
                <Text style={styles.itemText}>{item.extra.battery_ampere}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Detay </Text>
                <Text style={styles.itemText}>{item.description}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Açıklaması </Text>
                <TextInput
                  placeholder=" Teklife dair açıklama."
                  placeholderTextColor="#808080"
                  style={styles.nameInput}
                  textContentType="name"
                  onChangeText={e => (window.offer_description = e)}
                  value={window.offer_description}
                />
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Tutarı </Text>
                <TextInput
                  placeholder=" Fiyat "
                  placeholderTextColor="#808080"
                  style={styles.nameInput}
                  textContentType="name"
                  onChangeText={e => {
                    if (parseInt(e) > 0) {
                      window.offer_price = e;
                    } else {
                      window.offer_price = undefined;
                    }
                  }}
                  value={window.offer_price}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.listChildView_1_Modal}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.createOffer}>
                  <View style={styles.girisYapRow}>
                    <Text style={styles.girisYap}>Teklif Ver</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 6) {
      return (
        <View style={styles.list_Modal}>
          <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
            <View style={styles.listStyle_Modal}>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>İl-İlçe </Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_state}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Tipi </Text>
                <Text style={styles.itemText}>{item.car_type}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Marka </Text>
                <Text style={styles.itemText}>{item.extra.brand}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model </Text>
                <Text style={styles.itemText}>{item.extra.brand_model}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model Detay </Text>
                <Text style={styles.itemText}>
                  {item.extra.brand_model_pack}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model Yılı</Text>
                <Text style={styles.itemText}>{item.extra.car_year}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Detay </Text>
                <Text style={styles.itemText}>{item.description}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Açıklaması </Text>
                <TextInput
                  placeholder=" Teklife dair açıklama."
                  placeholderTextColor="#808080"
                  style={styles.nameInput}
                  textContentType="name"
                  onChangeText={e => (window.offer_description = e)}
                  value={window.offer_description}
                />
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Tutarı </Text>
                <TextInput
                  placeholder=" Fiyat "
                  placeholderTextColor="#808080"
                  style={styles.nameInput}
                  textContentType="name"
                  onChangeText={e => {
                    if (parseInt(e) > 0) {
                      window.offer_price = e;
                    } else {
                      window.offer_price = undefined;
                    }
                  }}
                  value={window.offer_price}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.listChildView_1_Modal}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.createOffer}>
                  <View style={styles.girisYapRow}>
                    <Text style={styles.girisYap}>Teklif Ver</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 7) {
      return (
        <View style={styles.list_Modal}>
          <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
            <View style={styles.listStyle_Modal}>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>İl-İlçe </Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_state}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Tipi </Text>
                <Text style={styles.itemText}>{item.car_type}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Marka </Text>
                <Text style={styles.itemText}>{item.extra.brand}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model </Text>
                <Text style={styles.itemText}>{item.extra.brand_model}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model Detay </Text>
                <Text style={styles.itemText}>
                  {item.extra.brand_model_pack}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Model Yılı</Text>
                <Text style={styles.itemText}>{item.extra.car_year}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Araç Şasi No</Text>
                <Text style={styles.itemText}>{item.extra.car_chassis_no}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Parça OEM No</Text>
                <Text style={styles.itemText}>{item.extra.part_oem_no}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Detay </Text>
                <Text style={styles.itemText}>{item.description}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Açıklaması </Text>
                <TextInput
                  placeholder=" Teklife dair açıklama."
                  placeholderTextColor="#808080"
                  style={styles.nameInput}
                  textContentType="name"
                  onChangeText={e => (window.offer_description = e)}
                  value={window.offer_description}
                />
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Tutarı </Text>
                <TextInput
                  placeholder=" Fiyat "
                  placeholderTextColor="#808080"
                  style={styles.nameInput}
                  textContentType="name"
                  onChangeText={e => {
                    if (parseInt(e) > 0) {
                      window.offer_price = e;
                    } else {
                      window.offer_price = undefined;
                    }
                  }}
                  value={window.offer_price}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.listChildView_1_Modal}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.createOffer}>
                  <View style={styles.girisYapRow}>
                    <Text style={styles.girisYap}>Teklif Ver</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderMyRequest = ({item, index}) => {
    if (item.category === 1) {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
              position: 'absolute',
            }}>
            <Image
              source={require('../../assets/images/iconPng/carTire.png')}
              style={{
                width: 75,
                height: 75,
                opacity: 0.2,
              }}
            />
          </View>
          <TouchableOpacity onPress={this.onClickRequest.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_2}>
                <Text style={styles.itemText_Bold}>Araç Tipi</Text>
                <Text style={styles.itemText}>- {item.car_type}</Text>
                <Text style={styles.itemText_Bold}>Talep Tarihi</Text>
                <Text style={styles.itemText}>- {item.creation_date}</Text>
                <Text style={styles.itemText_Bold}>İl - İlçe</Text>
                <Text style={styles.itemText}>
                  - {item.location_city + '/' + item.location_state}
                </Text>
                <Text style={styles.itemText_Bold}>Talep Detayı</Text>
                <Text style={styles.itemText}>- {item.description}</Text>
              </View>

              <View style={styles.listChildView_1}>
                <Text style={styles.itemButton}> TEKLİF VER </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 2) {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
              position: 'absolute',
            }}>
            <Image
              source={require('../../assets/images/iconPng/carWash.png')}
              style={{
                width: 75,
                height: 75,
                opacity: 0.2,
              }}
            />
          </View>
          <TouchableOpacity onPress={this.onClickRequest.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_2}>
                <Text style={styles.itemText_Bold}>Araç Tipi</Text>
                <Text style={styles.itemText}>- {item.car_type}</Text>
                <Text style={styles.itemText_Bold}>Talep Tarihi</Text>
                <Text style={styles.itemText}>- {item.creation_date}</Text>
                <Text style={styles.itemText_Bold}>İl - İlçe</Text>
                <Text style={styles.itemText}>
                  - {item.location_city + '/' + item.location_state}
                </Text>
                <Text style={styles.itemText_Bold}>Talep Detayı</Text>
                <Text style={styles.itemText}>- {item.description}</Text>
              </View>

              <View style={styles.listChildView_1}>
                <Text style={styles.itemButton}> TEKLİF VER </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 3) {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
              position: 'absolute',
            }}>
            <Image
              source={require('../../assets/images/iconPng/carTow.png')}
              style={{
                width: 75,
                height: 75,
                opacity: 0.2,
              }}
            />
          </View>
          <TouchableOpacity onPress={this.onClickRequest.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_2}>
                <Text style={styles.itemText_Bold}>Araç Tipi</Text>
                <Text style={styles.itemText}>- {item.car_type}</Text>
                <Text style={styles.itemText_Bold}>Talep Tarihi</Text>
                <Text style={styles.itemText}>- {item.creation_date}</Text>
                <Text style={styles.itemText_Bold}>İl - İlçe</Text>
                <Text style={styles.itemText}>
                  - {item.location_city + '/' + item.location_state}
                </Text>
                <Text style={styles.itemText_Bold}>Talep Detayı</Text>
                <Text style={styles.itemText}>- {item.description}</Text>
              </View>

              <View style={styles.listChildView_1}>
                <Text style={styles.itemButton}> TEKLİF VER </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 4) {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
              position: 'absolute',
            }}>
            <Image
              source={require('../../assets/images/iconPng/carService.png')}
              style={{
                width: 75,
                height: 75,
                opacity: 0.2,
              }}
            />
          </View>
          <TouchableOpacity onPress={this.onClickRequest.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_2}>
                <Text style={styles.itemText_Bold}>Araç Tipi</Text>
                <Text style={styles.itemText}>- {item.car_type}</Text>
                <Text style={styles.itemText_Bold}>Talep Tarihi</Text>
                <Text style={styles.itemText}>- {item.creation_date}</Text>
                <Text style={styles.itemText_Bold}>İl - İlçe</Text>
                <Text style={styles.itemText}>
                  - {item.location_city + '/' + item.location_state}
                </Text>
                <Text style={styles.itemText_Bold}>Talep Detayı</Text>
                <Text style={styles.itemText}>- {item.description}</Text>
              </View>

              <View style={styles.listChildView_1}>
                <Text style={styles.itemButton}> TEKLİF VER </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 5) {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
              position: 'absolute',
            }}>
            <Image
              source={require('../../assets/images/iconPng/carBattery.png')}
              style={{
                width: 75,
                height: 75,
                opacity: 0.2,
              }}
            />
          </View>
          <TouchableOpacity onPress={this.onClickRequest.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_2}>
                <Text style={styles.itemText_Bold}>Araç Tipi</Text>
                <Text style={styles.itemText}>- {item.car_type}</Text>
                <Text style={styles.itemText_Bold}>Talep Tarihi</Text>
                <Text style={styles.itemText}>- {item.creation_date}</Text>
                <Text style={styles.itemText_Bold}>İl - İlçe</Text>
                <Text style={styles.itemText}>
                  - {item.location_city + '/' + item.location_state}
                </Text>
                <Text style={styles.itemText_Bold}>Talep Detayı</Text>
                <Text style={styles.itemText}>- {item.description}</Text>
              </View>

              <View style={styles.listChildView_1}>
                <Text style={styles.itemButton}> TEKLİF VER </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 6) {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
              position: 'absolute',
            }}>
            <Image
              source={require('../../assets/images/iconPng/carKey.png')}
              style={{
                width: 75,
                height: 75,
                opacity: 0.2,
              }}
            />
          </View>
          <TouchableOpacity onPress={this.onClickRequest.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_2}>
                <Text style={styles.itemText_Bold}>Araç Tipi</Text>
                <Text style={styles.itemText}>- {item.car_type}</Text>
                <Text style={styles.itemText_Bold}>Talep Tarihi</Text>
                <Text style={styles.itemText}>- {item.creation_date}</Text>
                <Text style={styles.itemText_Bold}>İl - İlçe</Text>
                <Text style={styles.itemText}>
                  - {item.location_city + '/' + item.location_state}
                </Text>
                <Text style={styles.itemText_Bold}>Talep Detayı</Text>
                <Text style={styles.itemText}>- {item.description}</Text>
              </View>

              <View style={styles.listChildView_1}>
                <Text style={styles.itemButton}> TEKLİF VER </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 7) {
      return (
        <View style={styles.list}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
              position: 'absolute',
            }}>
            <Image
              source={require('../../assets/images/iconPng/carParts.png')}
              style={{
                width: 75,
                height: 75,
                opacity: 0.2,
              }}
            />
          </View>
          <TouchableOpacity onPress={this.onClickRequest.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_2}>
                <Text style={styles.itemText_Bold}>Araç Tipi</Text>
                <Text style={styles.itemText}>- {item.car_type}</Text>
                <Text style={styles.itemText_Bold}>Talep Tarihi</Text>
                <Text style={styles.itemText}>- {item.creation_date}</Text>
                <Text style={styles.itemText_Bold}>İl - İlçe</Text>
                <Text style={styles.itemText}>
                  - {item.location_city + '/' + item.location_state}
                </Text>
                <Text style={styles.itemText_Bold}>Talep Detayı</Text>
                <Text style={styles.itemText}>- {item.description}</Text>
              </View>

              <View style={styles.listChildView_1}>
                <Text style={styles.itemButton}> TEKLİF VER </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    const {modalVisible} = this.state;

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.spinner} color="#1d5cdd" />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!modalVisible);
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={40}
            style={{flex: 1}}>
            <View
              style={{
                marginTop: 150,
                marginLeft: 30,
                marginRight: 30,
                backgroundColor: 'white',
                borderRadius: 20,
                borderColor: 'rgb(14,68,145)',
                borderWidth: 1,
                padding: 25,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                flex: 0.7,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: width / 1.5,
                }}>
                <Text style={styles.pageHead_text}>TEKLİF VER</Text>

                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Image
                    source={require('../../assets/images/close.png')}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                data={this.state.myOfferList}
                renderItem={this.renderMyOffer}
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <View style={{flex: 0.9}}>
          <FlatList
            data={this.state.myRequestList}
            renderItem={this.renderMyRequest}
          />
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
    justifyContent: 'center',
    width: (width - 40) / 3,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgb(14,68,145)',
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
    fontSize: 9,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    color: 'rgb(14,68,145)',
  },
});
