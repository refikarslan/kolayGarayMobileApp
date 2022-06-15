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

export class CommercialUserAddServices extends Component {
  constructor() {
    super();
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handlePrice = this.handlePrice.bind(this);

    this.servicesAdd = this.servicesAdd.bind(this);

    this.state = {
      name: null,
      description: null,
      price: null,
      spinner: false,
    };
  }

  servicesAdd() {
    let priceValue = parseInt(this.state.price);
    if (
      this.state.name === null ||
      this.state.description === null ||
      this.state.price === null
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
      if (priceValue <= 0 || isNaN(priceValue)) {
        Alert.alert(
          'Uyarı !',
          'Hizmet ücreti alanını doğru girdiğinizden emin olunuz.',
          [
            {
              text: 'Tamam',
              onPress: () => {},
            },
          ],
        );
      } else {
        this.setState({
          spinner: !this.state.spinner,
        });
        fetch(CONSTANT.baseUrl + 'commercial-service', {
          method: 'POST',
          dataType: 'json',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
          }),
        })
          .then(response => response.json())
          .then(res => {
            if (res.status !== 'fail') {
              this.setState({response: res, spinner: !this.state.spinner});
              Alert.alert(
                'Başarılı !',
                'Hizmet/Kampanya Paketiniz kayıt edilmiştir :)',
                [
                  {
                    text: 'Tamam',
                    onPress: () => {
                      const {navigation} = this.props;
                      navigation.navigate('CommercialUserHome');
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
      }
    }
  }
  handleName = text => {
    this.setState({name: text});
  };

  handleDescription = text => {
    this.setState({description: text});
  };

  handlePrice = text => {
    this.setState({price: text});
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={40}
        style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <Spinner visible={this.state.spinner} color="#1d5cdd" />
          <View style={styles.View0}>
            <Text style={styles.textStandart}>Hizmetin / Kampanyanın Adı</Text>
            <TextInput
              placeholder=" Örn. Boya Koruma/Seramik Kaplama İndirimi"
              placeholderTextColor="#808080"
              style={styles.mailInput}
              textContentType="name"
              onChangeText={this.handleName}
              value={this.state.name}
            />
          </View>
          <View style={styles.View5}>
            <Text style={styles.textStandart}>
              Hizmet Ücreti / Paket Fiyatı
            </Text>
            <TextInput
              placeholder="Örn. 1000 ₺"
              placeholderTextColor="#808080"
              style={styles.mailInput}
              textContentType="name"
              onChangeText={this.handlePrice}
              value={this.state.price}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.View5}>
            <Text style={styles.textStandart}>
              Hizmet / Kampanya Paketinin Detayı
            </Text>
            <TextInput
              placeholder="İşletmenize özel tanımlayacağınız Özel Hizmet Paketi yada Kampanya Paketi için detayları yazınız."
              placeholderTextColor="#808080"
              style={styles.detailInput}
              textContentType="name"
              onChangeText={this.handleDescription}
              value={this.state.description}
              multiline={true}
              numberOfLines={30}
            />
          </View>
          <View style={styles.signUpButtonView}>
            <TouchableOpacity style={styles.button} onPress={this.servicesAdd}>
              <View style={styles.kayitOlRow}>
                <Text style={styles.kayitOl}>Hizmet/Kampanya Ekle</Text>
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
    marginBottom: 48 * 3,
  },
  View4: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 48 * 2,
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
    height: 200,
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
});
