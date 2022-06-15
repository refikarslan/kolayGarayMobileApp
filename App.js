import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  Text,
  Alert,
} from 'react-native';

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home} from './src/screens/Home';
import {SignIn} from './src/screens/SignIn';
import {SignInCommercial} from './src/screens/SignInCommercial';

import {SignUpIndividual} from './src/screens/SignUpIndividual';
import {SignUpCommercial} from './src/screens/SignUpCommercial';
import {SMSVerification} from './src/screens/SMSVerification';

import {IndividualUserHome} from './src/screens/individualUserScreens/IndividualUserHome';
import {IndividualUserMyGarage} from './src/screens/individualUserScreens/IndividualUserMyGarage';
import {IndividualUserCampaign} from './src/screens/individualUserScreens/IndividualUserCampaign';
import {IndividualServiceRequestManagement} from './src/screens/individualUserScreens/IndividualServiceRequestManagement';
import {IndividualUserOffer} from './src/screens/individualUserScreens/IndividualUserOffer';

import {IndividualQuickMenu} from './src/screens/individualUserScreens/IndividualQuickMenu';

import {CommercialQuickMenu} from './src/screens/commercialUserScreens/CommercialQuickMenu';

import {CarTowService} from './src/screens/individualUserScreens/CarTowService';
import {CarTireService} from './src/screens/individualUserScreens/CarTireService';
import {CarWashService} from './src/screens/individualUserScreens/CarWashService';
import {CarRepairService} from './src/screens/individualUserScreens/CarRepairService';
import {CommercialUsersList} from './src/screens/individualUserScreens/CommercialUsersList';
import {MyGarageCarList} from './src/screens/individualUserScreens/MyGarageCarList';
import {LocationSelected} from './src/screens/individualUserScreens/LocationSelected';
import {CommercialUserHome} from './src/screens/commercialUserScreens/CommercialUserHome';
import {CommercialUserProfile} from './src/screens/commercialUserScreens/CommercialUserProfile';
import {CommercialUserOffer} from './src/screens/commercialUserScreens/CommercialUserOffer';
import {CommercialUserRatingPoints} from './src/screens/commercialUserScreens/CommercialUserRatingPoints';
import {CommercialUserHelp} from './src/screens/commercialUserScreens/CommercialUserHelp';
import {IndividualUserHelp} from './src/screens/individualUserScreens/IndividualUserHelp';

import {PassChange} from './src/screens/PassChange';
import {IndividualUserGarageCars} from './src/screens/individualUserScreens/IndividualUserGarageCars';
import {IndividualUserGarageAddCars} from './src/screens/individualUserScreens/IndividualUserGarageAddCars';
import {CommercialUserAddServices} from './src/screens/commercialUserScreens/CommercialUserAddServices';
import {CommercialUserServices} from './src/screens/commercialUserScreens/CommercialUserServices';
import {CarBatteryService} from './src/screens/individualUserScreens/CarBatteryService';
import {CarKeyService} from './src/screens/individualUserScreens/CarKeyService';
import {CarPartsService} from './src/screens/individualUserScreens/CarPartsService';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');

function LogoTitle() {
  return (
    <Image
      style={{
        width: width / 2.7,
        height: 35,
        marginBottom: Platform.OS === 'ios' ? 10 : 0,
        alignSelf: 'center',
        resizeMode: 'contain',
      }}
      source={require('./src/assets/images/logoHeader-M.png')}
    />
  );
}

function LogoTitleWhite() {
  return (
    <Image
      style={{
        width: 210,
        height: 40,
        marginBottom: Platform.OS === 'ios' ? 10 : 0,
      }}
      source={require('./src/assets/images/logoHeader.png')}
    />
  );
}

function HomeScreen({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function QuickMenuPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="IndividualQuickMenuScreen"
        component={IndividualQuickMenu}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Hızlı Menü
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerBackTitleVisible: Platform.OS === 'ios' ? true : false,
          headerBackTitleStyle: {
            backgroundColor: '#000',
          },
          headerStyle: {
            backgroundColor: '#ffffff',
            width: 1000,
          },
          headerTintColor: '#546c7e',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

function QuickMenuCommercialPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CommercialQuickMenuScreen"
        component={CommercialQuickMenu}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Hızlı Menü
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerBackTitleVisible: Platform.OS === 'ios' ? true : false,
          headerBackTitleStyle: {
            backgroundColor: '#000',
          },
          headerStyle: {
            backgroundColor: '#ffffff',
            width: 1000,
          },
          headerTintColor: '#546c7e',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

function CarTowServicePage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CarTowServiceScreen"
        component={CarTowService}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Oto Çekici / Kurtarma
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/iconPng/carTow.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ),
          headerStyle: {
            backgroundColor: '#ffffff',
            width: 1000,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CarTireServicePage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CarTireServiceScreen"
        component={CarTireService}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Oto Jant / Lastik
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/iconPng/carTire.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CarWashServicePage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CarWashServiceScreen"
        component={CarWashService}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Oto Yıkama / Kuaför
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/iconPng/carWash.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CarRepairServicePage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CarRepairServiceScreen"
        component={CarRepairService}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Oto Servis / Bakım
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/iconPng/carService.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CarBatteryServicePage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CarBatteryServiceScreen"
        component={CarBatteryService}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Oto Akü
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/iconPng/carBattery.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CarKeyServicePage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CarKeyServiceScreen"
        component={CarKeyService}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Oto Anahtar Çilingir
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/iconPng/carKey.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CarPartsServicePage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CarPartsServiceScreen"
        component={CarPartsService}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Oto Yedek Parça
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/iconPng/carParts.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CommercialUsersListPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CommercialUsersListScreen"
        component={CommercialUsersList}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Hizmet Veren Firmalar
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/iconPng/shop.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function MyGarageCarListPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="MyGarageCarListScreen"
        component={MyGarageCarList}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Araçlarım
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/iconPng/garage.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: '#546c7e',
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function LocationSelectedPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="LocationSelectedScreen"
        component={LocationSelected}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Konum Seç
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/iconPng/map.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: '#546c7e',
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function IndividualUserHelpPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="IndividualUserHelpScreen"
        component={IndividualUserHelp}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Sık Sorulan Sorular
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function IndividualUserGarageCarsPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="IndividualUserGarageCarsScreen"
        component={IndividualUserGarageCars}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Garajım
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/car-garage.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: '#546c7e',
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function IndividualUserGarageAddCarsPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="IndividualUserGarageAddCarsScreen"
        component={IndividualUserGarageAddCars}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Araç Ekle
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/car-plus.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: '#546c7e',
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CommercialUserServicesPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CommercialUserServicesScreen"
        component={CommercialUserServices}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Hizmetlerim
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/customer-serv.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: '#546c7e',
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CommercialUserAddServicesPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="CommercialUserAddServicesScreen"
        component={CommercialUserAddServices}
        options={{
          headerTitle: props => (
            <Text style={styles.headText} {...props}>
              Hizmet Ekle
            </Text>
          ),
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIconsIcon
                      name="arrow-left"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )
              : null,
          headerRight: props => (
            <Image
              source={require('./src/assets/images/services-plus.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: '#546c7e',
              }}
            />
          ),

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function PassChangePage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: Platform.OS === 'ios' ? true : false,
      }}>
      <Stack.Screen
        name="PassChangeScreen"
        component={PassChange}
        options={{
          headerTitle: props => <Text />,
          headerLeft: props => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIconsIcon
                name="arrow-left"
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SignInPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: Platform.OS === 'ios' ? true : false,
      }}>
      <Stack.Screen
        name="SignInScreen"
        component={SignIn}
        options={{
          headerTitle: props => <Text />,
          headerLeft: props => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIconsIcon
                name="arrow-left"
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SignInCommercialPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: Platform.OS === 'ios' ? true : false,
      }}>
      <Stack.Screen
        name="SignInCommercialScreen"
        component={SignInCommercial}
        options={{
          headerTitle: props => <Text />,
          headerLeft: props => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIconsIcon
                name="arrow-left"
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SignUpIndividualPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: Platform.OS === 'ios' ? true : false,
      }}>
      <Stack.Screen
        name="SignUpIndividualScreen"
        component={SignUpIndividual}
        options={{
          headerTitle: props => <Text />,
          headerLeft: props => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIconsIcon
                name="arrow-left"
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SignUpCommercialPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: Platform.OS === 'ios' ? true : false,
      }}>
      <Stack.Screen
        name="SignUpCommercialScreen"
        component={SignUpCommercial}
        options={{
          headerTitle: props => <Text />,
          headerLeft: props => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIconsIcon
                name="arrow-left"
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SMSVerificationPage({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: Platform.OS === 'ios' ? true : false,
      }}>
      <Stack.Screen
        name="SMSVerification"
        component={SMSVerification}
        options={{
          headerTitle: props => <LogoTitle {...props} />,

          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function TabMenuScreenIndividual({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="IndividualUserHomeScreen"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'white',
          borderTopColor: 'gray',
          height: height / 11,
          shadowColor: 'gray',
          shadowOpacity: 0.1,
        },
        tabBarActiveTintColor: '#546c7e',
        tabBarInactiveTintColor: 'gray',
        tabBarItemStyle: {
          shadowColor: '#546c7e',
          shadowOpacity: 0.15,
          marginBottom: 3,
          height: 50,
          paddingBottom: 3,
          paddingLeft: 5,
        },
      }}>
      <Tab.Screen
        name="IndividualUserMyGarageScreen"
        component={IndividualUserGarageCars}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            height: height / 9,
          },
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenu');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenu');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                ),
          headerRight:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 10,
              }}>
              <FontAwesome5
                name="car"
                size={20}
                color={focused ? '#546c7e' : 'gray'}
              />
            </View>
          ),
          tabBarLabel: 'Garaj',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="IndividualServiceRequestManagementScreen"
        component={IndividualServiceRequestManagement}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            height: height / 9,
          },
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenu');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenu');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                ),
          headerRight:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 10,
              }}>
              <FontAwesome5
                name="pencil-alt"
                size={19}
                color={focused ? '#546c7e' : 'gray'}
              />
            </View>
          ),
          tabBarLabel: 'Talepler',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="IndividualUserHomeScreen"
        component={IndividualUserHome}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            height: height / 9,
          },
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenu');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenu');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                ),
          headerRight:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                width: 55,
                height: 55,
                backgroundColor: '#546c7e',
                borderRadius: 30,
                shadowColor: 'gray',
                shadowOpacity: 0.2,
                borderColor: 'white',
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: Platform.OS == 'android' ? 35 : 35,
              }}>
              <Image
                source={require('./src/assets/images/plus.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: 'white',
                }}
              />
            </View>
          ),
          tabBarLabel: 'Hizmet Al',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="IndividualUserOfferScreen"
        component={IndividualUserOffer}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            height: height / 9,
          },
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenu');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenu');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                ),
          headerRight:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 10,
              }}>
              <FontAwesome5
                name="lira-sign"
                size={19}
                color={focused ? '#546c7e' : 'gray'}
              />
            </View>
          ),
          tabBarLabel: 'Teklifler',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="IndividualUserCampaignScreen"
        component={IndividualUserCampaign}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            height: height / 9,
          },
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenu');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenu');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                ),
          headerRight:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 10,
              }}>
              <FontAwesome5
                name="star"
                size={18}
                color={focused ? '#546c7e' : 'gray'}
              />
            </View>
          ),
          tabBarLabel: 'Kampanya',
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}

function TabMenuScreenCommercial({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="CommercialUserHomeScreen"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'white',
          borderTopColor: 'gray',
          height: height / 11,
          shadowColor: 'gray',
          shadowOpacity: 0.1,
        },
        tabBarActiveTintColor: '#546c7e',
        tabBarInactiveTintColor: 'gray',
        tabBarItemStyle: {
          shadowColor: '#546c7e',
          shadowOpacity: 0.15,
          marginBottom: 3,
          height: 50,
          paddingBottom: 3,
          paddingLeft: 5,
        },
      }}>
      <Tab.Screen
        name="CommercialUserServicesScreen"
        component={CommercialUserServices}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            height: height / 9,
          },
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenuCommercial');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenuCommercial');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                ),
          headerRight:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 10,
              }}>
              <FontAwesome5
                name="handshake"
                size={19}
                color={focused ? '#546c7e' : 'gray'}
              />
            </View>
          ),
          tabBarLabel: 'Hizmetler',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="CommercialUserOfferScreen"
        component={CommercialUserOffer}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            height: height / 9,
          },
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenuCommercial');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenuCommercial');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                ),
          headerRight:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 10,
              }}>
              <FontAwesome5
                name="lira-sign"
                size={19}
                color={focused ? '#546c7e' : 'gray'}
              />
            </View>
          ),
          tabBarLabel: 'Tekliflerim',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="CommercialUserHomeScreen"
        component={CommercialUserHome}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            height: height / 9,
          },
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenuCommercial');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenuCommercial');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                ),
          headerRight:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                width: 55,
                height: 55,
                backgroundColor: '#546c7e',
                borderRadius: 30,
                shadowColor: 'gray',
                shadowOpacity: 0.2,
                borderColor: 'white',
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: Platform.OS == 'android' ? 35 : 35,
              }}>
              <Image
                source={require('./src/assets/images/car.png')}
                style={{
                  width: 33,
                  height: 33,
                  tintColor: 'white',
                }}
              />
            </View>
          ),
          tabBarLabel: 'Teklif Ver',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="CommercialUserRatingPointsScreen"
        component={CommercialUserRatingPoints}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            height: height / 9,
          },
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenuCommercial');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenuCommercial');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                ),
          headerRight:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 10,
              }}>
              <FontAwesome5
                name="star"
                size={19}
                color={focused ? '#546c7e' : 'gray'}
              />
            </View>
          ),
          tabBarLabel: 'Puanlarım',
          headerTitleAlign: 'center',
        }}
      />

      <Tab.Screen
        name="CommercialUserHelpScreen"
        component={CommercialUserHelp}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: '#ffffff',
            height: height / 9,
          },
          headerLeft:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenuCommercial');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('QuickMenuCommercial');
                    }}>
                    <MaterialCommunityIconsIcon
                      name="menu-open"
                      style={styles.iconHomeLeft}
                    />
                  </TouchableOpacity>
                ),
          headerRight:
            Platform.OS === 'ios'
              ? props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                )
              : props => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'VAL-E',
                        'Çok yakında VAL-E ile yakınındaki hizmet verenleri görebileceksin, bizi takip etmeye devam et.',
                        [{text: 'Tamam', onPress: () => null}],
                      );
                    }}>
                    <MaterialCommunityIconsIcon
                      name="map-marker-radius-outline"
                      style={styles.iconHomeRight}
                    />
                  </TouchableOpacity>
                ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 10,
              }}>
              <FontAwesome5
                name="question"
                size={19}
                color={focused ? '#546c7e' : 'gray'}
              />
            </View>
          ),
          tabBarLabel: 'Yardım',
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen
          name="SignInCommercial"
          component={SignInCommercialPage}
        />

        <Stack.Screen name="PassChange" component={PassChangePage} />
        <Stack.Screen name="SMSVerification" component={SMSVerificationPage} />
        <Stack.Screen
          name="SignUpIndividual"
          component={SignUpIndividualPage}
        />
        <Stack.Screen
          name="SignUpCommercial"
          component={SignUpCommercialPage}
        />
        <Stack.Screen
          name="IndividualUserHome"
          component={TabMenuScreenIndividual}
        />
        <Stack.Screen name="CarTowService" component={CarTowServicePage} />
        <Stack.Screen name="CarWashService" component={CarWashServicePage} />
        <Stack.Screen name="CarTireService" component={CarTireServicePage} />
        <Stack.Screen
          name="CarRepairService"
          component={CarRepairServicePage}
        />

        <Stack.Screen
          name="CarBatteryService"
          component={CarBatteryServicePage}
        />
        <Stack.Screen name="CarKeyService" component={CarKeyServicePage} />
        <Stack.Screen name="CarPartsService" component={CarPartsServicePage} />

        <Stack.Screen
          name="CommercialUsersList"
          component={CommercialUsersListPage}
        />
        <Stack.Screen name="MyGarageCarList" component={MyGarageCarListPage} />
        <Stack.Screen
          name="LocationSelected"
          component={LocationSelectedPage}
        />

        <Stack.Screen
          name="IndividualUserHelp"
          component={IndividualUserHelpPage}
        />

        <Stack.Screen name="QuickMenu" component={QuickMenuPage} />
        <Stack.Screen
          name="QuickMenuCommercial"
          component={QuickMenuCommercialPage}
        />

        <Stack.Screen
          name="IndividualUserGarageCars"
          component={IndividualUserGarageCarsPage}
        />
        <Stack.Screen
          name="IndividualUserGarageAddCars"
          component={IndividualUserGarageAddCarsPage}
        />

        <Stack.Screen
          name="CommercialUserHome"
          component={TabMenuScreenCommercial}
        />

        <Stack.Screen
          name="CommercialUserAddServices"
          component={CommercialUserAddServicesPage}
        />
        <Stack.Screen
          name="CommercialUserServices"
          component={CommercialUserServicesPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: '#546c7e',
    fontSize: 28,
    height: 30,
    width: 30,
    marginRight: 5,
  },
  iconHomeLeft: {
    color: '#546c7e',
    fontSize: 22,
    height: 30,
    width: 30,
    marginLeft: 15,
  },
  iconHomeRight: {
    color: '#546c7e',
    fontSize: 20,
    height: 30,
    width: 30,
    marginRight: 5,
  },
  headText: {
    color: '#546c7e',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  },
});

export default App;
