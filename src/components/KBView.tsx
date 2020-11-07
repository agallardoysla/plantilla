/** Imports escenciales para la clase. */
import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, StyleProp, ViewStyle, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { height, width } = Dimensions.get('window');

/** Declaracion de las Props. */
interface KBViewProps {
  /** [children]: Propiedad del componente para renderizar un childView. */
  children: ReactNode;
  /** [style]:  Estilo de la vista principal */
  style?: StyleProp<ViewStyle>;
  /** [scrollable]:  Variable para determinar si se necesita bloquear el scroll */
  scrollable?: boolean;
}

/** 
*[KBView]: Descripcion de la Clase. 
*/
const KBView = ({ children, style, scrollable = true }: KBViewProps) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      {/* <KeyboardAvoidingView behavior={'height'} style={styles.container}> */}
      <SafeAreaView style={[{ flex: 1, }, style]}>
        <ScrollView scrollEnabled={scrollable} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

/** Exportamos el componente. */
export default KBView;

/** Estilos del componente */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})