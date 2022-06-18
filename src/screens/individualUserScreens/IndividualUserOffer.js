import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';

import {CONSTANT} from '../../constant/Constant';
import Spinner from 'react-native-loading-spinner-overlay';
import {Rating, AirbnbRating} from 'react-native-ratings';

export class IndividualUserOffer extends Component {
  constructor() {
    super();
  }

  state = {
    response: null,
    myRequestList: [],
    spinner: false,
    modalVisible: false,
    modalVisible_2: false,

    myOfferList: [],
    myOfferListReview: [],

    offerPoint: null,
    offerPointDesc: null,
  };

  acceptOffer(item) {
    let listDatas = this.state.myOfferList;
    let flag = false;
    listDatas.map(node => {
      if (node.status === 2) {
        flag = true;
      }
    });

    if (flag !== true) {
      const {navigation} = this.props;
      this.setState({
        spinner: !this.state.spinner,
      });
      fetch(CONSTANT.baseUrl + 'offer/action', {
        method: 'POST',
        dataType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item.id,
          action: 'accept',
          reason: '',
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status !== 'fail') {
            this.setState({response: res, spinner: !this.state.spinner});
            Alert.alert(
              'Başarılı !',
              'Kabul ettiğiniz teklifi firmaya bildirdik :)',
              [
                {
                  text: 'Tamam',
                  onPress: () => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'IndividualUserOfferScreen'}],
                    });
                  },
                },
              ],
            );
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
    } else {
      Alert.alert(
        'HATA !',
        'Birden fazla teklifi kabul edemezsiniz, kabul ettiğiniz teklif bulunmaktadır.',
        [
          {
            text: 'Tamam',
            onPress: () => {},
          },
        ],
      );
    }
  }

  offerReviewCreate(item) {
    let listDatas = this.state.myOfferList;
    let flag = false;
    listDatas.map(node => {
      if (node.status === 2) {
        flag = true;
      }
    });

    if (flag !== true) {
      const {navigation} = this.props;
      this.setState({
        spinner: !this.state.spinner,
      });
      fetch(CONSTANT.baseUrl + 'offer-review', {
        method: 'POST',
        dataType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offer_id: item.id,
          rating: this.state.offerPoint,
          comment: this.state.offerPointDesc,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status !== 'fail') {
            this.setState({response: res, spinner: !this.state.spinner});
            Alert.alert(
              'Başarılı !',
              'Yorumunuzu kayıt ederek, firmaya bildirdik :)',
              [
                {
                  text: 'Tamam',
                  onPress: () => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'IndividualUserOfferScreen'}],
                    });
                  },
                },
              ],
            );
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
    } else {
      Alert.alert(
        'HATA !',
        'Birden fazla teklifi kabul edemezsiniz, kabul ettiğiniz teklif bulunmaktadır.',
        [
          {
            text: 'Tamam',
            onPress: () => {},
          },
        ],
      );
    }
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  setModalVisible_2 = visible => {
    this.setState({modalVisible_2: visible});
  };

  async componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.setState({
        spinner: !this.state.spinner,
      });

      fetch(CONSTANT.baseUrl + 'request/my-requests', {
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
            Alert.alert('', 'Oluşturulmuş hizmet talebiniz bulunmamaktadır.', [
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

  onClickRequest(item) {
    this.setState({
      spinner: !this.state.spinner,
    });
    let id = item.id;
    window.selected_request = item;
    fetch(CONSTANT.baseUrl + 'offer/by-request/' + id, {
      method: 'GET',
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
          if (res.data.length > 0) {
            this.setState({
              myOfferList: res.data,
              modalVisible: true,
              spinner: !this.state.spinner,
            });
          } else {
            Alert.alert(
              'Kolay Garaj',
              'Henüz talebiniz için teklif verilmemiştir.',
              [{text: 'Tamam', onPress: () => null}],
            );
            this.setState({
              spinner: !this.state.spinner,
            });
          }
        } else {
          Alert.alert('Kolay Garaj', 'Teklifler getirilemedi.', [
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
  }

  async onClickRequestOfferReview(item) {
    let flagOfferReview = false;
    this.setState({
      spinner: !this.state.spinner,
    });
    let id = item.id;
    window.selected_request = item;

    await fetch(CONSTANT.baseUrl + 'offer/by-request/' + id, {
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
          if (res.data.length > 0) {
            let objList = [];
            res.data.map(node => {
              if (node.status === 2) {
                objList.push(node);
              }
            });
            fetch(CONSTANT.baseUrl + 'offer-review/', {
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
                  if (res.data.length > 0) {
                    res.data.map(node => {
                      if (node.offer_id === objList[0].id) {
                        flagOfferReview = true;
                      }
                    });

                    if (flagOfferReview !== true) {
                      this.setState({
                        myOfferListReview: objList,
                        modalVisible_2: true,
                        spinner: !this.state.spinner,
                      });
                    } else {
                      Alert.alert(
                        'Kolay Garaj',
                        'Daha önce bu hizmete puan verdiğiniz için tekrar puanlama işlemi yapamazsınız.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                      this.setState({
                        spinner: !this.state.spinner,
                      });
                    }
                  }
                } else {
                  Alert.alert(
                    'Kolay Garaj',
                    'Bir hata oldu, lütfen daha sonra tekrar deneyiniz.',
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
            Alert.alert(
              'Kolay Garaj',
              'Bir hata oldu, lütfen daha sonra tekrar deneyiniz.',
              [{text: 'Tamam', onPress: () => null}],
            );
            this.setState({
              spinner: !this.state.spinner,
            });
          }
        } else {
          Alert.alert(
            'Kolay Garaj',
            'Bir hata oldu, lütfen daha sonra tekrar deneyiniz.',
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
  }

  onClickOffer(item) {}

  renderMyOffer = ({item, index}) => {
    if (item.status === 0) {
      return (
        <View style={styles.list_Modal}>
          <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
            <View style={styles.listStyle_Modal}>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Firma Puanı: </Text>
                <View style={{marginBottom: 10}}>
                  <Rating
                    ratingCount={5}
                    imageSize={25}
                    showRating={false}
                    readonly={true}
                    startingValue={item.userCommercial.rating}
                  />
                </View>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Firma Adı: </Text>
                <Text style={styles.itemText}>
                  {item.userCommercial.company_name}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Firma Tel: </Text>
                <Text style={styles.itemText}>{'0' + item.user.phone}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Detayı: </Text>
                <Text style={styles.itemText}>{item.description}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Ücreti: </Text>
                <Text style={styles.itemText}>{item.price} ₺</Text>
              </View>
              <View style={styles.listChildView_1_Modal}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.acceptOffer.bind(this, item)}>
                  <View style={styles.girisYapRow}>
                    <Text style={styles.girisYap}>Teklifi Kabul Et</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.status === 1) {
      return (
        <View style={styles.list_Modal}>
          <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
            <View style={styles.listStyle_Modal}>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Firma Puanı: </Text>
                <View style={{marginBottom: 10}}>
                  <Rating
                    ratingCount={5}
                    imageSize={25}
                    showRating={false}
                    readonly={true}
                    startingValue={item.userCommercial.rating}
                  />
                </View>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Firma Adı: </Text>
                <Text style={styles.itemText}>
                  {item.userCommercial.company_name}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Firma Tel: </Text>
                <Text style={styles.itemText}>{'0' + item.user.phone}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Detayı: </Text>
                <Text style={styles.itemText}>{item.description}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Ücreti: </Text>
                <Text style={styles.itemText}>{item.price} ₺</Text>
              </View>
              <View style={styles.listChildView_1_Modal}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.acceptOffer.bind(this, item)}>
                  <View style={styles.girisYapRow}>
                    <Text style={styles.girisYap}>
                      Teklifi Tekrar Değerlendir
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.list_Modal}>
          <TouchableOpacity onPress={this.onClickOffer.bind(this, item)}>
            <View style={styles.listStyle_Modal}>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Firma Puanı: </Text>
                <View style={{marginBottom: 10}}>
                  <Rating
                    ratingCount={5}
                    imageSize={25}
                    showRating={false}
                    readonly={true}
                    startingValue={item.userCommercial.rating}
                  />
                </View>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Firma Adı: </Text>
                <Text style={styles.itemText}>
                  {item.userCommercial.company_name}
                </Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Firma Tel: </Text>
                <Text style={styles.itemText}>{'0' + item.user.phone}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Detayı: </Text>
                <Text style={styles.itemText}>{item.description}</Text>
              </View>
              <View style={styles.listChildView_2_Modal}>
                <Text style={styles.itemText_Bold}>Teklif Ücreti: </Text>
                <Text style={styles.itemText}>{item.price} ₺</Text>
              </View>
              <View style={styles.listChildView_1_Modal}>
                <TouchableOpacity
                  style={styles.button_2}
                  onPress={this.acceptOffer.bind(this, item)}
                  disabled={true}>
                  <View style={styles.girisYapRow}>
                    <Text style={styles.girisYap}>Teklif Kabul Edildi</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderMyOfferReview = ({item, index}) => {
    return (
      <View style={styles.list_Modal}>
        <View style={styles.listStyle_Modal}>
          <View style={styles.listChildView_2_Modal}>
            <Text style={styles.itemText_Bold}>Firma Adı: </Text>
            <Text style={styles.itemText}>
              {item.userCommercial.company_name}
            </Text>
          </View>
          <View style={styles.listChildView_2_Modal}>
            <Text style={styles.itemText_Bold}>Teklif Detayı: </Text>
            <Text style={styles.itemText}>{item.description}</Text>
          </View>
          <View style={styles.listChildView_2_Modal}>
            <Text style={styles.itemText_Bold}>Teklif Ücreti: </Text>
            <Text style={styles.itemText}>{item.price} ₺</Text>
          </View>
          <View style={styles.listChildView_2_Modal_2}>
            <Text style={styles.itemText_Bold}>Puan: </Text>
            <View style={{marginBottom: 10, alignSelf: 'center'}}>
              <AirbnbRating
                count={5}
                size={25}
                defaultRating={4}
                reviews={['Çok Kötü', 'Kötü', 'İdare Eder', 'İyi', 'Çok İyi']}
                onFinishRating={e => {
                  this.setState({offerPoint: e});
                }}
              />
            </View>
          </View>
          <View style={styles.listChildView_2_Modal}>
            <Text style={styles.itemText_Bold}>Yorum: </Text>
            <TextInput
              placeholder="Aldığınız hizmetten memnuniyetinizi yorumlayabilirsiniz."
              placeholderTextColor="#808080"
              style={styles.nameInput}
              textContentType="name"
              onChangeText={e => {
                this.setState({offerPointDesc: e});
              }}
              value={this.state.offerPointDesc}
              multiline={true}
              numberOfLines={15}
            />
          </View>
          <View style={styles.listChildView_1_Modal}>
            <TouchableOpacity
              style={styles.button_2}
              onPress={this.offerReviewCreate.bind(this, item)}>
              <View style={styles.girisYapRow}>
                <Text style={styles.girisYap}>Hizmeti Puanla</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderMyRequest = ({item, index}) => {
    if (item.category === 1) {
      if (item.status === 1) {
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
            <TouchableOpacity
              onPress={this.onClickRequestOfferReview.bind(this, item)}>
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
                <View style={styles.listChildView_1_green}>
                  <Text style={styles.itemButton_green}>HİZMETE PUAN VER </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
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
                  <Text style={styles.itemButton}> GELEN TEKLİFLER </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    } else if (item.category === 3) {
      if (item.status === 1) {
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
            <TouchableOpacity
              onPress={this.onClickRequestOfferReview.bind(this, item)}>
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
                <View style={styles.listChildView_1_green}>
                  <Text style={styles.itemButton_green}>HİZMETE PUAN VER </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
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
                  <Text style={styles.itemButton}> GELEN TEKLİFLER </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    } else if (item.category === 4) {
      if (item.status === 1) {
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
            <TouchableOpacity
              onPress={this.onClickRequestOfferReview.bind(this, item)}>
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
                <View style={styles.listChildView_1_green}>
                  <Text style={styles.itemButton_green}>HİZMETE PUAN VER </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
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
                  <Text style={styles.itemButton}> GELEN TEKLİFLER </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
  };

  render() {
    const {modalVisible, modalVisible_2} = this.state;

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.spinner} color="#1d5cdd" />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible_2}
          onRequestClose={() => {
            this.setModalVisible_2(!modalVisible_2);
          }}>
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
              <Text style={styles.pageHead_text}>PUAN VER</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible_2(false);
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
              data={this.state.myOfferListReview}
              renderItem={this.renderMyOfferReview}
            />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
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
              <Text style={styles.pageHead_text}>TEKLİFLER</Text>

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
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
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
  button_2: {
    width: width / 2,
    height: 35,
    backgroundColor: '#6ba103',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#6ba103',
    shadowColor: '#6ba103',
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
    marginBottom: 10,
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
  listChildView_1_green: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 40) / 3,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgb(83,208,21)',
  },
  listChildView_2: {
    alignItems: 'flex-start',
    width: (width - 40) / 2,
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
    marginBottom: 15,
    alignItems: 'center',
    width: width / 1.5,
  },
  listChildView_2_Modal: {
    justifyContent: 'space-between',
    width: width / 1.5,
    alignItems: 'flex-start',
  },
  listChildView_2_Modal_2: {
    justifyContent: 'space-between',
    width: width / 1.5,
    alignItems: 'flex-start',
    borderTopColor: 'rgb(14,68,145)',
    borderTopWidth: 0.3,
    marginTop: 5,
    paddingTop: 10,
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
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'rgb(14,68,145)',
  },
  itemButton: {
    fontSize: 9,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    color: 'rgb(14,68,145)',
  },
  itemButton_green: {
    fontSize: 9,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    color: 'rgb(83,208,21)',
  },
  nameInput: {
    color: '#121212',
    height: 80,
    width: width / 1.52,
    borderColor: '#0E4491FF',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingLeft: 10,
    shadowColor: '#015b7e',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginLeft: 1,
    marginBottom: 10,
  },
});
