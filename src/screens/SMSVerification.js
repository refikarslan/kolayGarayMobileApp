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
  Animated,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import {CONSTANT} from '../constant/Constant';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Spinner from 'react-native-loading-spinner-overlay';

export class SMSVerification extends Component {
  constructor() {
    super();
    this.smsVerificationService = this.smsVerificationService.bind(this);
  }

  state = {
    smsVerificationCode: '',
    response: null,
    spinner: false,
  };

  componentDidMount() {}

  handleSmsVerificationCode = text => {
    this.setState({smsVerificationCode: text});
  };

  async smsVerificationService() {
    const {navigation} = this.props;
    this.setState({
      spinner: !this.state.spinner,
    });
    await fetch(CONSTANT.baseUrl + 'user/activate', {
      method: 'POST',
      dataType: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: this.state.smsVerificationCode,
      }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.status !== 'fail') {
          this.setState({response: res, spinner: !this.state.spinner});
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
                navigation.navigate('SignIn');
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
        } else {
          this.setState({
            spinner: !this.state.spinner,
          });
          Alert.alert('HATA !', 'Hata doğrulama yanlış girilmiştir !', [
            {text: 'Tamam', onPress: () => null},
          ]);
        }
      })
      .catch(e => {
        this.setState({
          spinner: !this.state.spinner,
        });
        console.log(e);
      });
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
            <Text style={styles.textStandart}>SMS DOĞRULAMA</Text>
            <TextInput
              placeholder=" Doğrulama Kodu"
              placeholderTextColor="#808080"
              style={styles.codeInput}
              textContentType="username"
              keyboardType="number-pad"
              onChangeText={this.handleSmsVerificationCode}
              value={this.state.smsVerificationCode}
            />
          </View>
          <View style={styles.loginButtonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.smsVerificationService}>
              <View style={styles.girisYapRow}>
                <Text style={styles.girisYap}>Onayla</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.counterView}>
            <CountdownCircleTimer
              isPlaying
              duration={120}
              colors={[
                ['#546c7e', 0.4],
                ['#546c7e', 0.4],
                ['#546c7e', 0.2],
              ]}>
              {({remainingTime, animatedColor}) => (
                <Animated.Text
                  style={{
                    color: animatedColor,
                    fontSize: 18,
                    fontFamily: 'Montserrat-Light',
                  }}>
                  {remainingTime} SANİYE
                </Animated.Text>
              )}
            </CountdownCircleTimer>
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
    width: 230,
    height: 230,
  },
  logoView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  counterView: {
    flex: 1,
    alignItems: 'center',
    margin: 30,
  },
  loginView1: {
    flex: 1,
    alignItems: 'center',
    margin: 15,
  },
  loginButtonView: {
    flex: 1,
    alignItems: 'center',
    margin: 40,
  },
  usernameStyle: {
    color: '#546c7e',
    fontSize: 20,
    top: 10,
    bottom: 10,
  },
  passwordStyle: {
    color: '#546c7e',
    fontSize: 20,
    top: 10,
    bottom: 10,
  },
  codeInput: {
    color: '#121212',
    height: 40,
    width: width - 60,
    borderBottomColor: '#546c7e',
    borderBottomWidth: 1,
    paddingLeft: 10,
    shadowColor: '#546c7e',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  passwordInput: {
    color: '#121212',
    height: 40,
    width: width - 40,
    borderColor: '#97a8bc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },

  button: {
    width: width - 60,
    height: 45,
    backgroundColor: '#546c7e',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#546c7e',
    shadowColor: '#546c7e',
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
    color: '#546c7e',
    fontSize: 16,
    marginTop: 4,
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    height: 40,
    width: 40,
    marginTop: 6,
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
    alignSelf: 'center',
    height: 25,
  },
});
