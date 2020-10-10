/** Imports escenciales para la clase. */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import moment from 'moment';

/** Declaracion de las Props. */
interface DatePickerModalProps {
  /** [showDatePicker]:  Variable para determinar si se muestra el picker con el modal. */
  showDatePicker?: boolean;
  /** [onBackdropPress]: Funcion para ocultar el modal presionando fuera del picker. */
  onBack?: () => void;
  /** [date]: Variable para setear una fecha default */
  date: Date;
  /** [onDateChange]: Funcion para retornar la fecha seleccionada */
  onChange: (info: string) => void;
  /** [mode]: Tipo de informacion a mostrar en el picker. */
  mode?: 'date' | 'datetime' | 'time';
  /** [format]: Formato en el que se retornara la Fecha. */
  format?: string;
  /** [maximumDate]: Variable para setear la fecha maxima que abarca el picker */
  maximumDate?: Date;
}

/**
 *[DatePicker]: Componente para seleccionar la fecha deseada.
 */
const DatePickerModal = ({
  showDatePicker = false,
  onBack,
  date,
  onChange,
  mode = 'date',
  format = 'DD-MM-YYYY',
  maximumDate,
}: DatePickerModalProps) => {
  const maxDate = moment(
    moment(maximumDate).format(`${moment().daysInMonth()}-MM-YYYY`),
    'DD-MM-YYYY',
  );
  const maxDateObj = new Date(maxDate.year(), maxDate.month(), maxDate.date());

  return (
    <Modal
      onBackdropPress={onBack}
      isVisible={showDatePicker}
      style={styles.modal}>
      <View style={styles.pickerContainer}>
        <DatePicker
          date={date}
          mode={mode}
          onDateChange={onChange}
          format={format}
          maximumDate={maxDateObj}
        />
      </View>
    </Modal>
  );
};

/** Exportamos el componente. */
export default DatePickerModal;

/** Estilos del componente */
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  pickerContainer: {
    backgroundColor: 'white',
    width: '80%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
  },
});
