import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import {CONSTANT} from '../../constant/Constant';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'Kolay Garaj uygulaması nedir ? ',
    content:
      'Kolay Garaj uygulaması, arabalarınıza, motorlarınıza veya taşıtlarınıza dair ihtiyaç duyulacak hizmetler için, kolayca teklif almanızı, teklif veren hizmet sağlayıcısının performans puanlarını görüntülemenizi ve teklifler arasından size en uygununu seçmenize olanak sağlamayı amaçlamaktadır. Uygulama kapsamında binlerce hizmet sağlayıcı, tek tıkla anında erişilebilir olacaktır. Fiyatların ve performans puanlarının şeffaf bir şekilde gösterilmesiyle de, en doğru hizmet sağlayıcıya erişimizi sağlayacaktır.',
  },
  {
    title: 'Üyelik şartları nedir ?',
    content:
      'Üyelik için herhangi bir şartımız bulunmamakla birlikte, arabasını önemseyenlerin Kolay Garaj ile tanışmasını bekliyoruz :)',
  },
  {
    title: 'Nasıl üye olurum ?',
    content:
      'AppStore veya GoogleStore üzerinden indireceğiniz, Kolay Garaj uygulaması üzerinden, tanımlayıcı bilgilerinizi girerek üye olabilirsiniz. Üyelik işlemleri ve teklif süreçleri boyunca, hiçbir hizmet bedeli ödemeden, tekliflerin tadını çıkarabilirsiniz.',
  },
  {
    title: 'Bana Özel Hizmet/Kampanya Paketi nedir ?',
    content:
      'Kurumsal kullanıcılar, Hizmetler menüsü üzerinden kendi firmaları/işleri üzerine Kampanya Paketleri veya Kendine Özel Hizmet eklemeleri yaparak fiyat listeleri oluşturabilir.',
  },
];
export class IndividualUserHelp extends Component {
  constructor() {
    super();
    this.navigateIndividual = this.navigateIndividual.bind(this);
    this.navigateCommercial = this.navigateCommercial.bind(this);
  }

  state = {
    activeSections: [],
  };

  async componentDidMount() {}

  navigateIndividual() {
    const {navigation} = this.props;

    navigation.navigate('SignUpIndividual');
  }

  navigateCommercial() {
    const {navigation} = this.props;

    navigation.navigate('SignUpCommercial');
  }

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/iconPng/question.png')}
          style={{
            width: 30,
            height: 30,
          }}
        />
        <Text style={styles.headerPage}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text style={styles.textPage}>{section.content}</Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Accordion
          sections={SECTIONS}
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </ScrollView>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  headerPage: {
    color: 'rgb(14,68,145)',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    margin: 15,
  },
  textPage: {
    color: 'rgb(38,38,38)',
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    margin: 15,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ffffff',
    width: width,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
