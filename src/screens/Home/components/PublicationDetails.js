import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../../../components/Icon';
import Publication from './Publication';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import posts_services from '../../../services/posts_services';
import StylesConfiguration from '../../../utils/StylesConfiguration';
import {batch, useDispatch, useSelector} from 'react-redux';
import {doAddPosts} from '../../../utils/reduxLoader';
import {getPost} from '../../../reducers/posts';

export default function PublicationDetails({navigation, route}) {
  const post = route.params.post;
  return <Publication post={post} navigation={navigation} />;

  // const post = useSelector(getPost(route.params.postId));
  //   const [loading, setLoading] = useState(true);
  //   const { top } = useSafeAreaInsets();
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (post) {
  //       setLoading(false);
  //     } else {
  //       posts_services.get(route.params.postId).then((res) => {
  //         batch(doAddPosts(res.data, dispatch));
  //         setLoading(false);
  //       });
  //     }
  //   }, []);

  //   return loading ? (
  //     <SafeAreaView style={styles.loadingContainer}>
  //       <ActivityIndicator size="small" color={StylesConfiguration.color} />
  //     </SafeAreaView>
  //   ) : (
  //     <SafeAreaView style={styles.container}>
  //       <Publication postId={route.params.postId} navigation={navigation} showFullContent={true} />
  //       <View style={{ position: 'absolute', margin: 10, paddingTop: top }}>
  //         <Icon source={'boton_volver_atras'} onPress={() => navigation.goBack()} />
  //       </View>
  //     </SafeAreaView>
  //   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
