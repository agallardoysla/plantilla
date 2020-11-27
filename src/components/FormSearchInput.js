import React, {useCallback, useState} from 'react';
import {StyleSheet, View, TextInput, Image, TouchableOpacity, Text} from 'react-native';
import StylesConfiguration from '../utils/StylesConfiguration';
import Slider from '@react-native-community/slider';
import RangeSlider from 'rn-range-slider';
import Thumb from './RangeSliderComponents/Thumb';
import Rail from './RangeSliderComponents/Rail';
import RailSelected from './RangeSliderComponents/RailSelected';
import Label from './RangeSliderComponents/Label';

export default function FormSearchInput({labelValue, placeholderText, showControls, callback, ...props }){
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [gender, setGender] = useState(null);
  const [distance, setDistance] = useState(100);
  const [ageStart, setAgeStart] = useState(14);
  const [ageEnd, setAgeEnd] = useState(75);
  const [related, setRelated] = useState(null);
  
  const availablesGenders = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
  };

  const renderThumb = useCallback(() => <Thumb/>, []);
  const renderRail = useCallback(() => <Rail/>, []);
  const renderRailSelected = useCallback(() => <RailSelected/>, []);
  const renderLabel = useCallback(value => <Label text={value}/>, []);

  const handleDistanceChange = useCallback((low, high) => {
    setDistance(low);
  }, []);

  const handleAgeChange = useCallback((low, high) => {
    setAgeStart(low);
    setAgeEnd(high);
  }, []);


  const doAdvancedSearch = () => {
    const res = {
      gender: gender,
      distance: distance,
      age: [ageStart, ageEnd],
      related: related,
    };
    setShowAdvancedSearch(false);
    callback(res);
  }

  const Selector = ({label, onPress, isSelected}) => (
    <TouchableOpacity onPress={onPress} style={styles.selectorContainer}>
      <Text style={isSelected ? styles.selectorSelected : styles.selectorNotSelected}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const isSelected = (state, value) => state === value;

  return (  
    <View style={styles.container} >
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/lupa.png')}
          style={styles.searchImage}
        />
        <TextInput style={styles.texInput} underlineColorAndroid="transparent" {...props}/>
        { showControls ? (
          <TouchableOpacity onPress={() => setShowAdvancedSearch(!showAdvancedSearch)} >
            <Image
              source={require('../assets/filtros.png')}
              style={styles.searchImage}
            />
          </TouchableOpacity>
        ) : null }
      </View>
      {showAdvancedSearch ? (
        <View style={styles.advancedSearchContainer}>
          <View style={styles.selector}>
            <Text style={styles.selectorLabel}>
              Género
            </Text>
            <Selector 
              label='Masculino' 
              onPress={() => {setGender(availablesGenders.MALE)}} 
              isSelected={isSelected(gender, availablesGenders.MALE)}
            />
            <Selector 
              label='Femenino' 
              onPress={() => {setGender(availablesGenders.FEMALE)}} 
              isSelected={isSelected(gender, availablesGenders.FEMALE)}
            />
            <Selector 
              label='Otro' 
              onPress={() => {setGender(availablesGenders.OTHER)}} 
              isSelected={isSelected(gender, availablesGenders.OTHER)}
            />
          </View>
          <View style={styles.selectorRange}>
            <Text style={styles.selectorLabel}>
              Distancia
            </Text>
            <RangeSlider
              style={styles.rangeSlider}
              min={0}
              max={100}
              low={100}
              step={10}
              disableRange
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              onValueChanged={handleDistanceChange}
            />
            <Text style={[styles.valueSelected, styles.valueSelectedRight]}>
              {distance}km
            </Text>
          </View>
          <View style={styles.selectorRange}>
            <Text style={styles.selectorLabel}>
              Edad
            </Text>
            <Text style={[styles.valueSelected, styles.valueSelectedLeft]}>
              {ageStart}
            </Text>
            <RangeSlider
              style={styles.rangeSlider}
              min={14}
              max={75}
              step={1}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              onValueChanged={handleAgeChange}
            />
            <Text style={[styles.valueSelected, styles.valueSelectedRight]}>
              {ageEnd}
            </Text>
          </View>
          <View style={styles.selector}>
            <Text style={styles.selectorLabel}>
              Amigos en común
            </Text>
            <Selector 
              label='Si' 
              onPress={() => {setRelated(true)}} 
              isSelected={isSelected(related, true)}
            />
            <Selector 
              label='No' 
              onPress={() => {setRelated(false)}} 
              isSelected={isSelected(related, false)}
            />
            <TouchableOpacity onPress={doAdvancedSearch} style={styles.doAdvancedSearch}>
              <Text style={styles.doAdvancedSearchText}>
                APLICAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null }
    </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#50555C',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 30,
    borderRadius: 10,
    zIndex: 2,
  },
  searchImage: {
    margin: 10,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  texInput: {
    flex: 1,
    color: 'white',
    paddingBottom: 5,
  },
  advancedSearchContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#50555C',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 130,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: -10,
    paddingTop: 8,
    zIndex: 1,
  },
  selector: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 7,
  },
  selectorRange: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 7,
  },
  selectorLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: StylesConfiguration.fontFamily,
    marginRight: 10,
  },
  selectorContainer: {
    paddingHorizontal: 10,
  },
  selectorSelected: {
    color: StylesConfiguration.color,
    fontSize: 11,
    fontWeight: '500',
    fontFamily: StylesConfiguration.fontFamily,
  },
  selectorNotSelected: {
    color: 'white',
    fontSize: 11,
    fontWeight: '500',
    fontFamily: StylesConfiguration.fontFamily,
  },
  rangeSlider: {
    width: 160,
  },
  valueSelected: {
    color: StylesConfiguration.color,
  },
  valueSelectedLeft: {},
  valueSelectedRight: {
    width: 45,
  },
  doAdvancedSearch: {
    height: 20,
    width: 55,
    borderRadius: 10,
    backgroundColor: StylesConfiguration.color,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
  },
  doAdvancedSearchText: {
    color: 'black',
    fontSize: 9,
    fontWeight: '700',
    fontFamily: StylesConfiguration.fontFamily,
  },
});
