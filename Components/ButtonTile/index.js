import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { Colors } from '../../utils/colors'

const buttonTile = (props) => {
    const {
        label,
        vitalLabel,
        calorieButton = false,
        onPress,
    } = props

    const calorieImage = '../../Assets/Images/calorieIcon.png'
    const dumbellImage = '../../Assets/Images/dumbell.png'

    const checkImage = () => {
        if (calorieButton) return require('../../Assets/Images/calorieIcon.png')
        else return require('../../Assets/Images/dumbell.png')
    }
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>

            <Image
                source={checkImage()}
                style={{
                    height: 40,
                    width: 40
                }}
            />

            <View style={{ paddingLeft: 15 }}>
                <Text style={styles.labelStyle}>{label}</Text>

                <Text style={styles.vitalLabel}>{vitalLabel}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default buttonTile

const styles = StyleSheet.create({
    container: {
        height: 79,
        borderWidth: 1,
        borderColor: Colors.silver,
        padding: 20,
        flexDirection: 'row',
        marginTop: 16
    },
    labelStyle: {
        color: Colors.slateGrey,
        fontSize: 13,
    },
    vitalLabel: {
        fontSize: 18,
        color: Colors.darkGrey,
        marginTop: 4
    }
})