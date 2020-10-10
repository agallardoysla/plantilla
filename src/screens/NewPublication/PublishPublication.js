import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video-player';
import FormButton from '../../components/FormButton';
import MatInput from '../../components/MatInput';
import {FeedContext} from '../../navigation/FeedContext';
import files_services from '../../services/files_services';
import posts_services from '../../services/posts_services';
import StylesConfiguration from '../../utils/StylesConfiguration';

let window = Dimensions.get('window');

export default function PublishPublication({route}) {
  const {setPosts} = useContext(FeedContext);
  const [challengeText, setChallengeText] = useState('');
  const [publishing, setPublishing] = useState(false);
  const {images, setImages, video, setVideo, navigation} = route.params;

  useEffect(() => {
    console.log('Cargado:', images, video);
  });

  const doPubliish = async () => {
    setPublishing(true);
    var re = /(?:\.([^.]+))?$/;
    let paths = images.length > 0 ? images : [video];
    paths = paths.map((p) => {
      return {
        url: p,
        ext: re.exec(p)[1],
      };
    });

    const filesIds = await Promise.all(
      paths.map(async (file) => {
        const result = await files_services.create(file.url, file.ext);
        return await result.json().id;
      }),
    );

    console.log(filesIds);

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

      await posts_services.create(newPost);
      posts_services.list(0).then((res) => {
        setImages([]);
        setVideo('');
        setChallengeText('');
        setPublishing(false);
        setPosts(res.data);
        navigation.navigate('HomeGroup');
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!publishing ? (
        <ScrollView>
          <View style={styles.container}>
            {video === '' ? (
              <View
                style={
                  images.length > 0 || video !== ''
                    ? [styles.fullRow, styles.fullRowContinuous]
                    : styles.limitedScrollView
                }>
                <ScrollView horizontal={true} indicatorStyle="white">
                  {images.map((image, i) => (
                    <Image source={{uri: image}} style={styles.image} key={i} />
                  ))}
                </ScrollView>
              </View>
            ) : null}
            {video !== '' ? (
              <View style={styles.fullRow}>
                <Video
                  video={{uri: video}}
                  style={styles.backgroundVideo}
                  autoplay={true}
                  defaultMuted={true}
                  loop={true}
                />
              </View>
            ) : null}

            <View style={styles.fullRow}>
              <Text style={styles.text_description}>DESCRIPCIÓN DEL RETO</Text>
            </View>
            <View style={styles.fullRow}>
              <MatInput
                value={challengeText}
                label=""
                onChangeText={setChallengeText}
                containerStyle={styles.input}
                multiline={true}
                textAlignVertical={true}
                numberOfLines={4}
                fontSize={18}
                labelFontSize={18}
              />
            </View>
            {images.length > 0 || video !== '' ? (
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
    </SafeAreaView>
  );
}

//configuraciones de estilos y aliniamientos de cada componente
const styles = StyleSheet.create({
  //contenedor general
  container: {
    flex: 1,
    flexDirection: 'column',
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
