/** Imports escenciales para la clase. */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/** Declaracion de las Props. */
interface AdMobProps {

}

/** 
*[AdMob]: Descripcion de la Clase. 
*/
const AdMob = ({ }: AdMobProps) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, }}>ADMOB</Text>
    </View>
  )
}

/** Exportamos el componente. */
export default AdMob;

/** Estilos del componente */
const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    backgroundColor: '#FFE500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  }
})