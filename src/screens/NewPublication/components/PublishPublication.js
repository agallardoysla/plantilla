import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video-player';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import FormButton from '../../../components/FormButton';
import files_services from '../../../services/files_services';
import posts_services from '../../../services/posts_services';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import NewPostInput from './NewPostInput';
import { setPosts } from '../../../reducers/posts';
import Icon from '../../../components/Icon';
import KBView from '../../../components/KBView';

let window = Dimensions.get('window');

export default function PublishPublication({ route }) {
  const [challengeText, setChallengeText] = useState('');
  const [publishing, setPublishing] = useState(false);
  const { images, setImages, video, setVideo, navigation } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('[CARGANDO]:', images, video);
  }, []);

  const doPubliish = async () => {
    try {
      let paths = images.length > 0 ? images : [video];
      const filesIds = []
      setPublishing(true);
      for(let i = 0; i < paths.length; i++){
        let file = paths[i];
        const result = await files_services.createPost(file.uri, file.ext);
        result = await result.json();
        filesIds.push(result.id);
        console.log(i , "Count", paths.length);
      }
      
      if (filesIds.length > 0) {
        const newPost = {
          post_type: 1,
          latitude: 'latitude',
          longitude: 'longitude',
          files: filesIds,
        };
        if (challengeText.length > 0) {
          newPost.text = challengeText;
        }
        
        await posts_services.create(newPost)
        
        // let res = await posts_services.list(20, 0)
        setImages([]);
        setVideo(null);
        setChallengeText('');
        // dispatch(setPosts(res.data),dispatch);
        navigation.navigate('HomeGroup')
      }
      setPublishing(false);
    } catch (error) {
      setPublishing(false);
    }
    

  };

  return (
    <KBView style={styles.container}>
      <View style={{ margin: 10 }}>
        <Icon source={'boton_volver_atras'} onPress={() => navigation.goBack()} />
      </View>
      {!publishing ? (
        <ScrollView>
          <View style={styles.container}>
            {/* {video === '' ? ( */}
            {video === null ? (
              <View
                style={
                  // images.length > 0 || video.uri !== ''
                  images.length > 0 || video !== null
                    ? [styles.fullRow, styles.fullRowContinuous]
                    : styles.limitedScrollView
                }>
                <ScrollView horizontal={true} indicatorStyle="white">
                  {images.map((image, i) => (
                    <Image
                      source={{ uri: image.uri }}
                      style={styles.image}
                      key={i}
                    />
                  ))}
                </ScrollView>
              </View>
            ) : null}
            {/* {video !== '' ? ( */}
            {video !== null ? (
              <View style={styles.fullRow}>
                <Video
                  video={{ uri: video.uri }}
                  style={styles.backgroundVideo}
                  autoplay={true}
                  defaultMuted={true}
                  loop={true}
                />
              </View>
            ) : null}

            <View style={styles.fullRow}>
              <Text style={styles.text_description}>DESCRIPCIÓN</Text>
            </View>
            <View style={styles.fullRow}>
              <NewPostInput
                newComment={challengeText}
                setNewComment={setChallengeText}
                style={styles.input}
              />
            </View>
            {/* {images.length > 0 || video !== '' ? ( */}
            {images.length > 0 || video !== null ? (
              <View style={styles.fullRow}>
                <FormButton
                  style={styles.publishButton}
                  buttonTitle="PUBLICAR"
                  onPress={doPubliish}
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
      ) : (
          <View style={styles.container}>
            <Text style={styles.publishing}>Publicando...</Text>
            <ActivityIndicator size="large" color={StylesConfiguration.color} />
          </View>
        )}
    </KBView>
  );
}

//configuraciones de estilos y aliniamientos de cada componente
const styles = StyleSheet.create({
  //contenedor general
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },

  fullRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  limitedScrollView: {
    width: 100,
    height: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  //titulo
  text_title: {
    fontSize: 20,
    color: StylesConfiguration.color,
    marginVertical: 10,
  },

  //grupo de botones
  fullRowContinuous: {
    paddingRight: 0,
  },
  columnButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    width: 100,
    marginHorizontal: 5,
  },
  publishButton: {
    marginBottom: 20,
  },
  //texto de descripcion
  text_description: {
    fontSize: 18,
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    paddingVertical: 15,
  },
  input: {
    width: 250,
    height: 80,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: -10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  loadPhotoButton: {
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: StylesConfiguration.color,
    borderStyle: 'dashed',
  },
  loadNewPhotoButton: {
    width: window.width - 20,
    height: (window.width - 20) * 1.4,
  },
  loadPhoto: {
    color: StylesConfiguration.color,
    fontSize: 40,
  },
  image: {
    width: window.width - 20,
    height: (window.width - 20) * 1.4,
    marginRight: 10,
  },
  backgroundVideo: {
    width: window.width - 20,
    height: (window.width - 20) * 1.4,
  },
  publishing: {
    color: StylesConfiguration.color,
    fontFamily: StylesConfiguration.fontFamily,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
});
