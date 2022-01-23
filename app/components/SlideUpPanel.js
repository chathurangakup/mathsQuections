import React,{useEffect,useRef} from 'react';
import { Modalize } from 'react-native-modalize';
import {connect} from 'react-redux';
import {View,Text} from 'react-native';


const SlideUpPanel = props =>{
 const modalizeRef = useRef(null);
// const onOpen = () => {
//     modalizeRef.current?.open();
// };

useEffect(() => {
    // Update the document title using the browser API
   if (props.config.visible == true) {
        modalizeRef.current?.open();
    }
 
},[props.config.visible == true ]);

    return(

         <Modalize ref={modalizeRef} 
          handlePosition="inside"
          adjustToContentHeight={true}
        >

                <View style={{padding:50}}>
                    <Text style={{color:'black'}}>{props.config.title}</Text></View>
                    <Text style={{color:'black'}}>{props.config.msg}</Text>

                    {props.config.twoButtons == true ?
                        <View></View>   
                        :
                        <View></View> 
                }
        </Modalize> 

    )
}

SlideUpPanel.defaultProps = {
    config: {
      alertType: 'TYPE_SUCCESS_POSITIVE_ALERT',
      visible: false,
      title: null,
      msg: null,
      okText: null,
      okFn: () => {},
      btnCancel: () => {},
      twoButtons: false,
    }
}

const mapStateToProps = (state, props) => {
    return {
        config: state.common.slideUpPanelConfig,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      hideSlidUpPanel: () => {
        dispatch({
          type: 'HIDE_BOTTOM_ALERT',
        });
      },
    };
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(SlideUpPanel);


