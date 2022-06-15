import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {CONSTANT} from '../../constant/Constant';

export class IndividualUserMyGarage extends Component {
  constructor() {
    super();
    this.navigateMyGarage = this.navigateMyGarage.bind(this);
    this.navigateAddCar = this.navigateAddCar.bind(this);
  }

  state = {};

  async componentDidMount() {}

  navigateMyGarage() {
    const {navigation} = this.props;
    navigation.navigate('IndividualUserGarageCars');
  }

  navigateAddCar() {
    const {navigation} = this.props;
    navigation.navigate('IndividualUserGarageAddCars');
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/IMG-2568.png')}
          resizeMode="cover"
          style={styles.imageBackground}>
          <View style={styles.view_1}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.navigateMyGarage}>
              <View style={styles.girisYapRow}>
                <Image
                  source={require('../../assets/images/car-garage.png')}
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: '#015b7e',
                  }}
                />
                <Text style={styles.girisYap}>GARAJIM</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.navigateAddCar}>
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
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  view_1: {
    flex: 0.89,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    marginBottom: 20,
  },
  button: {
    width: width - 130,
    height: 55,
    backgroundColor: '#ffffff',
    borderRadius: 35,
    borderWidth: 7,
    borderColor: '#015b7e',
    shadowColor: '#015b7e',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    marginBottom: 20,
  },
  girisYap: {
    color: '#015b7e',
    fontSize: 13,
    fontFamily: 'Montserrat-ExtraLight',
    fontWeight: 'bold',
    marginTop: 2,
  },
  girisYapRow: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '7%',
  },
  imageBackground: {
    width: width,
    height: height,
  },
});
