/** Imports escenciales para la clase. */
import React from 'react';
import { View, Image, Pressable, Text, StyleSheet } from 'react-native';
import StylesConfiguration from '../../../utils/StylesConfiguration';

/** Declaracion de las Props. */
interface SearchedProfileItemProps {
  /** [onShare]: Funcion para compartir el post */
  onShare: (info: number) => void;
  /** [user]: Informacion del usuario */
  user: any;
}

/** 
*[SearchedProfileItem]: Descripcion de la Clase. 
*/
const SearchedProfileItem = ({ onShare, user }: SearchedProfileItemProps) => {
  return (
    <View style={styles.user}>
      <Image
        source={user.image ? { uri: user.image } : require('../../../assets/pride-dog_1.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.userName}>{user.display_name.slice(0, 20)}</Text>
      <Pressable
        style={styles.sendMessage}
        onPress={() => onShare(user.id)}>
        <Image
          source={require('../../../assets/sobre_amarillo_1.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </Pressable>
    </View>
  )
}

/** Exportamos el componente. */
export default SearchedProfileItem;

/** Estilos del componente */
const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  userName: {
    color: StylesConfiguration.color,
  },
  image: {
    marginHorizontal: 10,
  },
  sendMessage: {
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
})