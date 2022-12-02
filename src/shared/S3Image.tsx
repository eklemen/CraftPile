import React, { useEffect } from 'react';
import Storage from '@aws-amplify/storage';
import { Skeleton } from 'native-base';
import { Image } from 'react-native-expo-image-cache';
import useCompData from '../context/compData/useCompData';
import { CACHED_URLS, CachedUrlsCD } from '../context/constants';

interface Props {
  s3Key: string;
  s3LocalKey?: string;
  [key: string]: any;
  style?: Record<string, unknown>;
}

function S3Image({ s3Key, w = 200, h = 200, style, ...rest }: Props) {
  const { compData: cachedPhotos, setData: setCachedPhoto } =
    useCompData<CachedUrlsCD>(CACHED_URLS);
  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await Storage.get(s3Key, {
          contentType: 'image/jpeg',
        });
        setCachedPhoto({ [s3Key]: res });
      } catch (err) {
        console.log('err-------->', err);
      }
    };
    if (!cachedPhotos[s3Key]) {
      getImage();
    }
  }, []);
  if (!cachedPhotos[s3Key]) return <Skeleton w={w} h={h} />;
  return (
    <Image
      uri={cachedPhotos[s3Key]}
      style={[
        {
          resizeMode: 'contain',
          width: w,
          height: h,
        },
        style,
      ]}
      {...rest}
    />
  );
}

export default S3Image;
