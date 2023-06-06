import { View, Text, FlatList, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';

const ImageCarousel = ({images}) => {

  const [activeIndex,setActiveIndex]=useState(0)

  const ViewabilityConfig = useRef({
    itemVisiblePercentThreshold: 75,
  }).current
  const onViewableItemsChanged = useRef(({viewableItems})=>{
    setActiveIndex(viewableItems[0].index)
  }).current


  const windowWidth = useWindowDimensions().width
  const renderItem= ({item})=>(
    <Image 
        resizeMethod='resize'
        resizeMode='contain'
        style={[styles.image,{width: windowWidth-40}]}
        source={{uri : item}}/>
  )
  return (
    <View>
      <FlatList
        style={styles.root}
        data={images}
        renderItem={renderItem}
        horizontal = {true}
        showsHorizontalScrollIndicator={false}
        snapToInterval = {windowWidth-35}
        snapToAlignment = 'center'
        ViewabilityConfig = {ViewabilityConfig}
        onViewableItemsChanged = {onViewableItemsChanged}
      />
      <View style={styles.dotContainer}>
         {images.map((img,ind)=>{
          return <View key={ind} style={[styles.dot,{backgroundColor: ind===activeIndex ?'black':'#edeff2'}]}/>
          })}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    root: {
        marginTop: 20,
    },
    image: {
        height: 300,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 27,
        margin:5,
        borderWidth: 1,
        backgroundColor: '#edeff2',
    },
    dotContainer: {
      margin:10,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
    }
})
export default ImageCarousel;