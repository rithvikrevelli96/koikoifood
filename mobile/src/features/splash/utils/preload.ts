import { Image } from 'react-native';

/**
 * Preloads a local bundled asset to prevent flickering on load.
 * @param assetId The required module identifier (e.g., require('path/to/image.png'))
 */
export async function preloadLocalAsset(assetId: any): Promise<void> {
  try {
    const source = Image.resolveAssetSource(assetId);
    if (source && source.uri) {
      await Image.prefetch(source.uri);
    }
  } catch (error) {
    console.warn('Failed to preload local asset:', error);
  }
}
