import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import StylesConfiguration from '../../../utils/StylesConfiguration';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-picker';
import users_services from '../../../services/users_services';
import GoBackButton from "../../../components/GoBackButton";

export default function VerifyAccount({navigation}) {
    const { register, control, handleSubmit, errors } = useForm();
    const [documentation, setdocumentation] = useState({});
    const [legalFiles, setLegalFiles] = useState({});
    const [legalId, setLegalId] = useState({});
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        let legalId = await sendFile(legalFiles);
        let docId;
        data.documentation = [];
        if (documentation) {
            docId = await sendFile(documentation);
            data.documentation = [docId];
        }
        data.legalFiles = legalId
        users_services.addAccountVerify(data).then((resp)=>{
            setLoading(false);
            console.log('======= buena respuesta  - falta retornar =============================');
            console.log(resp.data);
            console.log('====================================');
        }).catch((error)=>{
            console.log("oops", error);
        })
    }

    const sendFile = async (file) => {
        let formData = new FormData();
        formData.append('file', file);
        try {
            let response = await users_services.addFilesVerify(formData);
            return response.data.id;
        } catch (error) {
            console.error(error);
        }
    }

    const chooseFile = (type) => {
        let options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, async (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            let source = {
                name: 'photo.png',
                type: 'image/png',
                uri: 'data:image/jpeg;base64,' + response.data
            }
            if(type == "legalFiles"){
                setLegalFiles(source)
            }else{
                setdocumentation(source)
            }
          }
        });
      };
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return loading ? (
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="small" color={StylesConfiguration.color} />
        </SafeAreaView>
      ) : (
        <SafeAreaView  style={styles.container} >
            <View>
            <GoBackButton navigation={navigation} />
            </View>
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
                {errors.name && <Text style={{color:"red"}}>Ingrese un nombre válido.</Text>}
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
                    name="last_name"
                    rules={{ required: true, pattern:  /^[a-z ,.'-]+$/i}}
                    defaultValue=""
                />
                {errors.last_name && <Text style={{color:"red"}}>Ingrese un apellido válido.</Text>}
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
                {errors.email && <Text style={{color:"red"}}>Ingrese un correo válido.</Text>}
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
                    name="nickname"
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
                    name="professional_info"
                    defaultValue=""
                />
            </View>
            <View style={styles.containerFormTwo} >
                <View style={styles.formTwoInput} >
                    <Text style={{color:"white",fontSize:15}}>Foto DNI o Pasaporte</Text>
                    <TouchableOpacity  onPress={() => { chooseFile('document') }}>
                        <Image source={require('../../../assets/camara.png')} 
                    style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.formTwoInput} >
                    <Text style={{color:"white",fontSize:15}}>Documentación complementaria</Text>
                    <TouchableOpacity  onPress={() => { chooseFile('legalFiles') }}>
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
