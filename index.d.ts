declare module 'react-native-auto-scale-image' {
  import { ImageProps } from 'react-native'

  interface Props extends Omit<ImageProps, 'source'> {
    uri: string;
  }

  const AutoScaleImage: React.FC<Props>
  export default AutoScaleImage
}