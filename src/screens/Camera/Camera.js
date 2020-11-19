import React, { useState } from 'react';
import { Dimensions, StyleSheet, Modal, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import Gallery from './components/Gallery';
import TakePicture from './components/TakePicture';
import LinkButtom from '../../components/LinkButtom';
import FilledButton from '../../components/FilledButton';

const { width } = Dimensions.get('window');

export default function Camera({ navigation, maxImages, maxDuration, canGetVideo, callback }) {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [assetType, setAssetType] = useState('Photos');
  const [showModal, setShowModal] = useState(false);

  const canPublish = () => {
    return images.length || video;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true}
        visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¿Estas seguro de dejar de publicar?</Text>
            <FilledButton buttonTitle={'Aceptar'} onPress={() => navigation.goBack()}></FilledButton>
            <LinkButtom buttonTitle={'Cancelar'} onPress={() => setShowModal(false)}></LinkButtom>
          </View>
        </View>
      </Modal>
      <Swiper
        showsButtons={true}
        index={0}
        loop={false}
        showsPagination={false}>
        <TakePicture
          style={styles.view}
          navigation={navigation}
          maxDuration={maxDuration}
          maxImages={maxImages}
          images={images}
          setImages={setImages}
          video={null}
          setVideo={setVideo}
          canPublish={canPublish}
          assetType={assetType}
          setAssetType={setAssetType}
          canGetVideo={canGetVideo}
          callback={callback}
          goBack={() => setShowModal(true)}
        />
        <Gallery
          style={styles.view}
          maxImages={maxImages}
          images={images}
          setImages={setImages}
          navigation={navigation}
          video={video}
          setVideo={setVideo}
          canPublish={canPublish}
          assetType={assetType}
          setAssetType={setAssetType}
          canGetVideo={canGetVideo}
          callback={callback}
          goBack={() => setShowModal(true)}
        />
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'stretch',
  },
  view: {
    width: width,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgb(233, 252, 100)',
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  }
});
