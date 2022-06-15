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
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {CONSTANT} from '../../constant/Constant';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export class LocationSelected extends Component {
  constructor() {
    super();
    this.locationSelected = this.locationSelected.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);

    this.state = {
      response: null,
      carList: [],
      latitude: 39.8923092628941,
      longitude: 32.836022735360324,
      spinner: true,
    };
  }
  async componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', async () => {
      if (Platform.OS !== 'ios') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'VAL-E',
              message: 'VAL-E konum servislerini kullanmak için izin istiyor.',
              buttonNeutral: 'Daha Sonra Sor',
              buttonNegative: 'İzin Verme',
              buttonPositive: 'İzin Ver',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.getCurrentLocation();
          } else {
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        await Geolocation.requestAuthorization('whenInUse').then(res => {
          console.log(res);
        });
        this.getCurrentLocation();
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          spinner: false,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        this.setState({
          spinner: false,
        });
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  locationSelected() {
    let locationObj = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    window.selectedLocation = locationObj;

    const {navigation} = this.props;
    navigation.navigate('CarTowService');
  }

  render() {
    let markerC = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Spinner visible={this.state.spinner} color="#1d5cdd" />

        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.9,
            longitudeDelta: 0.9,
          }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker coordinate={markerC}>
            <Callout>
              <View>
                <Text>Bulunduğunuz Konum</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            position: 'absolute',
            paddingBottom: 75,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.locationSelected}>
            <View style={styles.kayitOlRow}>
              <Text style={styles.kayitOl}>Konumu Seç</Text>
            </View>
          </TouchableOpacity>
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
  signUpButtonView: {
    alignItems: 'center',
    position: 'absolute',
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
});
