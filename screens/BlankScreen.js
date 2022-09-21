import React from 'react';
import {
  ButtonSolid,
  ScreenContainer,
  Swiper,
  SwiperItem,
  withTheme,
} from '@draftbit/ui';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';

const BlankScreen = props => {
  const { theme } = props;

  const [Name, setName] = React.useState('Draftbit');
  const [showModal, setShowModal] = React.useState(false);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* Header */}
      <Text style={[styles.Textfc95c443, { color: theme.colors.strong }]}>
        {props.route?.params?.greeting ?? 'Hi'} {Name}
      </Text>
      <Modal visible={showModal} animationType={'none'} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonSolid6f6d9f4b: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center',
  },
  Imagee65b0c4c: {
    height: 250,
    width: 250,
  },
  Swiper4f06a827: {
    height: 300,
    width: '100%',
  },
  Textfc95c443: {
    alignSelf: 'center',
    fontFamily: 'ABeeZee_400Regular',
  },
});

export default withTheme(BlankScreen);
