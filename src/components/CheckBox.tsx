/** Imports escenciales para la clase. */
import React from 'react';
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  Pressable,
  Image,
} from 'react-native';

/** Declaracion de las Props. */
interface CheckBoxProps {
  /** [value]: Valor para setear el valor del CheckBox */
  value?: boolean;
  /** [onChange]: Propiedad para retornar el nuevo valor a setear. */
  onChange?: () => void;
  /** [onValueChange]: Propiedad para retornar el nuevo valor a setear. */
  onValueChange?: (info: boolean) => void;
  /** [icon]: Variable para recibir el icono a mostrar. */
  icon: ImageSourcePropType;
  /** [style]: Estilo del componente */
  style?: StyleProp<ViewStyle>;
  /** [tintColor]: Variable para setear el color del icono. */
  tintColor?: string;
  /** [onCheckColor]: Variable para setear el color del Componente al estar seleccionado. */
  onCheckColor?: string;
  /** [onUnCheckColor]: Variable para setear el color del Componente al no estar seleccionado. */
  onUnCheckColor?: string;
  /** [size]:  Variable para setear el tamaño del componente */
  size?: number;
}

/**
 *[CheckBox]: CheckBox Component.
 */
const CheckBox = ({
  value = false,
  onChange,
  onValueChange,
  icon = require('../assets/check.png'),
  style = styles.container,
  tintColor = 'black',
  onCheckColor = 'black',
  size = 18,
  onUnCheckColor = 'transparent',
}: CheckBoxProps) => {
  return (
    <Pressable
      onPress={() => {
        // onChange();
        onValueChange(!value);
      }}
      style={[
        style,
        {
          height: size,
          width: size,
          backgroundColor: value ? onCheckColor : onUnCheckColor,
        },
      ]}>
      {value && (
        <Image
          style={{
            resizeMode: 'cover',
            height: size / 2,
            width: size / 2,
            tintColor,
          }}
          source={icon}
        />
      )}
    </Pressable>
  );
};

/** Exportamos el componente. */
export default CheckBox;

/** Estilos del componente */
const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
