import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SliderBox} from 'react-native-image-slider-box';
import Geolocation from '@react-native-community/geolocation';

export class IndividualUserHome extends Component {
  constructor() {
    super();
    this.navigateCarTowService = this.navigateCarTowService.bind(this);
    this.navigateCarWashService = this.navigateCarWashService.bind(this);
    this.navigateCarTireService = this.navigateCarTireService.bind(this);
    this.navigateCarRepairService = this.navigateCarRepairService.bind(this);
    this.navigateCarBatteryService = this.navigateCarBatteryService.bind(this);
    this.navigateCarKeyService = this.navigateCarKeyService.bind(this);
    this.navigateCarPartsService = this.navigateCarPartsService.bind(this);
    this.navigateCarRentService = this.navigateCarRentService.bind(this);
    this.navigateGetTaxiService = this.navigateGetTaxiService.bind(this);
  }

  state = {
    images: [
      'https://val-e.app/sliderVal-eNew/1.jpeg',
      'https://val-e.app/sliderVal-eNew/2.jpeg',
      'https://val-e.app/sliderVal-eNew/3.jpeg',
      'https://val-e.app/sliderVal-eNew/4.jpeg',
      'https://val-e.app/sliderVal-eNew/5.jpeg',
      'https://val-e.app/sliderVal-eNew/6.jpeg',
      'https://val-e.app/sliderVal-eNew/7.jpeg',
      'https://val-e.app/sliderVal-eNew/8.jpeg',
    ],
  };

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', async () => {
      window.commercialsIdList = null;
      window.selectedCarIdList = null;
      window.selectedLocation = null;
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  navigateCarTowService() {
    const {navigation} = this.props;
    navigation.navigate('CarTowService');
  }

  navigateCarWashService() {
    const {navigation} = this.props;
    navigation.navigate('CarWashService');
  }

  navigateCarTireService() {
    const {navigation} = this.props;
    navigation.navigate('CarTireService');
  }

  navigateCarRepairService() {
    const {navigation} = this.props;
    navigation.navigate('CarRepairService');
  }

  navigateCarBatteryService() {
    const {navigation} = this.props;
    navigation.navigate('CarBatteryService');
  }

  navigateCarKeyService() {
    const {navigation} = this.props;
    navigation.navigate('CarKeyService');
  }

  navigateCarPartsService() {
    const {navigation} = this.props;
    navigation.navigate('CarPartsService');
  }

  navigateCarRentService() {
    Alert.alert(
      'VAL-E',
      'Çok yakında avantajlı fiyatlarla kiralık araçları buradan bulabileceksin, bizi takip etmeye devam et.',
      [{text: 'Tamam', onPress: () => null}],
    );
  }

  navigateGetTaxiService() {
    Alert.alert(
      'VAL-E',
      'Çok yakında VAL-E ile Taksi anında kapında, bizi takip etmeye devam et.',
      [{text: 'Tamam', onPress: () => null}],
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grup_0}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={height / 5}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            autoplay
            circleLoop
            resizeMethod={'resize'}
            resizeMode={'stretch'}
            ImageComponentStyle={{
              borderRadius: 0,
              width: '100%',
              marginTop: 1,
            }}
            imageLoadingColor="#2095f3"
            dotStyle={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}
            onCurrentImagePressed={index => {
              if (index === 0) {
                const {navigation} = this.props;
                navigation.navigate('CarTowService');
              } else if (index === 1) {
                const {navigation} = this.props;
                navigation.navigate('CarTireService');
              } else if (index === 2) {
                const {navigation} = this.props;
                navigation.navigate('CarWashService');
              } else if (index === 3) {
                const {navigation} = this.props;
                navigation.navigate('CarRepairService');
              } else if (index === 4) {
                const {navigation} = this.props;
                navigation.navigate('CarBatteryService');
              } else if (index === 5) {
                const {navigation} = this.props;
                navigation.navigate('CarKeyService');
              } else if (index === 6) {
                const {navigation} = this.props;
                // navigation.navigate('CarPartsService');
              } else if (index === 7) {
                const {navigation} = this.props;
                // navigation.navigate('CarPartsService');
              } else if (index === 8) {
                const {navigation} = this.props;
                // navigation.navigate('CarPartsService');
              }
            }}
          />
        </View>
        <View style={styles.grup_1}>
          <TouchableOpacity onPress={this.navigateCarTowService}>
            <View style={styles.buttonView}>
              <Image
                source={require('../../assets/images/iconPng/carTow.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 5,
                }}
              />

              <Text style={styles.textButton}>OTO ÇEKİCİ</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.navigateCarWashService}>
            <View style={styles.buttonView}>
              <Image
                source={require('../../assets/images/iconPng/carWash.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 5,
                }}
              />
              <Text style={styles.textButton}>OTO KUAFÖR</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateCarTireService}>
            <View style={styles.buttonView}>
              <Image
                source={require('../../assets/images/iconPng/carTire.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 5,
                }}
              />

              <Text style={styles.textButton}>OTO LASTİK</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.grup_2}>
          <TouchableOpacity onPress={this.navigateCarBatteryService}>
            <View style={styles.buttonView}>
              <Image
                source={require('../../assets/images/iconPng/carBattery.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 5,
                }}
              />

              <Text style={styles.textButton}>OTO AKÜ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateCarKeyService}>
            <View style={styles.buttonView}>
              <Image
                source={require('../../assets/images/iconPng/carKey.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 5,
                }}
              />

              <Text style={styles.textButton}>OTO ANAHTAR</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateCarPartsService}>
            <View style={styles.buttonView}>
              <Image
                source={require('../../assets/images/iconPng/carParts.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 5,
                }}
              />

              <Text style={styles.textButton}>OTO PARÇA</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.grup_2}>
          <TouchableOpacity onPress={this.navigateCarRepairService}>
            <View style={styles.buttonView}>
              <Image
                source={require('../../assets/images/iconPng/carService.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 5,
                }}
              />

              <Text style={styles.textButton}>OTO SERVİS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateCarRentService}>
            <View style={styles.buttonView}>
              <Image
                source={require('../../assets/images/iconPng/carRent.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 5,
                }}
              />

              <Text style={styles.textButton}>KİRALIK ARAÇ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateGetTaxiService}>
            <View style={styles.buttonView}>
              <Image
                source={require('../../assets/images/iconPng/getTaxi.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 5,
                }}
              />

              <Text style={styles.textButton}>TAKSİ ÇAĞIR</Text>
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
    flex: 0.9,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
  },
  homeBar: {
    backgroundColor: '#000',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: width,
    height: 100,
  },
  grup_0: {
    flex: 0.35,
    backgroundColor: 'rgba(255,255,255,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  grup_1: {
    flex: 0.18,
    backgroundColor: 'rgba(255,255,255,0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 45,
    margin: 10,
  },
  grup_2: {
    flex: 0.18,
    backgroundColor: 'rgba(255,255,255,0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 45,
    margin: 10,
  },
  buttonView: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#c5c5c5',
    shadowColor: '#c5c5c5',
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 0,
    borderRadius: 5,
    width: (width - 50) / 3.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  textButton: {
    fontSize: 10.5,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  textHead: {
    marginLeft: 10,
    fontSize: 13.5,
    fontFamily: 'Montserrat-Medium',
    marginTop: 10,
    color: '#2095f3',
  },
  imageBackground: {
    flex: 1,
  },
});
