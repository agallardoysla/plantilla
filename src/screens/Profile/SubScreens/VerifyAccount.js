import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import StylesConfiguration from '../../../utils/StylesConfiguration';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-picker';


export default function VerifyAccount() {
    const { register, control, handleSubmit, errors } = useForm();
    const [isFocused, setisFocused] = useState(false);

    const onSubmit = (data) => {
        data.DNI = filePath
        console.log(data)
    }

    const labelStyle = {
        position: "absolute",
        left: 0,
        top: !isFocused ? 18 : 0,
        fontSize: !isFocused ? 20 : 14,
        color: !isFocused ? "#000" : "white"
      };

    const [filePath, setFilePath] = useState({});
    const [fileName, setFileName] = useState('');

    /* useEffect(()=>{
        register({ name: "DNI" });
    },[register])

    const handleChange = e => setValue("DNI", filePath); */

    const chooseFile = () => {
        let options = {
          title: 'Select Image',
          customButtons: [
            {
              name: 'customOptionKey',
              title: 'Choose Photo from Custom Option'
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response.fileName);
          setFileName(response.fileName)
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log(
              'User tapped custom button: ',
              response.customButton
            );
            alert(response.customButton);
          } else {
            let source = response;
            // You can also display the image using data:
            // let source = {
            //   uri: 'data:image/jpeg;base64,' + response.data
            // };
            setFilePath(source);
          }
        });
      };
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
        <SafeAreaView  style={styles.container} >
            <Text style={styles.titleText}>solicitar verificación</Text>
            <View style={styles.containerForm}>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.textPatreon}
                            onBlur={onBlur}
                            placeholder="Nombre"
                            placeholderTextColor="#FFFFFF"
                            // textAlignVertical= "center"
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="name"
                    rules={{ required: true, pattern:  /^[a-z ,.'-]+$/i}}
                    defaultValue=""
                />
                {errors.name && <Text style={{color:"red"}}>This is required.</Text>}
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.textPatreon}
                            onBlur={onBlur}
                            placeholder="Apellido"
                            placeholderTextColor="#FFFFFF"
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="lastname"
                    rules={{ required: true, pattern:  /^[a-z ,.'-]+$/i}}
                    defaultValue=""
                />
                {errors.lastname && <Text style={{color:"red"}}>This is required.</Text>}
                 <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.textPatreon}
                            onBlur={onBlur}
                            placeholder="Email"
                            placeholderTextColor="#FFFFFF"
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="email"
                    rules={{ required: true ,pattern: EMAIL_REGEX}}
                    defaultValue=""
                />
                {errors.email && <Text style={{color:"red"}}>This is required.</Text>}
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.textPatreon}
                            onBlur={onBlur}
                            placeholder="Alias"
                            placeholderTextColor="#FFFFFF"
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="alias"
                    defaultValue=""
                />
                <Text style={{color:"white", marginTop: 30, marginBottom: 15,  fontSize:15}}>Indicanos tu profesion o que actividad realizas</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.textImg}
                            onBlur={onBlur}
                            multiline = {true}
                            placeholderTextColor="#FFFFFF"
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="profesion"
                    defaultValue=""
                />
            </View>
            <View style={styles.containerFormTwo} >
                <View style={styles.formTwoInput} >
                    <Text style={{color:"white",fontSize:15}}>Foto DNI o Pasaporte</Text>
                    <TouchableOpacity  onPress={() => { chooseFile() }}>
                        <Image source={require('../../../assets/camara.png')} 
                    style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.formTwoInput} >
                    <Text style={{color:"white",fontSize:15}}>Documentación complementaria</Text>
                    <TouchableOpacity  onPress={() => { chooseFile() }}>
                        <Image source={require('../../../assets/camara.png')} 
                    style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.formSubmit} >
                    <TouchableOpacity style={styles.action} onPress={handleSubmit(onSubmit)}>
                            <Text style={styles.textButton}>Verificar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: 'black',
    },
    containerForm: {
        flex: 1,
        flexDirection: 'column',
        marginTop: '10%',
        marginHorizontal: '10%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerFormTwo: {
        flex: 1,
        marginHorizontal: '10%'
    },
    action: {
        backgroundColor: '#E9FC64', 
        alignItems: 'center',
        justifyContent: 'center', 
        width: '100%',
        padding:10,
        borderRadius: 5,
      },
    formTwoInput: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formSubmit: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 8,
    },
    goBackButon: {
        alignSelf: 'flex-start',
    },
    titleText: {
        textTransform: 'uppercase',
        color: StylesConfiguration.color,
        fontFamily: StylesConfiguration.fontFamily,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 4,
    },
    textPatreon: {
        height: 50,
        borderBottomColor: "yellow",
        borderWidth: 1,
        fontSize: 15,
        color: 'white',
        minWidth: '100%'
    },
    textImg: {
        // margin: 15,
        height: 80,
        borderColor: "yellow",
        borderWidth: 1,
        fontWeight: '400',
        width: '100%',
        fontSize: 15,
        color: 'white',
    },
    followButton: {
        margin: 15,
        width: 100,
        marginTop: 0,
        padding: 2,
        marginHorizontal: 5,
        height: 26,
        borderRadius: 5,
    },
    followButtonText: {
        fontSize: 20,
        color: StylesConfiguration.color,
    },
    title: {
        fontSize: 14,
        fontWeight: StylesConfiguration.fontWeight,
        fontFamily: StylesConfiguration.fontFamily,
        color: StylesConfiguration.color,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: StylesConfiguration.color,
    },
    formRowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
