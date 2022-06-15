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
import {CONSTANT} from '../../constant/Constant';
import RadioButtonRN from 'radio-buttons-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Tab, TabView} from 'react-native-elements';

//import {TabView, SceneMap} from 'react-native-tab-view';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SelectDropdown from 'react-native-select-dropdown';

const il_ilce = [
  {
    il: 'Adana',
    plaka: 1,
    ilceleri: [
      'Aladağ',
      'Ceyhan',
      'Çukurova',
      'Feke',
      'İmamoğlu',
      'Karaisalı',
      'Karataş',
      'Kozan',
      'Pozantı',
      'Saimbeyli',
      'Sarıçam',
      'Seyhan',
      'Tufanbeyli',
      'Yumurtalık',
      'Yüreğir',
    ],
  },
  {
    il: 'Adıyaman',
    plaka: 2,
    ilceleri: [
      'Besni',
      'Çelikhan',
      'Gerger',
      'Gölbaşı',
      'Kahta',
      'Merkez',
      'Samsat',
      'Sincik',
      'Tut',
    ],
  },
  {
    il: 'Afyonkarahisar',
    plaka: 3,
    ilceleri: [
      'Başmakçı',
      'Bayat',
      'Bolvadin',
      'Çay',
      'Çobanlar',
      'Dazkırı',
      'Dinar',
      'Emirdağ',
      'Evciler',
      'Hocalar',
      'İhsaniye',
      'İscehisar',
      'Kızılören',
      'Merkez',
      'Sandıklı',
      'Sinanpaşa',
      'Sultandağı',
      'Şuhut',
    ],
  },
  {
    il: 'Ağrı',
    plaka: 4,
    ilceleri: [
      'Diyadin',
      'Doğubayazıt',
      'Eleşkirt',
      'Hamur',
      'Merkez',
      'Patnos',
      'Taşlıçay',
      'Tutak',
    ],
  },
  {
    il: 'Amasya',
    plaka: 5,
    ilceleri: [
      'Göynücek',
      'Gümüşhacıköy',
      'Hamamözü',
      'Merkez',
      'Merzifon',
      'Suluova',
      'Taşova',
    ],
  },
  {
    il: 'Ankara',
    plaka: 6,
    ilceleri: [
      'Altındağ',
      'Ayaş',
      'Bala',
      'Beypazarı',
      'Çamlıdere',
      'Çankaya',
      'Çubuk',
      'Elmadağ',
      'Güdül',
      'Haymana',
      'Kalecik',
      'Kızılcahamam',
      'Nallıhan',
      'Polatlı',
      'Şereflikoçhisar',
      'Yenimahalle',
      'Gölbaşı',
      'Keçiören',
      'Mamak',
      'Sincan',
      'Kazan',
      'Akyurt',
      'Etimesgut',
      'Evren',
      'Pursaklar',
    ],
  },
  {
    il: 'Antalya',
    plaka: 7,
    ilceleri: [
      'Akseki',
      'Alanya',
      'Elmalı',
      'Finike',
      'Gazipaşa',
      'Gündoğmuş',
      'Kaş',
      'Korkuteli',
      'Kumluca',
      'Manavgat',
      'Serik',
      'Demre',
      'İbradı',
      'Kemer',
      'Aksu',
      'Döşemealtı',
      'Kepez',
      'Konyaaltı',
      'Muratpaşa',
    ],
  },
  {
    il: 'Artvin',
    plaka: 8,
    ilceleri: [
      'Ardanuç',
      'Arhavi',
      'Merkez',
      'Borçka',
      'Hopa',
      'Şavşat',
      'Yusufeli',
      'Murgul',
    ],
  },
  {
    il: 'Aydın',
    plaka: 9,
    ilceleri: [
      'Merkez',
      'Bozdoğan',
      'Efeler',
      'Çine',
      'Germencik',
      'Karacasu',
      'Koçarlı',
      'Kuşadası',
      'Kuyucak',
      'Nazilli',
      'Söke',
      'Sultanhisar',
      'Yenipazar',
      'Buharkent',
      'İncirliova',
      'Karpuzlu',
      'Köşk',
      'Didim',
    ],
  },
  {
    il: 'Balıkesir',
    plaka: 10,
    ilceleri: [
      'Altıeylül',
      'Ayvalık',
      'Merkez',
      'Balya',
      'Bandırma',
      'Bigadiç',
      'Burhaniye',
      'Dursunbey',
      'Edremit',
      'Erdek',
      'Gönen',
      'Havran',
      'İvrindi',
      'Karesi',
      'Kepsut',
      'Manyas',
      'Savaştepe',
      'Sındırgı',
      'Gömeç',
      'Susurluk',
      'Marmara',
    ],
  },
  {
    il: 'Bilecik',
    plaka: 11,
    ilceleri: [
      'Merkez',
      'Bozüyük',
      'Gölpazarı',
      'Osmaneli',
      'Pazaryeri',
      'Söğüt',
      'Yenipazar',
      'İnhisar',
    ],
  },
  {
    il: 'Bingöl',
    plaka: 12,
    ilceleri: [
      'Merkez',
      'Genç',
      'Karlıova',
      'Kiğı',
      'Solhan',
      'Adaklı',
      'Yayladere',
      'Yedisu',
    ],
  },
  {
    il: 'Bitlis',
    plaka: 13,
    ilceleri: [
      'Adilcevaz',
      'Ahlat',
      'Merkez',
      'Hizan',
      'Mutki',
      'Tatvan',
      'Güroymak',
    ],
  },
  {
    il: 'Bolu',
    plaka: 14,
    ilceleri: [
      'Merkez',
      'Gerede',
      'Göynük',
      'Kıbrıscık',
      'Mengen',
      'Mudurnu',
      'Seben',
      'Dörtdivan',
      'Yeniçağa',
    ],
  },
  {
    il: 'Burdur',
    plaka: 15,
    ilceleri: [
      'Ağlasun',
      'Bucak',
      'Merkez',
      'Gölhisar',
      'Tefenni',
      'Yeşilova',
      'Karamanlı',
      'Kemer',
      'Altınyayla',
      'Çavdır',
      'Çeltikçi',
    ],
  },
  {
    il: 'Bursa',
    plaka: 16,
    ilceleri: [
      'Gemlik',
      'İnegöl',
      'İznik',
      'Karacabey',
      'Keles',
      'Mudanya',
      'Mustafakemalpaşa',
      'Orhaneli',
      'Orhangazi',
      'Yenişehir',
      'Büyükorhan',
      'Harmancık',
      'Nilüfer',
      'Osmangazi',
      'Yıldırım',
      'Gürsu',
      'Kestel',
    ],
  },
  {
    il: 'Çanakkale',
    plaka: 17,
    ilceleri: [
      'Ayvacık',
      'Bayramiç',
      'Biga',
      'Bozcaada',
      'Çan',
      'Merkez',
      'Eceabat',
      'Ezine',
      'Gelibolu',
      'Gökçeada',
      'Lapseki',
      'Yenice',
    ],
  },
  {
    il: 'Çankırı',
    plaka: 18,
    ilceleri: [
      'Merkez',
      'Çerkeş',
      'Eldivan',
      'Ilgaz',
      'Kurşunlu',
      'Orta',
      'Şabanözü',
      'Yapraklı',
      'Atkaracalar',
      'Kızılırmak',
      'Bayramören',
      'Korgun',
    ],
  },
  {
    il: 'Çorum',
    plaka: 19,
    ilceleri: [
      'Alaca',
      'Bayat',
      'Merkez',
      'İskilip',
      'Kargı',
      'Mecitözü',
      'Ortaköy',
      'Osmancık',
      'Sungurlu',
      'Boğazkale',
      'Uğurludağ',
      'Dodurga',
      'Laçin',
      'Oğuzlar',
    ],
  },
  {
    il: 'Denizli',
    plaka: 20,
    ilceleri: [
      'Acıpayam',
      'Buldan',
      'Çal',
      'Çameli',
      'Çardak',
      'Çivril',
      'Merkez',
      'Merkezefendi',
      'Pamukkale',
      'Güney',
      'Kale',
      'Sarayköy',
      'Tavas',
      'Babadağ',
      'Bekilli',
      'Honaz',
      'Serinhisar',
      'Baklan',
      'Beyağaç',
      'Bozkurt',
    ],
  },
  {
    il: 'Diyarbakır',
    plaka: 21,
    ilceleri: [
      'Kocaköy',
      'Çermik',
      'Çınar',
      'Çüngüş',
      'Dicle',
      'Ergani',
      'Hani',
      'Hazro',
      'Kulp',
      'Lice',
      'Silvan',
      'Eğil',
      'Bağlar',
      'Kayapınar',
      'Sur',
      'Yenişehir',
      'Bismil',
    ],
  },
  {
    il: 'Edirne',
    plaka: 22,
    ilceleri: [
      'Merkez',
      'Enez',
      'Havsa',
      'İpsala',
      'Keşan',
      'Lalapaşa',
      'Meriç',
      'Uzunköprü',
      'Süloğlu',
    ],
  },
  {
    il: 'Elazığ',
    plaka: 23,
    ilceleri: [
      'Ağın',
      'Baskil',
      'Merkez',
      'Karakoçan',
      'Keban',
      'Maden',
      'Palu',
      'Sivrice',
      'Arıcak',
      'Kovancılar',
      'Alacakaya',
    ],
  },
  {
    il: 'Erzincan',
    plaka: 24,
    ilceleri: [
      'Çayırlı',
      'Merkez',
      'İliç',
      'Kemah',
      'Kemaliye',
      'Refahiye',
      'Tercan',
      'Üzümlü',
      'Otlukbeli',
    ],
  },
  {
    il: 'Erzurum',
    plaka: 25,
    ilceleri: [
      'Aşkale',
      'Çat',
      'Hınıs',
      'Horasan',
      'İspir',
      'Karayazı',
      'Narman',
      'Oltu',
      'Olur',
      'Pasinler',
      'Şenkaya',
      'Tekman',
      'Tortum',
      'Karaçoban',
      'Uzundere',
      'Pazaryolu',
      'Köprüköy',
      'Palandöken',
      'Yakutiye',
      'Aziziye',
    ],
  },
  {
    il: 'Eskişehir',
    plaka: 26,
    ilceleri: [
      'Çifteler',
      'Mahmudiye',
      'Mihalıççık',
      'Sarıcakaya',
      'Seyitgazi',
      'Sivrihisar',
      'Alpu',
      'Beylikova',
      'İnönü',
      'Günyüzü',
      'Han',
      'Mihalgazi',
      'Odunpazarı',
      'Tepebaşı',
    ],
  },
  {
    il: 'Gaziantep',
    plaka: 27,
    ilceleri: [
      'Araban',
      'İslahiye',
      'Nizip',
      'Oğuzeli',
      'Yavuzeli',
      'Şahinbey',
      'Şehitkamil',
      'Karkamış',
      'Nurdağı',
    ],
  },
  {
    il: 'Giresun',
    plaka: 28,
    ilceleri: [
      'Alucra',
      'Bulancak',
      'Dereli',
      'Espiye',
      'Eynesil',
      'Merkez',
      'Görele',
      'Keşap',
      'Şebinkarahisar',
      'Tirebolu',
      'Piraziz',
      'Yağlıdere',
      'Çamoluk',
      'Çanakçı',
      'Doğankent',
      'Güce',
    ],
  },
  {
    il: 'Gümüşhane',
    plaka: 29,
    ilceleri: ['Merkez', 'Kelkit', 'Şiran', 'Torul', 'Köse', 'Kürtün'],
  },
  {
    il: 'Hakkari',
    plaka: 30,
    ilceleri: ['Çukurca', 'Merkez', 'Şemdinli', 'Yüksekova'],
  },
  {
    il: 'Hatay',
    plaka: 31,
    ilceleri: [
      'Altınözü',
      'Arsuz',
      'Defne',
      'Dörtyol',
      'Hassa',
      'Antakya',
      'İskenderun',
      'Kırıkhan',
      'Payas',
      'Reyhanlı',
      'Samandağ',
      'Yayladağı',
      'Erzin',
      'Belen',
      'Kumlu',
    ],
  },
  {
    il: 'Isparta',
    plaka: 32,
    ilceleri: [
      'Atabey',
      'Eğirdir',
      'Gelendost',
      'Merkez',
      'Keçiborlu',
      'Senirkent',
      'Sütçüler',
      'Şarkikaraağaç',
      'Uluborlu',
      'Yalvaç',
      'Aksu',
      'Gönen',
      'Yenişarbademli',
    ],
  },
  {
    il: 'Mersin',
    plaka: 33,
    ilceleri: [
      'Anamur',
      'Erdemli',
      'Gülnar',
      'Mut',
      'Silifke',
      'Tarsus',
      'Aydıncık',
      'Bozyazı',
      'Çamlıyayla',
      'Akdeniz',
      'Mezitli',
      'Toroslar',
      'Yenişehir',
    ],
  },
  {
    il: 'İstanbul',
    plaka: 34,
    ilceleri: [
      'Adalar',
      'Bakırköy',
      'Beşiktaş',
      'Beykoz',
      'Beyoğlu',
      'Çatalca',
      'Eyüp',
      'Fatih',
      'Gaziosmanpaşa',
      'Kadıköy',
      'Kartal',
      'Sarıyer',
      'Silivri',
      'Şile',
      'Şişli',
      'Üsküdar',
      'Zeytinburnu',
      'Büyükçekmece',
      'Kağıthane',
      'Küçükçekmece',
      'Pendik',
      'Ümraniye',
      'Bayrampaşa',
      'Avcılar',
      'Bağcılar',
      'Bahçelievler',
      'Güngören',
      'Maltepe',
      'Sultanbeyli',
      'Tuzla',
      'Esenler',
      'Arnavutköy',
      'Ataşehir',
      'Başakşehir',
      'Beylikdüzü',
      'Çekmeköy',
      'Esenyurt',
      'Sancaktepe',
      'Sultangazi',
    ],
  },
  {
    il: 'İzmir',
    plaka: 35,
    ilceleri: [
      'Aliağa',
      'Bayındır',
      'Bergama',
      'Bornova',
      'Çeşme',
      'Dikili',
      'Foça',
      'Karaburun',
      'Karşıyaka',
      'Kemalpaşa',
      'Kınık',
      'Kiraz',
      'Menemen',
      'Ödemiş',
      'Seferihisar',
      'Selçuk',
      'Tire',
      'Torbalı',
      'Urla',
      'Beydağ',
      'Buca',
      'Konak',
      'Menderes',
      'Balçova',
      'Çiğli',
      'Gaziemir',
      'Narlıdere',
      'Güzelbahçe',
      'Bayraklı',
      'Karabağlar',
    ],
  },
  {
    il: 'Kars',
    plaka: 36,
    ilceleri: [
      'Arpaçay',
      'Digor',
      'Kağızman',
      'Merkez',
      'Sarıkamış',
      'Selim',
      'Susuz',
      'Akyaka',
    ],
  },
  {
    il: 'Kastamonu',
    plaka: 37,
    ilceleri: [
      'Abana',
      'Araç',
      'Azdavay',
      'Bozkurt',
      'Cide',
      'Çatalzeytin',
      'Daday',
      'Devrekani',
      'İnebolu',
      'Merkez',
      'Küre',
      'Taşköprü',
      'Tosya',
      'İhsangazi',
      'Pınarbaşı',
      'Şenpazar',
      'Ağlı',
      'Doğanyurt',
      'Hanönü',
      'Seydiler',
    ],
  },
  {
    il: 'Kayseri',
    plaka: 38,
    ilceleri: [
      'Bünyan',
      'Develi',
      'Felahiye',
      'İncesu',
      'Pınarbaşı',
      'Sarıoğlan',
      'Sarız',
      'Tomarza',
      'Yahyalı',
      'Yeşilhisar',
      'Akkışla',
      'Talas',
      'Kocasinan',
      'Melikgazi',
      'Hacılar',
      'Özvatan',
    ],
  },
  {
    il: 'Kırklareli',
    plaka: 39,
    ilceleri: [
      'Babaeski',
      'Demirköy',
      'Merkez',
      'Kofçaz',
      'Lüleburgaz',
      'Pehlivanköy',
      'Pınarhisar',
      'Vize',
    ],
  },
  {
    il: 'Kırşehir',
    plaka: 40,
    ilceleri: [
      'Çiçekdağı',
      'Kaman',
      'Merkez',
      'Mucur',
      'Akpınar',
      'Akçakent',
      'Boztepe',
    ],
  },
  {
    il: 'Kocaeli',
    plaka: 41,
    ilceleri: [
      'Gebze',
      'Gölcük',
      'Kandıra',
      'Karamürsel',
      'Körfez',
      'Derince',
      'Başiskele',
      'Çayırova',
      'Darıca',
      'Dilovası',
      'İzmit',
      'Kartepe',
    ],
  },
  {
    il: 'Konya',
    plaka: 42,
    ilceleri: [
      'Akşehir',
      'Beyşehir',
      'Bozkır',
      'Cihanbeyli',
      'Çumra',
      'Doğanhisar',
      'Ereğli',
      'Hadim',
      'Ilgın',
      'Kadınhanı',
      'Karapınar',
      'Kulu',
      'Sarayönü',
      'Seydişehir',
      'Yunak',
      'Akören',
      'Altınekin',
      'Derebucak',
      'Hüyük',
      'Karatay',
      'Meram',
      'Selçuklu',
      'Taşkent',
      'Ahırlı',
      'Çeltik',
      'Derbent',
      'Emirgazi',
      'Güneysınır',
      'Halkapınar',
      'Tuzlukçu',
      'Yalıhüyük',
    ],
  },
  {
    il: 'Kütahya',
    plaka: 43,
    ilceleri: [
      'Altıntaş',
      'Domaniç',
      'Emet',
      'Gediz',
      'Merkez',
      'Simav',
      'Tavşanlı',
      'Aslanapa',
      'Dumlupınar',
      'Hisarcık',
      'Şaphane',
      'Çavdarhisar',
      'Pazarlar',
    ],
  },
  {
    il: 'Malatya',
    plaka: 44,
    ilceleri: [
      'Akçadağ',
      'Arapgir',
      'Arguvan',
      'Darende',
      'Doğanşehir',
      'Hekimhan',
      'Merkez',
      'Pütürge',
      'Yeşilyurt',
      'Battalgazi',
      'Doğanyol',
      'Kale',
      'Kuluncak',
      'Yazıhan',
    ],
  },
  {
    il: 'Manisa',
    plaka: 45,
    ilceleri: [
      'Akhisar',
      'Alaşehir',
      'Demirci',
      'Gördes',
      'Kırkağaç',
      'Kula',
      'Merkez',
      'Salihli',
      'Sarıgöl',
      'Saruhanlı',
      'Selendi',
      'Soma',
      'Şehzadeler',
      'Yunusemre',
      'Turgutlu',
      'Ahmetli',
      'Gölmarmara',
      'Köprübaşı',
    ],
  },
  {
    il: 'Kahramanmaraş',
    plaka: 46,
    ilceleri: [
      'Afşin',
      'Andırın',
      'Dulkadiroğlu',
      'Onikişubat',
      'Elbistan',
      'Göksun',
      'Merkez',
      'Pazarcık',
      'Türkoğlu',
      'Çağlayancerit',
      'Ekinözü',
      'Nurhak',
    ],
  },
  {
    il: 'Mardin',
    plaka: 47,
    ilceleri: [
      'Derik',
      'Kızıltepe',
      'Artuklu',
      'Merkez',
      'Mazıdağı',
      'Midyat',
      'Nusaybin',
      'Ömerli',
      'Savur',
      'Dargeçit',
      'Yeşilli',
    ],
  },
  {
    il: 'Muğla',
    plaka: 48,
    ilceleri: [
      'Bodrum',
      'Datça',
      'Fethiye',
      'Köyceğiz',
      'Marmaris',
      'Menteşe',
      'Milas',
      'Ula',
      'Yatağan',
      'Dalaman',
      'Seydikemer',
      'Ortaca',
      'Kavaklıdere',
    ],
  },
  {
    il: 'Muş',
    plaka: 49,
    ilceleri: ['Bulanık', 'Malazgirt', 'Merkez', 'Varto', 'Hasköy', 'Korkut'],
  },
  {
    il: 'Nevşehir',
    plaka: 50,
    ilceleri: [
      'Avanos',
      'Derinkuyu',
      'Gülşehir',
      'Hacıbektaş',
      'Kozaklı',
      'Merkez',
      'Ürgüp',
      'Acıgöl',
    ],
  },
  {
    il: 'Niğde',
    plaka: 51,
    ilceleri: ['Bor', 'Çamardı', 'Merkez', 'Ulukışla', 'Altunhisar', 'Çiftlik'],
  },
  {
    il: 'Ordu',
    plaka: 52,
    ilceleri: [
      'Akkuş',
      'Altınordu',
      'Aybastı',
      'Fatsa',
      'Gölköy',
      'Korgan',
      'Kumru',
      'Mesudiye',
      'Perşembe',
      'Ulubey',
      'Ünye',
      'Gülyalı',
      'Gürgentepe',
      'Çamaş',
      'Çatalpınar',
      'Çaybaşı',
      'İkizce',
      'Kabadüz',
      'Kabataş',
    ],
  },
  {
    il: 'Rize',
    plaka: 53,
    ilceleri: [
      'Ardeşen',
      'Çamlıhemşin',
      'Çayeli',
      'Fındıklı',
      'İkizdere',
      'Kalkandere',
      'Pazar',
      'Merkez',
      'Güneysu',
      'Derepazarı',
      'Hemşin',
      'İyidere',
    ],
  },
  {
    il: 'Sakarya',
    plaka: 54,
    ilceleri: [
      'Akyazı',
      'Geyve',
      'Hendek',
      'Karasu',
      'Kaynarca',
      'Sapanca',
      'Kocaali',
      'Pamukova',
      'Taraklı',
      'Ferizli',
      'Karapürçek',
      'Söğütlü',
      'Adapazarı',
      'Arifiye',
      'Erenler',
      'Serdivan',
    ],
  },
  {
    il: 'Samsun',
    plaka: 55,
    ilceleri: [
      'Alaçam',
      'Bafra',
      'Çarşamba',
      'Havza',
      'Kavak',
      'Ladik',
      'Terme',
      'Vezirköprü',
      'Asarcık',
      'Ondokuzmayıs',
      'Salıpazarı',
      'Tekkeköy',
      'Ayvacık',
      'Yakakent',
      'Atakum',
      'Canik',
      'İlkadım',
    ],
  },
  {
    il: 'Siirt',
    plaka: 56,
    ilceleri: [
      'Baykan',
      'Eruh',
      'Kurtalan',
      'Pervari',
      'Merkez',
      'Şirvan',
      'Tillo',
    ],
  },
  {
    il: 'Sinop',
    plaka: 57,
    ilceleri: [
      'Ayancık',
      'Boyabat',
      'Durağan',
      'Erfelek',
      'Gerze',
      'Merkez',
      'Türkeli',
      'Dikmen',
      'Saraydüzü',
    ],
  },
  {
    il: 'Sivas',
    plaka: 58,
    ilceleri: [
      'Divriği',
      'Gemerek',
      'Gürün',
      'Hafik',
      'İmranlı',
      'Kangal',
      'Koyulhisar',
      'Merkez',
      'Suşehri',
      'Şarkışla',
      'Yıldızeli',
      'Zara',
      'Akıncılar',
      'Altınyayla',
      'Doğanşar',
      'Gölova',
      'Ulaş',
    ],
  },
  {
    il: 'Tekirdağ',
    plaka: 59,
    ilceleri: [
      'Çerkezköy',
      'Çorlu',
      'Ergene',
      'Hayrabolu',
      'Malkara',
      'Muratlı',
      'Saray',
      'Süleymanpaşa',
      'Kapaklı',
      'Şarköy',
      'Marmaraereğlisi',
    ],
  },
  {
    il: 'Tokat',
    plaka: 60,
    ilceleri: [
      'Almus',
      'Artova',
      'Erbaa',
      'Niksar',
      'Reşadiye',
      'Merkez',
      'Turhal',
      'Zile',
      'Pazar',
      'Yeşilyurt',
      'Başçiftlik',
      'Sulusaray',
    ],
  },
  {
    il: 'Trabzon',
    plaka: 61,
    ilceleri: [
      'Akçaabat',
      'Araklı',
      'Arsin',
      'Çaykara',
      'Maçka',
      'Of',
      'Ortahisar',
      'Sürmene',
      'Tonya',
      'Vakfıkebir',
      'Yomra',
      'Beşikdüzü',
      'Şalpazarı',
      'Çarşıbaşı',
      'Dernekpazarı',
      'Düzköy',
      'Hayrat',
      'Köprübaşı',
    ],
  },
  {
    il: 'Tunceli',
    plaka: 62,
    ilceleri: [
      'Çemişgezek',
      'Hozat',
      'Mazgirt',
      'Nazımiye',
      'Ovacık',
      'Pertek',
      'Pülümür',
      'Merkez',
    ],
  },
  {
    il: 'Şanlıurfa',
    plaka: 63,
    ilceleri: [
      'Akçakale',
      'Birecik',
      'Bozova',
      'Ceylanpınar',
      'Eyyübiye',
      'Halfeti',
      'Haliliye',
      'Hilvan',
      'Karaköprü',
      'Siverek',
      'Suruç',
      'Viranşehir',
      'Harran',
    ],
  },
  {
    il: 'Uşak',
    plaka: 64,
    ilceleri: ['Banaz', 'Eşme', 'Karahallı', 'Sivaslı', 'Ulubey', 'Merkez'],
  },
  {
    il: 'Van',
    plaka: 65,
    ilceleri: [
      'Başkale',
      'Çatak',
      'Erciş',
      'Gevaş',
      'Gürpınar',
      'İpekyolu',
      'Muradiye',
      'Özalp',
      'Tuşba',
      'Bahçesaray',
      'Çaldıran',
      'Edremit',
      'Saray',
    ],
  },
  {
    il: 'Yozgat',
    plaka: 66,
    ilceleri: [
      'Akdağmadeni',
      'Boğazlıyan',
      'Çayıralan',
      'Çekerek',
      'Sarıkaya',
      'Sorgun',
      'Şefaatli',
      'Yerköy',
      'Merkez',
      'Aydıncık',
      'Çandır',
      'Kadışehri',
      'Saraykent',
      'Yenifakılı',
    ],
  },
  {
    il: 'Zonguldak',
    plaka: 67,
    ilceleri: ['Çaycuma', 'Devrek', 'Ereğli', 'Merkez', 'Alaplı', 'Gökçebey'],
  },
  {
    il: 'Aksaray',
    plaka: 68,
    ilceleri: [
      'Ağaçören',
      'Eskil',
      'Gülağaç',
      'Güzelyurt',
      'Merkez',
      'Ortaköy',
      'Sarıyahşi',
    ],
  },
  {
    il: 'Bayburt',
    plaka: 69,
    ilceleri: ['Merkez', 'Aydıntepe', 'Demirözü'],
  },
  {
    il: 'Karaman',
    plaka: 70,
    ilceleri: [
      'Ermenek',
      'Merkez',
      'Ayrancı',
      'Kazımkarabekir',
      'Başyayla',
      'Sarıveliler',
    ],
  },
  {
    il: 'Kırıkkale',
    plaka: 71,
    ilceleri: [
      'Delice',
      'Keskin',
      'Merkez',
      'Sulakyurt',
      'Bahşili',
      'Balışeyh',
      'Çelebi',
      'Karakeçili',
      'Yahşihan',
    ],
  },
  {
    il: 'Batman',
    plaka: 72,
    ilceleri: ['Merkez', 'Beşiri', 'Gercüş', 'Kozluk', 'Sason', 'Hasankeyf'],
  },
  {
    il: 'Şırnak',
    plaka: 73,
    ilceleri: [
      'Beytüşşebap',
      'Cizre',
      'İdil',
      'Silopi',
      'Merkez',
      'Uludere',
      'Güçlükonak',
    ],
  },
  {
    il: 'Bartın',
    plaka: 74,
    ilceleri: ['Merkez', 'Kurucaşile', 'Ulus', 'Amasra'],
  },
  {
    il: 'Ardahan',
    plaka: 75,
    ilceleri: ['Merkez', 'Çıldır', 'Göle', 'Hanak', 'Posof', 'Damal'],
  },
  {
    il: 'Iğdır',
    plaka: 76,
    ilceleri: ['Aralık', 'Merkez', 'Tuzluca', 'Karakoyunlu'],
  },
  {
    il: 'Yalova',
    plaka: 77,
    ilceleri: [
      'Merkez',
      'Altınova',
      'Armutlu',
      'Çınarcık',
      'Çiftlikköy',
      'Termal',
    ],
  },
  {
    il: 'Karabük',
    plaka: 78,
    ilceleri: [
      'Eflani',
      'Eskipazar',
      'Merkez',
      'Ovacık',
      'Safranbolu',
      'Yenice',
    ],
  },
  {
    il: 'Kilis',
    plaka: 79,
    ilceleri: ['Merkez', 'Elbeyli', 'Musabeyli', 'Polateli'],
  },
  {
    il: 'Osmaniye',
    plaka: 80,
    ilceleri: [
      'Bahçe',
      'Kadirli',
      'Merkez',
      'Düziçi',
      'Hasanbeyli',
      'Sumbas',
      'Toprakkale',
    ],
  },
  {
    il: 'Düzce',
    plaka: 81,
    ilceleri: [
      'Akçakoca',
      'Merkez',
      'Yığılca',
      'Cumayeri',
      'Gölyaka',
      'Çilimli',
      'Gümüşova',
      'Kaynaşlı',
    ],
  },
];
const il = [
  'Adana',
  'Adıyaman',
  'Afyon',
  'Ağrı',
  'Amasya',
  'Ankara',
  'Antalya',
  'Artvin',
  'Aydın',
  'Balıkesir',
  'Bilecik',
  'Bingöl',
  'Bitlis',
  'Bolu',
  'Burdur',
  'Bursa',
  'Çanakkale',
  'Çankırı',
  'Çorum',
  'Denizli',
  'Diyarbakır',
  'Edirne',
  'Elazığ',
  'Erzincan',
  'Erzurum',
  'Eskişehir',
  'Gaziantep',
  'Giresun',
  'Gümüşhane',
  'Hakkari',
  'Hatay',
  'Isparta',
  'İçel (Mersin)',
  'İstanbul',
  'İzmir',
  'Kars',
  'Kastamonu',
  'Kayseri',
  'Kırklareli',
  'Kırşehir',
  'Kocaeli',
  'Konya',
  'Kütahya',
  'Malatya',
  'Manisa',
  'Kahramanmaraş',
  'Mardin',
  'Muğla',
  'Muş',
  'Nevşehir',
  'Niğde',
  'Ordu',
  'Rize',
  'Sakarya',
  'Samsun',
  'Siirt',
  'Sinop',
  'Sivas',
  'Tekirdağ',
  'Tokat',
  'Trabzon',
  'Tunceli',
  'Şanlıurfa',
  'Uşak',
  'Van',
  'Yozgat',
  'Zonguldak',
  'Aksaray',
  'Bayburt',
  'Karaman',
  'Kırıkkale',
  'Batman',
  'Şırnak',
  'Bartın',
  'Ardahan',
  'Iğdır',
  'Yalova',
  'Karabük',
  'Kilis',
  'Osmaniye',
  'Düzce',
];

const carDataType = [
  'Otomobil',
  'Arazi-SUV',
  'Mini Van-Panel Van',
  'Ticari Araç',
];

const carTireType = ['Yazlık', 'Kışlık', '4 Mevsim'];

const carStateType = ['Evet İstiyorum', 'Hayır İstemiyorum'];

export class CarTireService extends Component {
  constructor() {
    super();

    this.handleIndex = this.handleIndex.bind(this);

    this.carTireChangeRequestService =
      this.carTireChangeRequestService.bind(this);
    this.carNewTireRequestService = this.carNewTireRequestService.bind(this);
    this.firmSelected = this.firmSelected.bind(this);
    this.carSelected = this.carSelected.bind(this);

    this.state = {
      index: 0,
      routes: [
        {key: 'tireChange', title: 'OTO LASTİK DEĞİŞİM'},
        {key: 'newTire', title: 'YENİ OTO LASTİK'},
      ],
      spinner: false,
      firmNameLabel: null,
      selectedIlce: [],
      selectedDisabled: true,
      description: null,
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.setState({
        firmNameLabel: window.commercialsIdFirmName,
        selectedGarageCarName: window.selectedCarName,
      });
      window.car_type =
        window.selectedCarIdList !== null
          ? window.selectedCarIdList.car_type
          : null;

      window.tire_sizes =
        window.selectedCarIdList !== null
          ? window.selectedCarIdList.car_tire_size
          : null;
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  firmSelected() {
    const {navigation} = this.props;
    window.commercialCategoryId = 1;
    navigation.navigate('CommercialUsersList');
  }
  carTireChangeRequestService() {
    if (
      window.car_type === undefined ||
      window.location_city === undefined ||
      window.location_state === undefined ||
      this.state.description === null ||
      window.tire_hotel_service === undefined ||
      window.valet_service === undefined
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
      const {navigation} = this.props;
      this.setState({
        spinner: !this.state.spinner,
      });
      let bodyParameter = {
        category: 1,
        sub_category: 1,
        car_type: window.car_type,
        location_city: window.location_city,
        location_state: window.location_state,
        description: this.state.description,
        latitude: null,
        longitude: null,
        extra: {
          valet_service: window.valet_service,
          tire_hotel_service: window.tire_hotel_service,
        },
        commercials:
          window.commercialsIdList !== null ? window.commercialsIdList : null,
      };
      fetch(CONSTANT.baseUrl + 'request', {
        method: 'POST',
        dataType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyParameter),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status !== 'fail') {
            this.setState({
              spinner: !this.state.spinner,
            });
            Alert.alert(
              'Başarılı !',
              'Hizmet talebiniz alınmıştır, tekliflerinizi en hızlı sürede toplayacağız :)',
              [
                {
                  text: 'Tamam',
                  onPress: () => {
                    window.car_type = null;
                    window.location_city = null;
                    window.location_state = null;
                    window.tire_type = null;
                    window.tire_sizes = null;
                    window.valet_service = null;
                    window.tire_hotel_service = null;
                    window.tire_hotel_service = null;
                    window.commercialsIdList = null;
                    navigation.navigate('IndividualUserHome');
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

  carNewTireRequestService() {
    if (
      window.car_type === undefined ||
      window.location_city === undefined ||
      window.location_state === undefined ||
      this.state.description === null ||
      window.tire_type === undefined ||
      window.tire_sizes === undefined ||
      window.valet_service === undefined
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
      const {navigation} = this.props;
      this.setState({
        spinner: !this.state.spinner,
      });
      let bodyParameter = {
        category: 1,
        sub_category: 2,
        car_type: window.car_type,
        location_city: window.location_city,
        location_state: window.location_state,
        description: this.state.description,
        latitude: null,
        longitude: null,
        extra: {
          tire_type: window.tire_type,
          tire_sizes: window.tire_sizes,
          valet_service: window.valet_service,
        },
        commercials:
          window.commercialsIdList !== null ? window.commercialsIdList : null,
      };
      fetch(CONSTANT.baseUrl + 'request', {
        method: 'POST',
        dataType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyParameter),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status !== 'fail') {
            this.setState({
              spinner: !this.state.spinner,
            });
            Alert.alert(
              'Başarılı !',
              'Hizmet talebiniz alınmıştır, tekliflerinizi en hızlı sürede toplayacağız :)',
              [
                {
                  text: 'Tamam',
                  onPress: () => {
                    window.car_type = null;
                    window.location_city = null;
                    window.location_state = null;
                    window.tire_type = null;
                    window.tire_sizes = null;
                    window.valet_service = null;
                    window.tire_hotel_service = null;
                    window.commercialsIdList = null;

                    navigation.navigate('IndividualUserHome');
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

  carSelected() {
    const {navigation} = this.props;
    window.selectedCategoryId = 1;
    navigation.navigate('MyGarageCarList');
  }

  handleIndex = e => {
    this.setState({index: e});
  };

  render() {
    const {width, height} = Dimensions.get('window');
    let firmNameLabel = this.state.firmNameLabel;
    let selectedCarName = this.state.selectedGarageCarName;

    let index = this.state.index;

    return (
      <>
        <Tab
          value={index}
          onChange={e => this.handleIndex(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
          variant="primary">
          <Tab.Item title="OTO LASTİK DEĞİŞİM" titleStyle={{fontSize: 12}} />
          <Tab.Item title="YENİ OTO LASTİK" titleStyle={{fontSize: 12}} />
        </Tab>
        <ScrollView>
          <TabView
            value={index}
            onChange={this.handleIndex}
            animationType="spring">
            <TabView.Item
              style={{backgroundColor: 'white'}}
              onMoveShouldSetResponder={e => e.stopPropagation()}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
                style={{flex: 1}}>
                <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
                  <Spinner visible={this.state.spinner} color="#1d5cdd" />
                  <View style={styles.View0_Head}>
                    <Text style={styles.textStandart}>
                      Tüm Firmalar/Seçili Firma
                    </Text>
                    <TouchableOpacity
                      style={styles.button_2}
                      onPress={this.firmSelected}>
                      <View style={styles.kayitOlRow_2}>
                        <Text style={styles.kayitOl_2}>
                          {window.commercialsIdList !== null
                            ? firmNameLabel
                            : 'Seçtiğin Firmadan Teklif Al'}
                          {'   '}
                          <FontAwesome5
                            name="arrow-right"
                            size={15}
                            color={'#015b7e'}
                          />
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.View0_Head}>
                    <Text style={styles.textStandart}>
                      Garajımdaki Araçlarım
                    </Text>
                    <TouchableOpacity
                      style={styles.button_2}
                      onPress={this.carSelected}>
                      <View style={styles.kayitOlRow_2}>
                        <Text style={styles.kayitOl_2}>
                          {window.selectedCarIdList !== null
                            ? selectedCarName
                            : 'Seçtiğin Aracına Göre Teklif Al'}
                          {'   '}
                          <FontAwesome5
                            name="arrow-right"
                            size={15}
                            color={'#015b7e'}
                          />
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.View0}>
                    <Text style={styles.textStandart}>Araç Tipi</Text>
                    <SelectDropdown
                      data={carDataType}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        window.car_type = selectedItem;
                      }}
                      defaultButtonText={'Araç Tipi Seçiniz'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialCommunityIcons
                            name={isOpened ? 'arrow-up' : 'arrow-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      defaultValue={window.car_type}
                    />
                  </View>
                  <View style={styles.View1}>
                    <Text style={styles.textStandart}>İl</Text>
                    <SelectDropdown
                      data={il}
                      onSelect={(selectedItem, index) => {
                        window.location_city = selectedItem;
                        il_ilce.map(node => {
                          if (node.il === selectedItem) {
                            this.setState({
                              selectedIlce: node.ilceleri,
                              selectedDisabled: false,
                            });
                          }
                        });
                      }}
                      defaultButtonText={'İl Seçiniz'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialCommunityIcons
                            name={isOpened ? 'arrow-up' : 'arrow-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </View>
                  <View style={styles.View2}>
                    <Text style={styles.textStandart}>İlçe</Text>
                    <SelectDropdown
                      data={this.state.selectedIlce}
                      onSelect={(selectedItem, index) => {
                        window.location_state = selectedItem;
                      }}
                      defaultButtonText={'İlçe Seçiniz'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialCommunityIcons
                            name={isOpened ? 'arrow-up' : 'arrow-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      disabled={this.state.selectedDisabled}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </View>
                  <View style={styles.View4}>
                    <Text style={styles.textStandart}>
                      Çıkan lastiklere Otel hizmeti ister misiniz?
                    </Text>
                    <SelectDropdown
                      data={carStateType}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        if (selectedItem === 'Evet İstiyorum') {
                          window.tire_hotel_service = 1;
                        } else if (selectedItem === 'Hayır İstemiyorum') {
                          window.tire_hotel_service = 0;
                        }
                      }}
                      defaultButtonText={'Lütfen Seçim Yapınız'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialCommunityIcons
                            name={isOpened ? 'arrow-up' : 'arrow-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </View>
                  <View style={styles.View4}>
                    <Text style={styles.textStandart}>
                      Araç teslimat VAL-E hizmeti ister misiniz?
                    </Text>
                    <SelectDropdown
                      data={carStateType}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        if (selectedItem === 'Evet İstiyorum') {
                          window.valet_service = 1;
                        } else if (selectedItem === 'Hayır İstemiyorum') {
                          window.valet_service = 0;
                        }
                      }}
                      defaultButtonText={'Lütfen Seçim Yapınız'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialCommunityIcons
                            name={isOpened ? 'arrow-up' : 'arrow-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </View>
                  <View style={styles.View5}>
                    <Text style={styles.textStandart}>Açıklama</Text>
                    <TextInput
                      placeholder="Oluşturacağınız hizmet talebinize dair detaylı açıklama girebilirsiniz."
                      placeholderTextColor="#808080"
                      style={styles.detailInput}
                      textContentType="name"
                      onChangeText={e => this.setState({description: e})}
                      value={this.state.description}
                      multiline={true}
                      numberOfLines={15}
                    />
                  </View>
                  <View style={styles.signUpButtonView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.carTireChangeRequestService}>
                      <View style={styles.kayitOlRow}>
                        <Text style={styles.kayitOl}>Hemen Hizmet Al</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </TabView.Item>

            <TabView.Item
              style={{backgroundColor: 'white'}}
              onMoveShouldSetResponder={e => e.stopPropagation()}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
                style={{flex: 1}}>
                <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
                  <Spinner visible={this.state.spinner} color="#1d5cdd" />
                  <View style={styles.View0_Head}>
                    <Text style={styles.textStandart}>
                      Tüm Firmalar/Seçili Firma
                    </Text>
                    <TouchableOpacity
                      style={styles.button_2}
                      onPress={this.firmSelected}>
                      <View style={styles.kayitOlRow_2}>
                        <Text style={styles.kayitOl_2}>
                          {window.commercialsIdList !== null
                            ? firmNameLabel
                            : 'Seçtiğin Firmadan Teklif Al'}
                          {'   '}
                          <FontAwesome5
                            name="arrow-right"
                            size={15}
                            color={'#015b7e'}
                          />
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.View0_Head}>
                    <Text style={styles.textStandart}>
                      Garajımdaki Araçlarım
                    </Text>
                    <TouchableOpacity
                      style={styles.button_2}
                      onPress={this.carSelected}>
                      <View style={styles.kayitOlRow_2}>
                        <Text style={styles.kayitOl_2}>
                          {window.selectedCarIdList !== null
                            ? selectedCarName
                            : 'Seçtiğin Aracına Göre Teklif Al'}
                          {'   '}
                          <FontAwesome5
                            name="arrow-right"
                            size={15}
                            color={'#015b7e'}
                          />
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.View0}>
                    <Text style={styles.textStandart}>Araç Tipi</Text>
                    <SelectDropdown
                      data={carDataType}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        window.car_type = selectedItem;
                      }}
                      defaultButtonText={'Araç Tipi Seçiniz'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialCommunityIcons
                            name={isOpened ? 'arrow-up' : 'arrow-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      defaultValue={window.car_type}
                    />
                  </View>
                  <View style={styles.View1_2}>
                    <Text style={styles.textStandart}>İl</Text>
                    <SelectDropdown
                      data={il}
                      onSelect={(selectedItem, index) => {
                        window.location_city = selectedItem;
                        il_ilce.map(node => {
                          if (node.il === selectedItem) {
                            this.setState({
                              selectedIlce: node.ilceleri,
                              selectedDisabled: false,
                            });
                          }
                        });
                      }}
                      defaultButtonText={'İl Seçiniz'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialCommunityIcons
                            name={isOpened ? 'arrow-up' : 'arrow-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </View>
                  <View style={styles.View2_2}>
                    <Text style={styles.textStandart}>İlçe</Text>
                    <SelectDropdown
                      data={this.state.selectedIlce}
                      onSelect={(selectedItem, index) => {
                        window.location_state = selectedItem;
                      }}
                      defaultButtonText={'İlçe Seçiniz'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialCommunityIcons
                            name={isOpened ? 'arrow-up' : 'arrow-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      disabled={this.state.selectedDisabled}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </View>
                  <View style={styles.View3_2}>
                    <Text style={styles.textStandart}>Araç Lastik Ebatı</Text>
                    <TextInput
                      placeholder=" Örn. 205 55 R16"
                      placeholderTextColor="#808080"
                      style={styles.mailInput}
                      textContentType="name"
                      onChangeText={e => (window.tire_sizes = e)}
                      value={window.tire_sizes}
                    />
                  </View>
                  <View style={styles.View4_2}>
                    <Text style={styles.textStandart}>Araç Lastik Tipi</Text>
                    <SelectDropdown
                      data={carTireType}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        if (selectedItem === 'Yazlık') {
                          window.tire_type = 'SUMMER';
                        } else if (selectedItem === 'Kışlık') {
                          window.tire_type = 'WINTER';
                        } else if (selectedItem === '4 Mevsim') {
                          window.tire_type = 'ALL_SEASON';
                        }
                      }}
                      defaultButtonText={'Lütfen Seçim Yapınız'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialCommunityIcons
                            name={isOpened ? 'arrow-up' : 'arrow-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </View>
                  <View style={styles.View5_2}>
                    <Text style={styles.textStandart}>
                      Araç teslimat VAL-E hizmeti ister misiniz?
                    </Text>
                    <SelectDropdown
                      data={carStateType}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        if (selectedItem === 'Evet İstiyorum') {
                          window.valet_service = 1;
                        } else if (selectedItem === 'Hayır İstemiyorum') {
                          window.valet_service = 0;
                        }
                      }}
                      defaultButtonText={'Lütfen Seçim Yapınız'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <MaterialCommunityIcons
                            name={isOpened ? 'arrow-up' : 'arrow-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </View>
                  <View style={styles.View6_2}>
                    <Text style={styles.textStandart}>Açıklama</Text>
                    <TextInput
                      placeholder="Oluşturacağınız hizmet talebinize dair detaylı açıklama girebilirsiniz."
                      placeholderTextColor="#808080"
                      style={styles.detailInput}
                      textContentType="name"
                      onChangeText={e => this.setState({description: e})}
                      value={this.state.description}
                      multiline={true}
                      numberOfLines={15}
                    />
                  </View>
                  <View style={styles.signUpButtonView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.carNewTireRequestService}>
                      <View style={styles.kayitOlRow}>
                        <Text style={styles.kayitOl}>Hemen Hizmet Al</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </TabView.Item>
          </TabView>
        </ScrollView>
      </>
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
  View0_Head: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginTop: 20,
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
    marginBottom: 48 * 4,
  },
  View4: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View5: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View1_2: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View2_2: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View3_2: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View4_2: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View5_2: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  View6_2: {
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
    height: 100,
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
  button_2: {
    width: width - 60,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#015b7e',
    shadowColor: '#015b7e',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  kayitOl_2: {
    color: '#015b7e',
    fontSize: 15,
    fontFamily: 'Montserrat-ExtraLight',
    fontWeight: 'bold',
    marginTop: 2,
  },
  kayitOlRow_2: {
    height: 45,
    width: width - 40,
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  dropdown1BtnStyle: {
    flex: 1,
    height: 40,
    width: width - 60,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#015b7e',
    margin: 5,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left', fontSize: 12},
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
    borderColor: '#015b7e',
    borderRadius: 5,
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    height: 40,
  },
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left', fontSize: 13},
});
