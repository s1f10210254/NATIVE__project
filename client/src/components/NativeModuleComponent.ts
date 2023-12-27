// import React from 'react';
// import {
//   requireNativeComponent,
//   GestureResponderEvent,
//   NativeSyntheticEvent,
// } from 'react-native';

// interface NativeModuleViewProps {
//   onClick: (event: NativeSyntheticEvent<GestureResponderEvent>) => void;
// }

// // Remove the generic type here
// const NativeModuleView = requireNativeComponent('NativeModuleView');

// export const NativeModuleComponent: React.FC<NativeModuleViewProps> = props => {
//   const onClick = (event: NativeSyntheticEvent<GestureResponderEvent>) => {
//     props.onClick(event);
//   };

//   // Assert the type when using the component
//   return <NativeModuleView {...props} onClick={onClick} />;
// };
