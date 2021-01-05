import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';

const LoadingContainer = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Text
        style={[
          {
            alignSelf: 'center',
            color: 'yellow',
          },
          props.tituloStyle,
        ]}>
        {props.titulo !== undefined ? props.titulo : 'Loading'}
      </Text>
      <ActivityIndicator size="large" color={'yellow'} />
      {props.showError && (
        <Text
          style={[
            {
              alignSelf: 'center',
            },
            ,
            props.errorStyle,
          ]}>
          {props.error}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LoadingContainer;
