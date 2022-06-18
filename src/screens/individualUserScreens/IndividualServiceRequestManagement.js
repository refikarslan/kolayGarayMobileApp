import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {CONSTANT} from '../../constant/Constant';
import Spinner from 'react-native-loading-spinner-overlay';

export class IndividualServiceRequestManagement extends Component {
  constructor() {
    super();
  }

  state = {
    response: null,
    myRequestList: [],
    spinner: false,
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
            Alert.alert(
              'Kolay Garaj',
              'Oluşturulmuş hizmet talebiniz bulunmamaktadır.',
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
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  onClickProduct(item) {
    let id = item.id;
    window.selected_request = item;
    Alert.alert(
      'Kolay Garaj',
      'Talebinizi silmek istediğinizden emin misiniz?',
      [
        {text: 'Hayır', onPress: () => null},
        {
          text: 'Evet',
          onPress: () => {
            this.setState({
              spinner: !this.state.spinner,
            });
            fetch(CONSTANT.baseUrl + 'request/' + id, {
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
                  Alert.alert('Kolay Garaj', 'Talep başarıyla silinmiştir.', [
                    {
                      text: 'Tamam',
                      onPress: () => {
                        const {navigation} = this.props;
                        navigation.reset({
                          index: 0,
                          routes: [
                            {name: 'IndividualServiceRequestManagementScreen'},
                          ],
                        });
                      },
                    },
                  ]);
                  this.setState({
                    spinner: !this.state.spinner,
                  });
                } else {
                  Alert.alert(
                    'Kolay Garaj',
                    'Talep silme işlemi gerçekleştirilemedi.',
                    [{text: 'Tamam', onPress: () => null}],
                  );
                  this.setState({
                    spinner: !this.state.spinner,
                  });
                }
              })
              .catch(e => {
                this.setState({
                  spinner: !this.state.spinner,
                });
                console.log(e);
              });
          },
        },
      ],
    );
  }

  renderMyRequest = ({item, index}) => {
    if (item.category === 1) {
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
            <View style={styles.listChildView_1}>
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
            <View>
              <View style={styles.listChildView_2}>
                <Image
                  source={require('../../assets/images/iconPng/carTire.png')}
                  style={{
                    width: 100,
                    height: 100,
                    position: 'absolute',
                    opacity: 0.5,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      );
    } else if (item.category === 3) {
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
            <View style={styles.listChildView_1}>
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
            <View>
              <View style={styles.listChildView_2}>
                <Image
                  source={require('../../assets/images/iconPng/carTow.png')}
                  style={{
                    width: 100,
                    height: 100,
                    position: 'absolute',
                    opacity: 0.5,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      );
    } else if (item.category === 4) {
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
            <View style={styles.listChildView_1}>
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
            <View>
              <View style={styles.listChildView_2}>
                <Image
                  source={require('../../assets/images/iconPng/carService.png')}
                  style={{
                    width: 100,
                    height: 100,
                    position: 'absolute',
                    opacity: 0.5,
                  }}
                />
              </View>
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
    paddingTop: 10,
    marginBottom: 10,
  },
  listChildView_1: {
    alignItems: 'flex-start',
    width: width - 60,
    marginLeft: 15,
  },
  listChildView_2: {
    flex: 1,
    alignItems: 'center',
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
});
