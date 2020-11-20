import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import GoBackButton from '../../../components/GoBackButton';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import { useSelector } from 'react-redux';
import { getLoggedUserVips } from '../../../reducers/loggedUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import Vip from '../components/Vip';

export default ({navigation}) => {
  const loggedFollowers = useSelector(getLoggedUserVips);

  const VipItem = ({item}) => <Vip vip={item} navigation={navigation} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <GoBackButton navigation={navigation} />
        <Text style={styles.titulo}>V.I.P.</Text>
        <View style={styles.placeholder} />
      </View>
      <FlatList
        style={styles.list}
        data={loggedFollowers}
        renderItem={VipItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>

    // <View style={styles.container}>
    //   <View style={{flexDirection: 'row'}}>
    //     <GoBackButton navigation={navigation} _styles={styles.goBack} />
    //   </View>

    //   <ScrollView>
    //     <View style={{flexDirection: 'row'}}>
    //       <Text style={styles.titulo}>V.I.P</Text>
    //     </View>

    //     {data.map((item) => {
    //       return (
    //         <View style={{flexDirection: 'row', paddingHorizontal: 10, marginBottom: 10}}>
    //           <FormImageIcon
    //             _styles={styles.iconProfile}
    //             source={require('../../../assets/foto_perfil.png')}
    //           />
    //           <Text style={styles.NameProfile}>@{item.name}</Text>

    //           <View
    //             style={{
    //               flex: 1,
    //               alignItems: 'flex-end',
    //               justifyContent: 'center',
    //             }}>
    //             <FormButton style={{marginTop: 0}} buttonTitle="Enviar" />
    //           </View>
    //         </View>
    //       );
    //     })}
    //   </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  iconProfile: {
    width: 50,
    height: 50,
  },
  goBack: {
    marginHorizontal: 10,
    marginVertical: 5,
  },

  titulo: {
    fontFamily: StylesConfiguration.fontFamily,
    color: StylesConfiguration.color,
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 10,
  },

  NameProfile: {
    fontFamily: StylesConfiguration.fontFamily,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
