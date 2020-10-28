import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import users_services from '../../../services/users_services';
import CommentFormatter from '../../../utils/CommentFormatter';

export default function NewPostInput({
  newComment,
  setNewComment,
  style,
  setPublishing,
}) {
  const [showSugestions, setShowSugestions] = useState(false);
  const [sugestionsInput, setSugestionsInput] = useState('');
  const [sugestionsAsync, setSugestionsAsync] = useState([]);
  const maxSugestions = 5;

  useEffect(() => {
    getMentionsSugestionsAsync();
  }, [getMentionsSugestionsAsync, sugestionsInput]);

  const getMentionsSugestionsAsync = useCallback(async () => {
    if (sugestionsInput.length > 0) {
      const context = await users_services.getContext({
        search: sugestionsInput.toLowerCase(),
        exclude: [],
        limit: maxSugestions,
      });
      // console.log(context.data);
      context.data = context.data.map(d => {
        return {
          user_id: d.id,
          ...d,
        };
      });
      setSugestionsAsync(
        sugestionsInput.length > 0
          ? context.data.filter(
              (s) =>
                s.display_name
                  .slice(0, sugestionsInput.length)
                  .toLowerCase() === sugestionsInput.toLowerCase(),
            )
          : [],
      );
    }
  }, [sugestionsInput]);

  const selectSugestion = (sugestion) => {
    console.log(sugestion);
    setNewComment(
      newComment
        .slice(0, -(sugestionsInput.length + 1))
        .concat(`[${sugestion.display_name}:${sugestion.user_id}] `)
    );
    setShowSugestions(false);
  };

  const Mention = ({sugestion, key}) => (
    <TouchableOpacity
      key={key}
      onPress={() => selectSugestion(sugestion)}
      activeOpacity={0.4}
      style={styles.sugestionContainer}>
      <Image
        source={require('../../../assets/foto.png')}
        style={styles.icon_profile}
      />
      <Text style={styles.sugestion}>@{sugestion.display_name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {showSugestions ? (
        <View style={[styles.sugestions, styles.sugestionsPositionComment]}>
          {sugestionsAsync.map((sugestion, i) => (
            <Mention sugestion={sugestion} key={i} />
          ))}
        </View>
      ) : null}
      <TextInput
        style={[styles.newComment, style]}
        onChangeText={setNewComment}
        placeholder={''}
        placeholderTextColor={'white'}
        multiline={true}>
        <CommentFormatter
          comment={newComment}
          isInput={true}
          setShowSugestions={setShowSugestions}
          setSugestionsInput={setSugestionsInput}
        />
      </TextInput>
    </>
  );
}

const styles = StyleSheet.create({
  sugestions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'white',
    backgroundColor: 'black',
    position: 'absolute',
  },
  sugestionsPositionComment: {
    bottom: 70,
    marginLeft: 30,
  },
  sugestionsPositionAnswer: {
    bottom: 50,
    marginLeft: 70,
  },
  sugestionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'black',
    paddingHorizontal: 10,
  },
  sugestion: {
    color: 'white',
  },
  icon_profile: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 400 / 2,
  },
  newComment: {
    color: 'white',
    // fontFamily: StylesConfiguration.fontFamily,
    fontSize: 12,
    backgroundColor: '#50555C',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
  },
});
