/** Imports escenciales para la clase. */
import React from 'react';
import { View, StyleSheet, Text, TextStyle } from 'react-native';
import moment from 'moment';
import 'moment/locale/es'

/** Declaracion de las Props. */
interface DateProps {
  /** [date]: Fecha a formatear */
  date: string;
  /** [format]: Formato con el que se mostrara la Fecha. */
  format?: string;
  /** [style]:  Estilo para el texto. */
  style?: TextStyle;
}

/** 
 *[Date]: Descripcion de la Clase. 
 */
const DateFormatter = ({ date, format, style }: DateProps) => {

  return (
    <Text style={[styles.container, style]}>{moment(date).fromNow()}</Text>
  )
}

/** Exportamos el componente. */
export default DateFormatter;

/** Estilos del componente */
const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    color: '#979797'
  }
})