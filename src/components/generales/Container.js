import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import Cargando from './LoadingContainer';
import {connect} from 'react-redux';

function Container({style, children, isloading = false}) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={[{flex: 1, width: '100%'}, style]}>
        {children}
      </SafeAreaView>
      {isloading && (
        <Cargando
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(52,52,52,0.5)',
            height: '100%',
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
});
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Container);
