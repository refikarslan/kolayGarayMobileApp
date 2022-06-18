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
import RadioButtonRN from 'radio-buttons-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const companyCategory = [
  {
    label: 'OTO ÇEKİCİ-KURTARICI',
    value: 3,
  },
  {
    label: 'OTO JANT-LASTİK',
    value: 1,
  },
  {
    label: 'OTO SERVİS-BAKIM',
    value: 4,
  },
];

export class SignUpCommercial extends Component {
  constructor() {
    super();
    this.signUpService = this.signUpService.bind(this);
    this.signInPageNavigate = this.signInPageNavigate.bind(this);
    this.handleCompanyName = this.handleCompanyName.bind(this);
    this.handleCompanyTaxId = this.handleCompanyTaxId.bind(this);
    this.handleCompanyTaxLocation = this.handleCompanyTaxLocation.bind(this);
    this.handleCompanyCity = this.handleCompanyCity.bind(this);

    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleMail = this.handleMail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePassword_2 = this.handlePassword_2.bind(this);
  }

  state = {
    company_name: '',
    company_category: '',
    tax_identity: '',
    tax_location: '',
    location_city: '',
    location_state: '',
    name: '',
    phone: '',
    mail: '',
    password: '',
    password_2: '',
    response: null,
    spinner: false,
    selectedIlce: [],
    selectedDisabled: true,
  };
  async componentDidMount() {}

  handleCompanyName = text => {
    this.setState({company_name: text});
  };

  handleCompanyTaxId = text => {
    this.setState({tax_identity: text});
  };

  handleCompanyTaxLocation = text => {
    this.setState({tax_location: text});
  };

  handleCompanyCity = text => {
    this.setState({location_city: text});
  };

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
    navigation.navigate('SignInCommercial');
  }

  signUpService() {
    const {navigation} = this.props;
    if (
      this.state.company_name === '' &&
      this.state.name !== '' &&
      this.state.phone !== '' &&
      this.state.mail !== '' &&
      this.state.password !== '' &&
      this.state.password_2 !== ''
    ) {
      Alert.alert('UYARI !', 'Lütfen Firma İsminizi giriniz. ', [
        {text: 'Tamam', onPress: () => null},
      ]);
    } else if (
      this.state.company_name !== '' &&
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
      this.state.company_name !== '' &&
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
      this.state.company_name !== '' &&
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
      this.state.company_name !== '' &&
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
      this.state.company_name !== '' &&
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
      this.state.company_name === '' &&
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
      this.state.company_name !== '' &&
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
          commercial: 1,
          commercialData: {
            company_name: this.state.company_name,
            location_city: this.state.location_city,
            location_state: this.state.location_state,
            tax_identity: this.state.tax_identity,
            tax_location: this.state.tax_location,
            category: this.state.company_category,
          },
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
        [{text: 'Tamam', onPress: () => null}],
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
            <Text style={styles.textStandart}>Hizmet Alanı</Text>
            <RadioButtonRN
              data={companyCategory}
              initial={1}
              activeColor={'#fdd361'}
              deactiveColor={'#cbcaca'}
              boxStyle={{borderRadius: 3}}
              textStyle={{fontSize: 12}}
              selectedBtn={e => this.setState({company_category: e.value})}
              icon={
                <MaterialCommunityIcons
                  name="check-circle"
                  size={25}
                  color="#2c9dd1"
                />
              }
              style={styles.radioGrup}
            />
          </View>
          <View style={styles.View2}>
            <Text style={styles.textStandart}>Firma İsmi</Text>
            <TextInput
              placeholder=" Firma / Mağaza isminizi giriniz."
              placeholderTextColor="#808080"
              style={styles.nameInput}
              textContentType="name"
              onChangeText={this.handleCompanyName}
              value={this.state.company_name}
            />
          </View>
          <View style={styles.View2}>
            <Text style={styles.textStandart}>İl</Text>
            <SelectDropdown
              data={il}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                this.handleCompanyCity(selectedItem);
                il_ilce.map(node => {
                  if (node.il === selectedItem) {
                    this.setState({
                      selectedIlce: node.ilceleri,
                      selectedDisabled: false,
                    });
                  }
                });
              }}
              defaultButtonText={'Hizmet verdiğiniz ili seçiniz.'}
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
                console.log(selectedItem, index);
                this.setState({location_state: selectedItem});
              }}
              defaultButtonText={'Hizmet verdiğiniz ilçeyi seçiniz.'}
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

          <View style={styles.View2}>
            <Text style={styles.textStandart_Black}>Vergi Dairesi</Text>
            <TextInput
              placeholder=" Vergi Dairesi isminizi giriniz."
              placeholderTextColor="#808080"
              style={styles.nameInput}
              textContentType="name"
              onChangeText={this.handleCompanyTaxLocation}
              value={this.state.tax_location}
            />
          </View>
          <View style={styles.View2}>
            <Text style={styles.textStandart_Black}>Vergi Numarası</Text>
            <TextInput
              placeholder=" Vergi Numaranızı giriniz."
              placeholderTextColor="#808080"
              style={styles.nameInput}
              textContentType="name"
              onChangeText={this.handleCompanyTaxId}
              value={this.state.tax_identity}
            />
          </View>
          <View style={styles.View2}>
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
    marginTop: 30,
  },
  View1: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 48 * 3,
  },
  View2: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 8,
  },
  View3: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 8,
  },
  View4: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 8,
  },
  View5: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    marginBottom: 8,
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
  radioGrup: {
    height: 45,
    width: width - 60,
  },
  dropdown1BtnStyle: {
    flex: 1,
    height: 45,
    width: width - 60,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#fdd361',
    margin: 5,
  },
  dropdown1BtnTxtStyle: {
    color: '#000',
    textAlign: 'left',
    fontSize: 14,
    shadowColor: '#fdd361',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3,
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
    borderColor: '#fdd361',
    borderRadius: 5,
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    height: 35,
  },
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left', fontSize: 13},
});
