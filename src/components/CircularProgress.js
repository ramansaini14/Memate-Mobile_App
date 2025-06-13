import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const CircularProgress = () => {
  const fill = 95; // percentage to fill

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={fill}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        // duration={1000} // animation duration
      >
        {/* {fill => (
          <Text style={styles.progressText}>{`${Math.round(fill)}%`}</Text>
        )} */}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  progressText: {
    fontSize: 18,
    color: '#333',
  },
});

export default CircularProgress;
