import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FormSearchInput from '../../../components/FormSearchInput';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import Icon from '../../../components/Icon';
import {SafeAreaView} from 'react-native-safe-area-context';
import PublicationContent from './PublicationContent';
import PublicationComment from './PublicationComment';

const PostLikes = ({navigation, route}) => {
  const {comments, files_with_urls, commentsCount} = route.params;
  const [search, setSearch] = useState({
    comments,
    searchTerms: '',
  });

  const showPublication = () => {
    navigation.navigate('Home');
  };

  const CommentCard = ({item, index}) => {
    return (
      <PublicationComment
        style={styles.publicationComments}
        comment={item}
        key={index}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.column_back}>
        <TouchableOpacity onPress={showPublication}>
          <Image
            style={styles.boton_back}
            source={require('../../../assets/boton_volver_atras.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.sub_colummn}>
            <Icon source={'comentario'} color="red" size={32} />
            <Text
              style={{
                color: 'white',
              }}>
              {commentsCount}
            </Text>
          </View>

          <View style={styles.sub_colummn}>
            <PublicationContent
              files={files_with_urls}
              showFullContent={true}
              style={{width: 40, height: 80, flex: 1}}
              navigation={navigation}
            />
          </View>
        </View>

        <View style={styles.row}>
          <FormSearchInput
            value={search.searchTerms}
            placeholderText={'Buscar usuarios...'}
            onChange={(e) =>
              setSearch({reactions: filterUsers(e), searchTerms: e})
            }
          />
        </View>

        <FlatList data={search.comments} renderItem={CommentCard} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  column_back: {
    flexDirection: 'column',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    top: 5,
  },
  row_comment: {
    flexDirection: 'column',
    flex: 1,
    flexWrap: 'wrap',
  },
  boton_back: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  sub_colummn: {
    flex: 1,
    alignItems: 'center',
  },
  reactionByFollowerContainer: {
    width: 100,
    backgroundColor: '#E8FC64',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    alignContent: 'center',
    margin: 4,
  },
  reactionByOtherContainer: {
    margin: 4,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#E8FC64',
    alignItems: 'center',
    alignContent: 'center',
  },
  reactionByOther_text: {
    color: 'white',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 400 / 2,
  },

  image_icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    borderRadius: 400 / 2,
  },

  contentView: {
    flexDirection: 'column',
  },
  contentViewIcon: {
    flexDirection: 'row',
    top: 10,
  },
  contentViewAction: {
    flexDirection: 'row',
    marginLeft: 10,
    top: 10,
  },
  style_mensaje_hashtag: {
    color: 'blue',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
  },
  style_mensaje_publicacion: {
    color: 'white',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
    left: 10,
  },

  style_mensaje_respuesta: {
    color: 'white',
    fontWeight: StylesConfiguration.fontWeight,
    fontFamily: StylesConfiguration.fontFamily,
    left: 10,
  },
});

export default PostLikes;
