import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Alert,
  Image,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANT} from '../constant/Constant';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export class Home extends Component {
  constructor() {
    super();
    this.navigateIndividual = this.navigateIndividual.bind(this);
    this.navigateCommercial = this.navigateCommercial.bind(this);
    this.autoLoginServiceHome = this.autoLoginServiceHome.bind(this);
  }

  state = {
    spinner: true,
    mobile_token: null,
  };

  async componentDidMount() {
    let phone = await AsyncStorage.getItem('phone');
    let password = await AsyncStorage.getItem('password');

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

    if (
      phone !== undefined &&
      phone !== null &&
      password !== undefined &&
      password !== null
    ) {
      window.phone = phone;
      window.password = password;

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
                  this.autoLoginServiceHome();
                } else {
                  Alert.alert(
                    'VAL-E',
                    'Bir hata oldu, lütfen uygulamayı yeniden başlatınız.',
                    [{text: 'Tamam', onPress: () => null}],
                  );
                }
              })
              .catch(e => {
                console.log(e);
              });
          } else {
            this.autoLoginServiceHome();
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
    }
  }

  autoLoginServiceHome() {
    const {navigation} = this.props;
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
            Alert.alert('HATA !', 'Hata login olunamadı.', [
              {
                text: 'Tamam',
                onPress: () => {
                  this.setState({spinner: !this.state.spinner});
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
                          'VAL-E',
                          'Bir hata oldu, lütfen uygulamayı yeniden başlatınız.',
                          [{text: 'Tamam', onPress: () => null}],
                        );
                      }
                    })
                    .catch(e => {
                      console.log(e);
                    });
                },
              },
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
      Alert.alert('HATA !', [{text: 'Tamam', onPress: () => null}]);
      this.setState({
        spinner: !this.state.spinner,
      });
    }
  }

  navigateIndividual() {
    const {navigation} = this.props;

    navigation.navigate('SignIn');
  }

  navigateCommercial() {
    const {navigation} = this.props;

    navigation.navigate('SignInCommercial');
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.spinner} color="#1d5cdd" />
        <ImageBackground
          source={require('../assets/images/IMG-2568.png')}
          resizeMode="cover"
          style={styles.imageBackground}>
          <View style={styles.view_1}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.navigateIndividual}>
              <View style={styles.girisYapRow}>
                <Text style={styles.girisYap}>Hizmet Almak İstiyorum</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.navigateCommercial}>
              <View style={styles.girisYapRow}>
                <Text style={styles.girisYap}>Hizmet Vermek İstiyorum</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const getToken = () => {
  messaging()
    .hasPermission()
    .then(enabled => {
      if (enabled === 1) {
        messaging()
          .getToken(firebase.app().options.messagingSenderId)
          .then(x => {
            console.log('Burdan geldi ', x);
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
              })
              .catch(e => console.log(e));
          })
          .catch();
      }
    })
    .catch();
};

const registerForRemoteMessages = () => {
  messaging()
    .registerDeviceForRemoteMessages()
    .then(() => {
      console.log('Registered');
      requestPermissions();
    })
    .catch(e => console.log(e));
};
const requestPermissions = () => {
  messaging()
    .requestPermission()
    .then((status: FirebaseMessagingTypes.AuthorizationStatus) => {
      if (status === 1) {
        console.log('Authorized');
        onMessage();
      } else {
        console.log('Not authorized');
      }
    })
    .catch(e => console.log(e));
};
const onMessage = () => {
  messaging().onMessage(response => {
    PushNotification.localNotification({
      title: response.notification.title,
      message: response.notification.body,
    });
  });
};

getToken();

if (Platform.OS === 'ios') {
  registerForRemoteMessages();
} else {
  onMessage();
}

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  imageBackground: {
    width: width,
    height: height,
  },
  view_1: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    marginBottom: 20,
  },
  textTest: {
    fontSize: 17,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    color: '#546c7e',
    margin: 10,
    shadowColor: '#ffd119',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.6,
  },
  image: {
    width: 260,
    height: 260,
  },
  logoView: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    width: width - 130,
    height: 45,
    backgroundColor: '#ffffff',
    borderRadius: 35,
    borderWidth: 7,
    borderColor: '#546c7e',
    shadowColor: '#546c7e',
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
    color: '#546c7e',
    fontSize: 13,
    fontFamily: 'Montserrat-ExtraLight',
    fontWeight: 'bold',
    marginTop: 2,
  },
  girisYapRow: {
    height: 45,
    width: width - 130,
    flex: 1,
    alignItems: 'center',
    marginTop: 4,
  },
});
