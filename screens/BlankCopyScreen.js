import React from 'react';
import * as DemoServiceApi from '../apis/DemoServiceApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import { IconButton, ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const BlankCopyScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const helloWorld = () => {
    console.log('Hello World');
  };

  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <IconButton
        onPress={() => {
          try {
            navigation.navigate('BlankScreen', { greeting: 'Hello' });
            helloWorld();
          } catch (err) {
            console.error(err);
          }
        }}
        size={32}
        icon={'AntDesign/stepforward'}
        color={theme.colors.custom_rgb71_57_186}
      />
      <Utils.CustomCodeErrorBoundary>
        <CustomCode.App />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Fetch431eb058: {
    minHeight: 40,
  },
  FlatListc992f941Content: {
    flex: 1,
  },
  Imagee65b0c4c: {
    height: 250,
    width: 250,
  },
  Viewd8fb5662: {
    marginBottom: 16,
  },
});

export default withTheme(BlankCopyScreen);
