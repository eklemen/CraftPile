import { Box, Skeleton } from 'native-base';

interface Props {
  numberOfItems?: number;
  isLoaded: boolean;
}

function ImageGridSkeleton({ numberOfItems = 4, isLoaded }: Props) {
  return (
    <Box flexWrap="wrap" flexDirection="row">
      {Array(numberOfItems)
        .fill(0)
        .map((_, i) => (
          <Skeleton
            mx="auto"
            key={i}
            w="49%"
            h={160}
            px={1}
            pb={2}
            isLoaded={isLoaded}
          />
        ))}
    </Box>
  );
}

export default ImageGridSkeleton;
