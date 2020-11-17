## Friends Challenge

Es una aplicación móvil desarrollada con react-native 0.63.3

### Setup del entorno

- Para configurar el entorno es conveniente seguir los pasos de la documentación de [React Native](https://reactnative.dev/docs/environment-setup).
- Clonar el repositorio.
- Ejecutar `npm install` o preferentemente ejecutar 'yarn'.
- Para comenzar a correr el servidor local de React-Native ejecutar 'yarn start'.
- En otra terminal ejecutar el comando 'yarn android' o el comando 'yarn ios' (este ultimo para correr la aplicacion en iOS);

- Problemas con Material TextField: https://stackoverflow.com/questions/61226530/typeerror-undefined-is-not-an-object-evaluating-reactnative-animated-text-pr

Modificar en react-native-material-textfield: counter, affix, helper, label, field.
Reemplazar 'Animated.Text.propTypes.style' por 'Text.propType'
Agregar 'import { Animated, Text} from 'react-native';' si no tiene importado Text