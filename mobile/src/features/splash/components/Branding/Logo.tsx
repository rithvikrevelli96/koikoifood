import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LeafWreathIllustration, TiffinLogo } from '../../illustrations';

interface LogoProps {
  backgroundColor: string;
  onLongPress?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ backgroundColor, onLongPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={__DEV__ ? 0.9 : 1}
      disabled={!__DEV__}
      onLongPress={onLongPress}
      delayLongPress={3000}
    >
      <View style={styles.iconWreathFrame}>
        <View style={styles.wreathAbsolute}>
          <LeafWreathIllustration />
        </View>
        <View style={[styles.orangeCircle, { backgroundColor }]}>
          <TiffinLogo />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWreathFrame: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  wreathAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1.8,
    borderColor: '#C96B3C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
