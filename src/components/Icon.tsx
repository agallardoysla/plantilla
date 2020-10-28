/** Imports escenciales para la clase. */
import React from 'react';
import {StyleSheet, ImageSourcePropType, Pressable, Image} from 'react-native';

/** Declaracion de las Props. */
interface IconProps {
  /** [source]:  Icono principal del componente. */
  source: ImageSourcePropType | string;
  /** [secondIcon]: Icono secundario del componente. */
  secondIcon?: ImageSourcePropType | string;
  /** [onPress]: Funcion para realizar alguna accion. */
  onPress?: () => void;
  /** [showSecondIcon]: Variable para validar si se muestra el segundo icono. */
  showSecondIcon?: boolean;
  /** [size]:  Tamaño del icono */
  size?: number;
  /** [color]: Color del icono */
  color?: string;
  /** [secondColor]: Color del icono */
  secondColor?: string;
  /** [style]: Estilo para el contenedor del icon */
  style?: any;
}

/**
 *[Icon]: Componente para setear un Icono.
 */
const Icon = ({
  source,
  secondIcon,
  onPress,
  showSecondIcon,
  size = 25,
  color = 'white',
  secondColor = 'white',
  style,
}: IconProps) => {
  const aux: any = {
    boton_play_1: require(`../assets/boton_play_1.png`),
    boton_volver_atras: require(`../assets/boton_volver_atras.png`),
    boton_ya: require(`../assets/boton_ya.png`),
    camara: require(`../assets/camara.png`),
    check: require(`../assets/check.png`),
    clear: require(`../assets/clear.png`),
    comentario: require(`../assets/comentario.png`),
    compartir: require(`../assets/compartir.png`),
    corazon_gris: require(`../assets/corazon_gris.png`),
    corazon_limon_1: require(`../assets/corazon_limon_1.png`),
    corazon_limon: require(`../assets/corazon_limon.png`),
    dog: require(`../assets/dog.png`),
    email: require(`../assets/email.png`),
    flash_auto: require(`../assets/flash_auto.png`),
    flash_off: require(`../assets/flash_off.png`),
    flash_on: require(`../assets/flash_on.png`),
    camera_front: require(`../assets/camera_front.png`),
    camera_rear: require(`../assets/camera_rear.png`),
    edit: require(`../assets/edit.png`),
    delete: require(`../assets/delete.png`),
    done: require(`../assets/done.png`),
    done_all: require(`../assets/done_all.png`),
    facebook_icon: require(`../assets/facebook_icon.png`),
    favorite: require(`../assets/favorite.png`),
    foto_perfil_superior: require(`../assets/foto_perfil_superior.png`),
    foto_perfil: require(`../assets/foto_perfil.png`),
    foto_publicacion: require(`../assets/foto_publicacion.png`),
    foto: require(`../assets/foto.png`),
    franja_amarilla_imagen: require(`../assets/franja_amarilla_imagen.png`),
    google_icon: require(`../assets/google_icon.png`),
    icono_buscar_activo: require(`../assets/icono_buscar_activo.png`),
    icono_buscar: require(`../assets/icono_buscar.png`),
    icono_camara_activo: require(`../assets/icono_camara_activo.png`),
    icono_camara: require(`../assets/icono_camara.png`),
    icono_home_activo: require(`../assets/icono_home_activo.png`),
    play_arrow: require(`../assets/play_arrow.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
    // visibility: require(`../assets/visibility.png`),
  };
  const icon = typeof source === 'string' ? aux[source] : source;
  const icon2 = typeof secondIcon === 'string' ? aux[secondIcon] : secondIcon;

  return (
    <Pressable onPress={onPress} style={[style, {height: size, width: size}]}>
      {secondIcon ? (
        <Image
          resizeMode={'contain'}
          style={{
            height: size,
            width: size,
            tintColor: showSecondIcon ? secondColor : color,
          }}
          source={showSecondIcon ? icon2 : icon}
        />
      ) : (
        <Image
          resizeMode={'contain'}
          style={{height: size, width: size, tintColor: color}}
          source={icon}
        />
      )}
    </Pressable>
  );
};

/** Exportamos el componente. */
export default Icon;

/** Estilos del componente */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
