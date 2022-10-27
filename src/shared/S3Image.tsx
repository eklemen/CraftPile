import { useEffect, useState } from 'react';
import Storage from '@aws-amplify/storage';
import { Image, Skeleton, Box } from 'native-base';

interface Props {
  s3Key: string;
}

function S3Image({ s3Key }: Props) {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  useEffect(() => {
    const getImage = async () => {
      const res = await Storage.get(s3Key, {
        contentType: 'image/jpeg',
      });
      setImageUrl(res);
    };
    getImage();
  }, []);
  if (!imageUrl) return <Skeleton w={160} h={160} />;
  return (
    <Image
      source={{
        uri: imageUrl,
      }}
      w={200}
      h={200}
      alt={'un-described image'}
      resizeMode="cover"
    />
  );
}

export default S3Image;
