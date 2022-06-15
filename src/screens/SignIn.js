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
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANT} from '../constant/Constant';
import TextInputMask from 'react-native-text-input-mask';
import Spinner from 'react-native-loading-spinner-overlay';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

export class SignIn extends Component {
  constructor() {
    super();
    this.loginService = this.loginService.bind(this);
    this.autoLoginService = this.autoLoginService.bind(this);
    this.signUpPageNavigate = this.signUpPageNavigate.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.passwordChangePageNavigate =
      this.passwordChangePageNavigate.bind(this);
  }

  state = {
    phone: '',
    password: '',
    response: null,
    spinner: false,
    mobile_token: null,
  };

  async componentDidMount() {
    await messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled === 1) {
          messaging()
            .getToken(firebase.app().options.messagingSenderId)
            .then(x => {
              console.log('Burdan geldi ', x);
              this.setState({mobile_token: x});
            })
            .catch(e => console.log(e));
        } else {
          messaging()
            .requestPermission()
            .then(a => {
              messaging()
                .getToken(firebase.app().options.messagingSenderId)
                .then(x => {
                  console.log('Ordan geldi ', x);
                  this.setState({mobile_token: x});
                })
                .catch(e => console.log(e));
            })
            .catch();
        }
      })
      .catch();

    let phone = await AsyncStorage.getItem('phone');
    let password = await AsyncStorage.getItem('password');

    if (
      phone !== undefined &&
      phone !== null &&
      password !== undefined &&
      password !== null
    ) {
      window.phone = phone;
      window.password = password;
      this.autoLoginService();
    }
  }

  handlePhone = text => {
    this.setState({phone: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  signUpPageNavigate() {
    const {navigation} = this.props;
    navigation.navigate('SignUpIndividual');
  }

  passwordChangePageNavigate() {
    Alert.alert(
      'Kolay Garaj',
      'Şifre sıfırlama sistemi yapım aşamasındadır, şifrenizi sıfırlamak için info@kolaygaraj.com mail adresinden ulaşabilirsiniz. ',
      [{text: 'Tamam', onPress: () => null}],
    );
    //const {navigation} = this.props;
    //navigation.navigate('PassChange');
  }

  loginService() {
    const {navigation} = this.props;

    if (this.state.phone === '' && this.state.password !== '') {
      Alert.alert('UYARI !', 'Lütfen Telefon Numaranızı giriniz. ', [
        {
          text: 'Tamam',
          onPress: () => {},
        },
      ]);
    } else if (this.state.password === '' && this.state.phone !== '') {
      Alert.alert('UYARI !', 'Lütfen Şifrenizi giriniz. ', [
        {
          text: 'Tamam',
          onPress: () => {},
        },
      ]);
    } else if (this.state.password === '' && this.state.phone === '') {
      Alert.alert(
        'UYARI !',
        'Lütfen Telefon Numaranızı ve Şifrenizi giriniz. ',
        [
          {
            text: 'Tamam',
            onPress: () => {},
          },
        ],
      );
    } else if (this.state.password !== '' && this.state.phone !== '') {
      this.setState({spinner: !this.state.spinner});

      fetch(CONSTANT.baseUrl + 'login', {
        method: 'POST',
        dataType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: this.state.phone,
          password: this.state.password,
          mobile_token: this.state.mobile_token,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status !== 'fail') {
            this.setState({response: res, spinner: !this.state.spinner});
            AsyncStorage.setItem('phone', this.state.phone);
            AsyncStorage.setItem('password', this.state.password);
            //user type check
            if (res.data.commercial !== 1) {
              navigation.navigate('IndividualUserHome');
            } else {
              navigation.navigate('CommercialUserHome');
            }
          } else {
            this.setState({spinner: !this.state.spinner});
            Alert.alert(
              'HATA !',
              'Hata login olunamadı. Lütfen bilgileriniz tekrar giriniz.',
              [
                {
                  text: 'Tamam',
                  onPress: () => {},
                },
              ],
            );
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({spinner: !this.state.spinner});
        });
    } else {
      console.log('Hata login olunamadı.');
      this.setState({spinner: !this.state.spinner});

      Alert.alert('HATA !', [
        {
          text: 'Tamam',
          onPress: () => {},
        },
      ]);
    }
  }

  autoLoginService() {
    const {navigation} = this.props;
    this.setState({
      spinner: !this.state.spinner,
    });
    let phone = window.phone;
    let password = window.password;
    if (password !== '' && phone !== '') {
      fetch(CONSTANT.baseUrl + 'login', {
        method: 'POST',
        dataType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
          mobile_token: this.state.mobile_token,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status !== 'fail') {
            this.setState({response: res, spinner: !this.state.spinner});
            AsyncStorage.setItem('phone', phone);
            AsyncStorage.setItem('password', password);
            //user type check
            if (res.data.commercial !== 1) {
              navigation.navigate('IndividualUserHome');
            } else {
              navigation.navigate('CommercialUserHome');
            }
          } else {
            this.setState({
              spinner: !this.state.spinner,
            });
            Alert.alert('HATA !', 'Hata login olunamadı.', [
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
      this.setState({
        spinner: !this.state.spinner,
      });
      Alert.alert('HATA !', [{text: 'Tamam', onPress: () => null}]);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
        style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <Spinner visible={this.state.spinner} color="#1d5cdd" />
          <View style={styles.logoView}>
            <Image
              source={require('../assets/images/logoPage_2.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.loginView1}>
            <Text style={styles.textStandart}>Telefon</Text>
            <TextInputMask
              onChangeText={(formatted, extracted) => {
                console.log(extracted); // 1234567890
                if (extracted.length === 10) {
                  this.setState({phone: extracted});
                }
              }}
              placeholder=" 5XX-XXX-XX-XX"
              placeholderTextColor="#808080"
              style={styles.phoneInput}
              textContentType="username"
              value={this.state.phone}
              mask={'+90 ([000]) [000] [00] [00]'}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.loginView2}>
            <Text style={styles.textStandart}>Şifre</Text>
            <TextInput
              placeholder=" Şifrenizi giriniz."
              placeholderTextColor="#808080"
              style={styles.passwordInput}
              secureTextEntry={true}
              textContentType="password"
              onChangeText={this.handlePassword}
              value={this.state.password}
            />
          </View>
          <View style={styles.loginButtonView}>
            <TouchableOpacity style={styles.button} onPress={this.loginService}>
              <View style={styles.girisYapRow}>
                <Text style={styles.girisYap}>Giriş Yap</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.signUpPageNavigate}>
              <View style={styles.kayitOlRow}>
                <Text style={styles.kayitOl}>
                  Henüz bir hesabın yok mu?{' '}
                  <Text style={styles.kayitOlButton}>Hemen Kayıt Ol</Text>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.passwordChangePageNavigate}>
              <View style={styles.kayitOlRow}>
                <Text style={styles.kayitOlButton}>Şifremi Unuttum</Text>
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
  imageBackground: {
    width: width,
    height: height,
  },
  image: {
    width: 260,
    height: 260,
  },
  logoView: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginView1: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    marginBottom: 30,
  },
  loginView2: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  loginButtonView: {
    alignItems: 'center',
    margin: 50,
  },
  usernameStyle: {
    color: 'rgba(0,40,85,1)',
    fontSize: 20,
    top: 10,
    bottom: 10,
  },
  passwordStyle: {
    color: 'rgba(0,40,85,1)',
    fontSize: 20,
    top: 10,
    bottom: 10,
  },
  phoneInput: {
    color: '#121212',
    height: 40,
    width: width - 60,
    borderBottomColor: '#fdd361',
    borderBottomWidth: 1,
    paddingLeft: 10,
    shadowColor: '#fdd361',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  passwordInput: {
    color: '#121212',
    height: 40,
    width: width - 60,
    borderBottomColor: '#fdd361',
    borderBottomWidth: 1,
    paddingLeft: 10,
    shadowColor: '#fdd361',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  button: {
    width: width - 60,
    height: 45,
    backgroundColor: '#fdd361',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fdd361',
    shadowColor: '#fdd361',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.75,
    shadowRadius: 3,
  },
  girisYap: {
    color: 'rgb(255,255,255)',
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraLight',
    fontWeight: 'bold',
    marginTop: 2,
  },
  kayitOl: {
    color: 'rgb(0,0,0)',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginTop: 4,
  },
  kayitOlButton: {
    color: '#fdd361',
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
  kayitOlRow: {
    height: 44,
    width: width - 40,
    alignItems: 'center',
    marginTop: 15,
  },
  girisYapRow: {
    height: 40,
    width: width - 60,
    flex: 1,
    alignItems: 'center',
    marginTop: 6,
  },
  textStandart: {
    color: 'rgb(0,0,0)',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'flex-start',
    marginLeft: 25,
    height: 25,
  },
});
