import * as React from 'react';

import { Button, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';

import { Card, Switch } from 'react-native-paper';
import Constants from 'expo-constants';

export default class App extends React.Component {

    state = {
        gasolina: '',
        etanol: '',
        resultado: 'Preencha os dados e calcule',
        isSwitchOn: false
    }

    calculate = () => {
        let resultado;
        const { etanol, gasolina } = this.state;
        
        if (!isNaN(Number(etanol)) && !isNaN(Number(gasolina))) {
            const value = Number(etanol) / Number(gasolina);

            if (value > 0.70) {
                resultado = 'Vale a pena gasolina';
            } else if (value < 0.70) {
                resultado = 'Vale a pena etanol';
            } else {
                resultado = 'São equivalentes';
            }

            Alert.alert(
                'Resultado',
                resultado
            );
        }
    }

    onChangeText = (value) => {
        this.setState(value);
    }

    handleThema() {
        const { isSwitchOn } = this.state;
        this.setState({ isSwitchOn: !isSwitchOn });
    }

    render() {
        const { isSwitchOn } = this.state;

        return (        
            <View style={[styles.container, isSwitchOn && styles.containerDark]}>
                <Switch
                    style={styles.switch}
                    thumbColor={colorSecond}
                    trackColor={{true: colorSecond, false: 'grey'}}
                    value={isSwitchOn}
                    onValueChange={this.handleThema.bind(this)}      
                />
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={require('./gas-pump.png')} style={styles.logo} />
                </View>
                <Text style={styles.paragraph}>Etanol ou Gasolina?</Text>
                <Card style={[styles.card, isSwitchOn && styles.cardDark]}>
                    <TextInput 
                        style={[styles.textInput, isSwitchOn && styles.textInputDark]} 
                        value={this.state.etanol}
                        placeholder={'Etanol'}
                        placeholderTextColor={colorSecond}
                        onChangeText={(etanol) => this.onChangeText({ etanol })} />
                    <TextInput 
                        style={[styles.textInput, isSwitchOn && styles.textInputDark]} 
                        value={this.state.gasolina}
                        placeholder={'Gasolina'}
                        placeholderTextColor={colorSecond}
                        onChangeText={(gasolina) => this.onChangeText({ gasolina })} />
                    <View style={{margin: 10}}>
                        <Button 
                            color={colorSecond}
                            titleStyle={{ color: '#000000' }}
                            onPress={() => this.calculate()} title='Calcular'
                        />
                    </View>
                </Card>
        </View>
        );
    }
}

const colorPrimary = '#F2F2F2',
    colorSecond = '#5c5c8a',
    colorDark = '#222021';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colorPrimary,
        padding: 8,
    },
    containerDark: {
        backgroundColor: colorDark
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorSecond,
    },
    card: {
        backgroundColor: colorPrimary,   
    },
    cardDark: {
        backgroundColor: colorDark,
    },
    textInput: {
        margin: 10,
        borderColor: colorSecond,
        borderRadius: 3,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        paddingHorizontal: 5
    },
    textInputDark: {
        margin: 10,
        paddingHorizontal: 5,
        backgroundColor: colorPrimary,
        borderColor: colorDark,
    },
    switch: {
        position: 'absolute',
        top: 40,
        right: 0,
    }
});