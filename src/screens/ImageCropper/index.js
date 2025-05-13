import { 
  Button, Modal, StyleSheet, Text, TouchableOpacity, View, Image 
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Slider from '@react-native-community/slider';
import { PermissionsAndroid, Platform } from 'react-native';
import ViewShot from 'react-native-view-shot'; // Capture transformed image
import SvgRight from '../../assets/svg/SvgRight';

const ImageModal = () => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null); // Stores final image after transform
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const viewShotRef = useRef(); // Capture ref

  // Request permissions on Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissions();
    }
  }, []);

  async function requestPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your gallery to select images.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Gallery permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  function handleClick() {
    ImagePicker.openPicker({
      cropping: false, // Disable cropping
    }).then(img => {
      console.log('Selected Image Path:', img.path);
      setImage(img.path);
      setVisible(true); // Open modal directly with image
    }).catch(error => {
      console.log('Image selection canceled:', error);
    });
  }

  const handleRotate90 = () => {
    setRotation((prevRotation) => (prevRotation - 90) % 360);
  };

  const handleRotateMinus90 = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleSaveImage = async () => {
    if (viewShotRef.current) {
      try {
        const uri = await viewShotRef.current.capture(); // Capture the transformed image
        console.log("Final Image URI:", uri);
        setProcessedImage(uri); // Save the transformed image
        setVisible(false);
      } catch (error) {
        console.log("Error capturing image:", error);
      }
    }
  };

  return (
    <View style={styles.viewFlex}>
      <TouchableOpacity>
        <Button title="Select Image" onPress={handleClick} />
      </TouchableOpacity>

      {/* Show the final processed image after modal closes */}
      {processedImage && (
        <Image
          source={{ uri: processedImage }}
          style={styles.previewImage}
          resizeMode="cover"
        />
      )}

      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            {/* Capture view for transformed image */}
            <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1.0 }}>
              <View style={styles.imageContainer}>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={[
                      styles.modalImage,
                      { transform: [{ scale: zoom }, { rotate: `${rotation}deg` }] }
                    ]}
                    resizeMode="cover"
                  />
                )}
              </View>
            </ViewShot>

            {/* Controls for Zoom & Rotate */}
            <View style={styles.controlsContainer}>
              <View style={styles.sliderWrapper}>
                <Text style={styles.sliderLabel}>Zoom</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={3}
                  value={zoom}
                  onValueChange={setZoom}
                  step={0.01}
                  minimumTrackTintColor="rgba(255, 178, 88, 1)" 
                  maximumTrackTintColor="rgba(26, 178, 255, 1)"
                  thumbTintColor="black"
                />
                <Text style={styles.valueText}>{zoom.toFixed(1)}x</Text>
              </View>

              {/* Rotate Buttons */}
              <View style={styles.rotateWrapper}>
                <Text style={styles.sliderLabel}>Rotate</Text>
                <View style={styles.rotateButtonsContainer}>
                  <TouchableOpacity onPress={handleRotateMinus90}>
                    <Text style={styles.rotateButtonText}> ← </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleRotate90}>
                    <Text style={styles.rotateButtonText}>
                      <SvgRight height={40} width={40} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Save and Close */}
            <Button title="Choose" onPress={handleSaveImage} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  viewFlex: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sliderWrapper: {
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  rotateWrapper: {
    alignItems: 'center',
    marginLeft: 10,
  },
  rotateButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  rotateButtonText: {
    color: 'black',
    fontSize: 24,
  },
  slider: {
    width: '80%',
    height: 40,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  valueText: {
    marginTop: 5,
    fontSize: 14,
  },
});
