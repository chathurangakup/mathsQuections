import React,{useEffect} from 'react';
import {SafeAreaView, View, Dimensions, Image, Text, Animated, FlatList, TouchableOpacity,ScrollView} from 'react-native';
import {colors} from '../../config/styles';
import Images from '../../config/Images';
import { subj } from '../../config/DefaultJson';


const {width, height} = Dimensions.get('window');

const SubjectMain = () => {

    const animated = new Animated.Value(0);
    const duration = 1000;
  
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animated, {
            toValue: 20,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animated, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }, []);

    const SubjectItem =({subjects})=>{
        return(
              <TouchableOpacity activeOpacity={0.0} 
              style={{backgroundColor: colors.primaryColor1,margin:10,width: width/2.5,
              height:height/4.5,borderRadius:10,padding:15,shadow:'#9e9808',elevation:5}}>
                <Text style={{color:'black'}}>Science</Text>
              </TouchableOpacity>      
        )
    }

  return (
    <SafeAreaView style={{flex:1,position:'relative'}}>
      <View
        style={{
          width: '100%',
          height: height / 2.5,
          padding: 30,
          backgroundColor: colors.primaryColor1,
          position: 'relative',
        }}>
        <Image
          source={Images.SubjectTeach}
          style={{
            position: 'absolute',
            opacity:0.3,
            top:40,
            left:15,
            borderRadius:200,
            width:300,
            height:300
          }}
        />

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
            <Animated.View style={[{
                width:60,
                height:60,
                backgroundColor:'white',
                borderRadius:30
            },{transform: [{translateY: animated}]}]}>

            </Animated.View>
        </View>
        <Text style={{color:colors.blackColor,top:40,left:15}}>Good Morning Uditha</Text>
      </View>
      
      <View>

          <FlatList
                data={subj}
                style={{paddingHorizontal:20,marginTop:-60,marginBottom:80}}
                contentContainerStyle={{alignItems:'center'}}
                showsVerticalScrollIndicator={false}
                numColumns={2}
               // keyExtractor={item=> item.value}
                renderItem={item=> <SubjectItem subjects={item}/>}
            />
          
      </View>
    </SafeAreaView>
  );
};

export default SubjectMain;
