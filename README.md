React Native Auto Scale Image
=============================

React Native `<Image />` alternative to automatically scale width or height of the Image given only one style, preserving aspect ratio. It takes all the usual props of `<Image />`  component except `uri` instead of `source` (because it only works with URIs for now) and returns an auto scaled image view.

It is useful when you don't know the aspect ratio in advance (e.g. user-uploaded content) but want to render the entire image while restricting either width or height only and preserve aspect ratio.

#### Example:

 ```jsx
import React from 'react';
import { Dimensions } from 'react-native';
import Image from 'react-native-auto-scale-image';

const image = (
    <Image
        style={{
            width: Dimensions.get('window').width // height will be calculated automatically
        }}
        uri={'<image uri>'}
    />
);
 ```

Also works with [styled-components](https://styled-components.com/).


Install
-------

```npm install react-native-auto-scale-image --save```


Props
-----

| name          | type      | default                     | description                                                        |
| ------------- | --------- | --------------------------- | -------------------------------------------------------------------|
| `style`       | object    | none                        | Style object with either `width` or `height` defined as a `number` |
| `uri`         | string    | none                        | URI or the image                                                   |

Support
--------

`react-native-auto-scale-image` uses hooks and is only compatible with react-native version `>=0.59.0`.
