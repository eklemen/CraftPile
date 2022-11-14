import { useEffect, useState } from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import Storage from '@aws-amplify/storage';
import { Image, Skeleton, Box } from 'native-base';
import { CACHED_IMAGE_URIS, CachedImageUrisCD } from '../context/constants';
import useCompData from '../context/compData/useCompData';

interface Props {
  s3Key: string;
  s3LocalKey: string;
  [key: string]: any;
}

function S3Image({ s3Key, w = 200, h = 200, ...rest }: Props) {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { setData } = useCompData<CachedImageUrisCD>(CACHED_IMAGE_URIS);
  useEffect(() => {
    const getImage = async () => {
      const res = await Storage.get(s3Key, {
        contentType: 'image/jpeg',
      });
      setImageUrl(res);
      setData({ [s3Key]: { uri: res } });
    };
    if (imageUrl !== s3Key) {
      getImage();
    }
  }, [s3Key]);
  if (!imageUrl) return <Skeleton w={160} h={160} />;
  return (
    <Image
      source={{
        uri: imageUrl,
      }}
      alt={'un-described image'}
      resizeMode="cover"
      w={Dimensions.get('window').width}
      h={Dimensions.get('window').height}
      style={{
        width: '100%',
        height: '100%',
      }}
      {...rest}
    />
  );
}

export default S3Image;
