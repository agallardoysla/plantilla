import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#101010',
  },
});

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);

  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  }

  render() {
    const {
      thumbnailSource,
      source,
      style,
      onPress,
      ...props
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onPress} on>
      <View style={{...styles.container}} useNativeDriver={true}>
        <Animated.Image
          {...props}
          source={thumbnailSource}
          style={[style, { opacity: this.thumbnailAnimated }]}
          onLoad={this.handleThumbnailLoad}
          blurRadius={1}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
        />
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ProgressiveImage;