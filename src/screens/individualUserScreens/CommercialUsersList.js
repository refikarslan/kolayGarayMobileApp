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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANT} from '../../constant/Constant';
import RadioButtonRN from 'radio-buttons-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import SelectDropdown from 'react-native-select-dropdown';
import {Rating, AirbnbRating} from 'react-native-ratings';

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

export class CommercialUsersList extends Component {
  constructor() {
    super();
  }

  state = {
    response: null,
    firmList: [],
    spinner: false,
    selectedİlce: [],
    selectedDisabled: true,
  };

  async componentDidMount() {
    this.setState({
      spinner: !this.state.spinner,
    });

    let dataQuery = {
      category: window.commercialCategoryId,
      location_city: window.selectedCity,
      location_state: window.selectedState,
    };
    await fetch(
      CONSTANT.baseUrl +
        `user/commercial?category=${encodeURIComponent(
          dataQuery.category,
        )}&location_city=${encodeURIComponent(
          dataQuery.location_city,
        )}&location_state=${encodeURIComponent(dataQuery.location_state)}`,
      {
        method: 'GET',
        dataType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(res => {
        if (res.status !== 'fail') {
          let listData = [];
          res.data.map(node => {
            let obj = {
              id: node.id,
              category: node.category,
              company_name: node.company_name,
              rating: node.rating,
              location_city: node.location_city,
              location_state: node.location_state,
              tax_identity: node.tax_identity,
              tax_location: node.tax_location,
            };
            listData.push(obj);
          });
          window.listD = listData;
          this.setState({
            response: res.data,
            firmList: listData,
            spinner: !this.state.spinner,
          });
        } else {
          Alert.alert(
            'VAL-E',
            'Aradığınız kriterlerde hizmet veren firma bulunmamaktadır.',
            [{text: 'Tamam', onPress: () => null}],
          );
          this.setState({
            spinner: !this.state.spinner,
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({
          spinner: !this.state.spinner,
        });
      });
  }

  onClickProduct(item) {
    let commercialList = [];
    commercialList.push(item.id);
    window.commercialsIdList = commercialList;
    window.commercialsIdFirmName = item.company_name;

    Alert.alert('VAL-E', 'Talep İşlemleri', [
      {
        text: 'Geri',
        onPress: () => {},
      },
      {
        text: 'Talep Oluştur',
        onPress: () => {
          if (item.category === 1) {
            const {navigation} = this.props;
            navigation.navigate('CarTireService');
          } else if (item.category === 2) {
            const {navigation} = this.props;
            navigation.navigate('CarWashService');
          } else if (item.category === 3) {
            const {navigation} = this.props;
            navigation.navigate('CarTowService');
          } else if (item.category === 4) {
            const {navigation} = this.props;
            navigation.navigate('CarRepairService');
          } else if (item.category === 5) {
            const {navigation} = this.props;
            navigation.navigate('CarBatteryService');
          } else if (item.category === 6) {
            const {navigation} = this.props;
            navigation.navigate('CarKeyService');
          } else if (item.category === 7) {
            const {navigation} = this.props;
            navigation.navigate('CarPartsService');
          }
        },
      },
    ]);
  }

  renderMyRequest = ({item, index}) => {
    if (item.category === 1) {
      return (
        <View style={styles.list}>
          <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_1}>
                <Text style={styles.itemText_Bold}>Firma Adı </Text>
                <Text style={styles.itemText}>{item.company_name}</Text>
                <Text style={styles.itemText_Bold}>İl-İlçe </Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_city}
                </Text>
              </View>
              <View style={styles.listChildView_2}>
                <Rating
                  ratingCount={5}
                  imageSize={25}
                  showRating={false}
                  readonly={true}
                  startingValue={item.rating}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 2) {
      return (
        <View style={styles.list}>
          <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_1}>
                <Text style={styles.itemText_Bold}>Firma Adı</Text>
                <Text style={styles.itemText}>{item.company_name}</Text>
                <Text style={styles.itemText_Bold}>İl-İlçe</Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_city}
                </Text>
              </View>
              <View style={styles.listChildView_2}>
                <Rating
                  ratingCount={5}
                  imageSize={25}
                  showRating={false}
                  readonly={true}
                  startingValue={item.rating}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 3) {
      return (
        <View style={styles.list}>
          <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_1}>
                <Text style={styles.itemText_Bold}>Firma Adı</Text>
                <Text style={styles.itemText}>{item.company_name}</Text>
                <Text style={styles.itemText_Bold}>İl-İlçe</Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_city}
                </Text>
              </View>
              <View style={styles.listChildView_2}>
                <Rating
                  ratingCount={5}
                  imageSize={25}
                  showRating={false}
                  readonly={true}
                  startingValue={item.rating}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 4) {
      return (
        <View style={styles.list}>
          <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_1}>
                <Text style={styles.itemText_Bold}>Firma Adı</Text>
                <Text style={styles.itemText}>{item.company_name}</Text>
                <Text style={styles.itemText_Bold}>İl-İlçe</Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_city}
                </Text>
              </View>
              <View style={styles.listChildView_2}>
                <Rating
                  ratingCount={5}
                  imageSize={25}
                  showRating={false}
                  readonly={true}
                  startingValue={item.rating}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 5) {
      return (
        <View style={styles.list}>
          <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_1}>
                <Text style={styles.itemText_Bold}>Firma Adı</Text>
                <Text style={styles.itemText}>{item.company_name}</Text>
                <Text style={styles.itemText_Bold}>İl-İlçe</Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_city}
                </Text>
              </View>
              <View style={styles.listChildView_2}>
                <Rating
                  ratingCount={5}
                  imageSize={25}
                  showRating={false}
                  readonly={true}
                  startingValue={item.rating}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 6) {
      return (
        <View style={styles.list}>
          <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_1}>
                <Text style={styles.itemText_Bold}>Firma Adı</Text>
                <Text style={styles.itemText}>{item.company_name}</Text>
                <Text style={styles.itemText_Bold}>İl-İlçe</Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_city}
                </Text>
              </View>
              <View style={styles.listChildView_2}>
                <Rating
                  ratingCount={5}
                  imageSize={25}
                  showRating={false}
                  readonly={true}
                  startingValue={item.rating}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (item.category === 7) {
      return (
        <View style={styles.list}>
          <TouchableOpacity onPress={this.onClickProduct.bind(this, item)}>
            <View style={styles.listStyle}>
              <View style={styles.listChildView_1}>
                <Text style={styles.itemText_Bold}>Firma Adı</Text>
                <Text style={styles.itemText}>{item.company_name}</Text>
                <Text style={styles.itemText_Bold}>İl-İlçe</Text>
                <Text style={styles.itemText}>
                  {item.location_city + '-' + item.location_city}
                </Text>
              </View>
              <View style={styles.listChildView_2}>
                <Rating
                  ratingCount={5}
                  imageSize={25}
                  showRating={false}
                  readonly={true}
                  startingValue={item.rating}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    let listDatas = this.state.firmList;
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.spinner} color="#1d5cdd" />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '5%',
            marginVertical: '2%',
          }}>
          <SelectDropdown
            data={il}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              window.selectedCity = selectedItem;
              il_ilce.map(node => {
                if (node.il === selectedItem) {
                  this.setState({
                    selectedİlce: node.ilceleri,
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
          <SelectDropdown
            data={this.state.selectedİlce}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              window.selectedState = selectedItem;
              this.componentDidMount();
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
        <View style={{flex: 0.9}}>
          {listDatas.length > 0 ? (
            <FlatList
              data={this.state.firmList}
              renderItem={this.renderMyRequest}
            />
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text style={styles.itemText_Bold}>
                Lütfen İl ve İlçe Seçimi Yapınız
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
  },
  pageHead_text: {
    color: 'rgb(14,68,145)',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    marginTop: 15,
    marginBottom: 15,
  },
  list: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    borderTopColor: 'rgb(14,68,145)',
    borderTopWidth: 0.3,
  },
  listStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 40,
    paddingTop: 20,
  },
  listChildView_1: {
    alignItems: 'flex-start',
    width: (width - 40) / 3,
  },
  listChildView_2: {
    alignItems: 'center',
    width: (width - 40) / 2,
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
  },
  itemText_Bold: {
    fontSize: 13,
    marginBottom: 3,
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    color: 'rgb(14,68,145)',
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
});
