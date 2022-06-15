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

import {CONSTANT} from '../constant/Constant';
import TextInputMask from 'react-native-text-input-mask';
import Spinner from 'react-native-loading-spinner-overlay';

export class SignUpIndividual extends Component {
  constructor() {
    super();
    this.signUpService = this.signUpService.bind(this);
    this.signInPageNavigate = this.signInPageNavigate.bind(this);

    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleMail = this.handleMail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePassword_2 = this.handlePassword_2.bind(this);
  }

  state = {
    name: '',
    phone: '',
    mail: '',
    password: '',
    password_2: '',
    response: null,
    spinner: false,
  };
  async componentDidMount() {}

  handleName = text => {
    this.setState({name: text});
  };

  handlePhone = text => {
    this.setState({phone: text});
  };

  handleMail = text => {
    this.setState({mail: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  handlePassword_2 = text => {
    this.setState({password_2: text});
  };

  signInPageNavigate() {
    const {navigation} = this.props;
    navigation.navigate('SignIn');
  }

  signUpService() {
    const {navigation} = this.props;
    if (
      this.state.name === '' &&
      this.state.phone !== '' &&
      this.state.mail !== '' &&
      this.state.password !== '' &&
      this.state.password_2 !== ''
    ) {
      Alert.alert('UYARI !', 'Lütfen İsminizi giriniz. ', [
        {text: 'Tamam', onPress: () => null},
      ]);
    } else if (
      this.state.name !== '' &&
      this.state.phone === '' &&
      this.state.mail !== '' &&
      this.state.password !== '' &&
      this.state.password_2 !== ''
    ) {
      Alert.alert('UYARI !', 'Lütfen Telefon Numaranızı giriniz. ', [
        {text: 'Tamam', onPress: () => null},
      ]);
    } else if (
      this.state.name !== '' &&
      this.state.phone !== '' &&
      this.state.mail === '' &&
      this.state.password !== '' &&
      this.state.password_2 !== ''
    ) {
      Alert.alert('UYARI !', 'Lütfen Mail Adresinizi giriniz. ', [
        {text: 'Tamam', onPress: () => null},
      ]);
    } else if (
      this.state.name !== '' &&
      this.state.phone !== '' &&
      this.state.mail !== '' &&
      this.state.password === '' &&
      this.state.password_2 !== ''
    ) {
      Alert.alert('UYARI !', 'Lütfen Şifrenizi giriniz. ', [
        {text: 'Tamam', onPress: () => null},
      ]);
    } else if (
      this.state.name !== '' &&
      this.state.phone !== '' &&
      this.state.mail !== '' &&
      this.state.password !== '' &&
      this.state.password_2 !== '' &&
      this.state.password !== this.state.password_2
    ) {
      Alert.alert(
        'UYARI !',
        'Lütfen girdiğiniz şifrenin doğruluğunu kontrol ediniz.',
        [{text: 'Tamam', onPress: () => null}],
      );
    } else if (
      this.state.name === '' &&
      this.state.phone === '' &&
      this.state.mail === '' &&
      this.state.password === '' &&
      this.state.password_2 === ''
    ) {
      Alert.alert('UYARI !', 'Lütfen alanları doldurunuz.', [
        {text: 'Tamam', onPress: () => null},
      ]);
    } else if (
      this.state.name !== '' &&
      this.state.phone !== '' &&
      this.state.mail !== '' &&
      this.state.password !== '' &&
      this.state.password_2 !== ''
    ) {
      this.setState({
        spinner: !this.state.spinner,
      });
      fetch(CONSTANT.baseUrl + 'user/register', {
        method: 'POST',
        dataType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: this.state.phone,
          email: this.state.mail,
          fullName: this.state.name,
          password: this.state.password,
          commercial: 0,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status !== 'fail') {
            this.setState({response: res, spinner: !this.state.spinner});
            navigation.navigate('SMSVerification');
          } else {
            this.setState({
              spinner: !this.state.spinner,
            });
            if (
              res.data.phone ===
              'Bu telefon numarası ile oluşturulmuş bir hesap bulunuyor.'
            ) {
              Alert.alert(
                'HATA !',
                'Girilen telefon numarası ile daha önceden kayıt yapılmış. Bir sıkıntı olduğunu düşünüyorsanız bizimle iletişime geçiniz.',
                [{text: 'Tamam', onPress: () => null}],
              );
            } else {
              Alert.alert(
                'HATA !',
                'Hata kayıt olunamadı. Bilgileriniz kontrol ederek tekrar deneyiniz.',
                [{text: 'Tamam', onPress: () => null}],
              );
            }
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({
            spinner: !this.state.spinner,
          });
        });
    } else {
      console.log('Hata kayıt olunamadı.');
      Alert.alert(
        'HATA !',
        'Lütfen alanları eksiksiz doldurduğunuzdan emin olun.',
        [
          {
            text: 'Tamam',
            onPress: () => null,
          },
        ],
      );
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
          <View style={styles.View1}>
            <Text style={styles.textStandart}>Ad Soyad</Text>
            <TextInput
              placeholder=" İsminizi giriniz."
              placeholderTextColor="#808080"
              style={styles.nameInput}
              textContentType="name"
              onChangeText={this.handleName}
              value={this.state.name}
            />
          </View>
          <View style={styles.View2}>
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
          <View style={styles.View3}>
            <Text style={styles.textStandart_Black}>E-Posta</Text>
            <TextInput
              placeholder=" Mail adresini giriniz."
              placeholderTextColor="#808080"
              style={styles.mailInput}
              textContentType="emailAddress"
              onChangeText={this.handleMail}
              value={this.state.mail}
            />
          </View>
          <View style={styles.View4}>
            <Text style={styles.textStandart}>Şifre</Text>
            <TextInput
              placeholder=" Oluşturmak istediğiniz şifrenizi giriniz."
              placeholderTextColor="#808080"
              style={styles.passwordInput}
              secureTextEntry={true}
              textContentType="password"
              onChangeText={this.handlePassword}
              value={this.state.password}
            />
          </View>
          <View style={styles.View5}>
            <Text style={styles.textStandart}>Şifre (Tekrar)</Text>
            <TextInput
              placeholder=" Şifrenizi tekrar giriniz."
              placeholderTextColor="#808080"
              style={styles.passwordInput}
              secureTextEntry={true}
              textContentType="password"
              onChangeText={this.handlePassword_2}
              value={this.state.password_2}
            />
          </View>
          <View style={styles.signUpButtonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.signUpService}>
              <View style={styles.kayitOlRow}>
                <Text style={styles.kayitOl}>Kayıt Ol</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.signInPageNavigate}>
              <View style={styles.girisYapRow}>
                <Text style={styles.girisYap}>
                  Hesabın var mı?{' '}
                  <Text style={styles.girisYapButton}>Hemen Giriş Yap</Text>
                </Text>
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
  logoView: {
    alignItems: 'center',
    marginTop: 20,
  },
  View1: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  View2: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  View3: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  View4: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  View5: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
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
    borderBottomColor: '#fdd361',
    borderBottomWidth: 1,
    paddingLeft: 10,
    shadowColor: '#fdd361',
    shadowOpacity: 0.5,
    shadowRadius: 3,
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
  mailInput: {
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
  kayitOl: {
    color: 'rgb(255,255,255)',
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraLight',
    fontWeight: 'bold',
    marginTop: 2,
  },
  girisYap: {
    color: 'rgb(0,0,0)',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginTop: 4,
  },
  girisYapButton: {
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
  girisYapRow: {
    height: 40,
    width: width - 60,
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
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
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'flex-start',
    marginLeft: 25,
    height: 25,
  },
  textStandart_Black: {
    color: 'rgb(0,0,0)',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'flex-start',
    marginLeft: 25,
    height: 25,
  },
});
