import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Rating} from 'react-native-ratings';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CONSTANT} from '../../constant/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class IndividualQuickMenu extends Component {
  constructor() {
    super();

    this.state = {
      spinner: false,
      full_name: null,
      phone: null,
      menuItem: [
        {
          id: 1,
          icon: 'garage-variant',
          title: 'Garajım',
        },
        {
          id: 2,
          icon: 'file-check-outline',
          title: 'Taleplerim',
        },
        {
          id: 3,
          icon: 'email-outline',
          title: 'Mesajlar',
        },
        {
          id: 4,
          icon: 'headset',
          title: 'Bize Ulaşın',
        },
        {
          id: 5,
          icon: 'help-circle-outline',
          title: 'Yardım',
        },
        {
          id: 6,
          icon: 'exit-to-app',
          title: 'Çıkış Yap',
        },
      ],
    };
  }

  async componentDidMount() {
    this.setState({
      spinner: !this.state.spinner,
    });
    await fetch(CONSTANT.baseUrl + 'session', {
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
            spinner: !this.state.spinner,
            full_name: res.data.full_name,
            phone: res.data.phone,
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

  onClickMenuItem(item) {
    if (item.id === 1) {
      const {navigation} = this.props;
      navigation.navigate('IndividualUserMyGarageScreen');
    } else if (item.id === 2) {
      const {navigation} = this.props;
      navigation.navigate('IndividualServiceRequestManagementScreen');
    } else if (item.id === 3) {
      Alert.alert(
        'Kolay Garaj',
        'Hizmet verenler ile uygulama içi mesajlaşma çok yakında hizmetinizde.',
        [{text: 'Tamam', onPress: () => null}],
      );
    } else if (item.id === 4) {
      Alert.alert('Kolay Garaj Müşteri Hizmetleri Hattı', '0(545) 544 95 66', [
        {text: 'Tamam', onPress: () => null},
      ]);
    } else if (item.id === 5) {
      const {navigation} = this.props;
      navigation.navigate('IndividualUserHelp');
    } else if (item.id === 6) {
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
  }

  renderList = ({item, index}) => {
    return (
      <View style={styles.list}>
        <TouchableOpacity onPress={this.onClickMenuItem.bind(this, item)}>
          <View style={styles.listStyle}>
            <MaterialCommunityIconsIcon name={item.icon} style={styles.icon} />
            <Text style={styles.itemText_Bold}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.spinner} color="#1d5cdd" />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '5%',
            marginVertical: '2%',
          }}>
          <TouchableOpacity onPress={this.onClickMenuItem}>
            <View style={styles.profile}>
              <Image
                source={require('../../assets/images/account.png')}
                style={{
                  width: 90,
                  height: 90,
                  resizeMode: 'contain',
                  marginRight: 45,
                }}
              />
              <View>
                <Text style={styles.itemTextBold}>{this.state.full_name}</Text>
                <Text style={styles.itemText}>
                  Telefon: 0{this.state.phone}
                  {'\n'}
                </Text>
                {/* <Text style={styles.itemText_Bold}>Profili Düzenle</Text> */}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.9}}>
          <FlatList data={this.state.menuItem} renderItem={this.renderList} />
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
    height: height,
  },
  list: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    borderTopColor: '#546c7e',
    borderTopWidth: 0.3,
  },
  listStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width - 40,
    paddingTop: 20,
  },
  listChildView_1: {
    alignItems: 'flex-start',
    width: (width - 40) / 3,
  },
  icon: {
    color: '#546c7e',
    fontSize: 20,
    height: 25,
    width: 25,
    marginRight: 5,
  },
  iconProfile: {
    color: '#546c7e',
    fontSize: 40,
    height: 50,
    width: 50,
    marginRight: 5,
  },
  itemText_Bold: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'normal',
    color: '#546c7e',
  },
  itemText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'normal',
    color: 'rgb(38,38,38)',
  },
  itemTextBold: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    color: 'rgb(38,38,38)',
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width - 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
