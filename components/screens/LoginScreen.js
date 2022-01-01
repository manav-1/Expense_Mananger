/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Snackbar} from 'react-native-paper';
// import firebase from '../FirebaseConfig';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// eslint-disable-next-line no-unused-vars
import Img from '../../assets/abstract-mobile-payment.png';

// Styled Components
import {
    MainContainer,
    Title,
    Input,
    Button,
    ButtonText,
    Login,
    LoginContainer,
    // eslint-disable-next-line no-unused-vars
    BgImage,
    SignText,
    RowContainer,
    IconText,
} from '../customComponents/styledComponents';

const source = {
    uri: 'https://images.unsplash.com/photo-1621264448270-9ef00e88a935?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=657&q=80',
};
try {
    GoogleSignin.configure({
        webClientId:
            '298744699635-m0jtnj44asu5qrluccp5oi9quaemrrep.apps.googleusercontent.com',
    });
} catch (error) {}

// function LoginScreen({navigation}) {
//     return <Title>Hello World</Title>;
// }

function LoginScreen({navigation}) {
    const [snackbarVisible, setSnackbarVisible] = React.useState(false);
    const [snackbarText, setSnackbarText] = React.useState('');

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        (() => {
            navigation.addListener('beforeRemove', e => e.preventDefault());
        })();
        const checkLoggedIn = async () => {
            if (await AsyncStorage.getItem('expense_user')) {
                navigation.push('HomeNav');
            }
        };
        checkLoggedIn();
    }, [navigation]);

    const handleLogin = async () => {
        const validationSchema = Yup.object({
            email: Yup.string().email().required('Please Enter your email'),
            password: Yup.string()
                .min(6, 'Please Enter more than  6 letters')
                .max(25)
                .required('Please Enter your password'),
        });
        validationSchema
            .validate({email, password})
            .then(async obj => {
                // firebase
                //   .
                auth()
                    .signInWithEmailAndPassword(obj.email, obj.password)
                    .then(async ({user}) => {
                        if (user.emailVerified) {
                            setSnackbarVisible(true);
                            setSnackbarText('Login successful');
                            await AsyncStorage.setItem(
                                'expense_user',
                                user.uid,
                            );
                            navigation.push('HomeNav');
                        } else {
                            setSnackbarVisible(true);
                            setSnackbarText('Please verify your email first');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setSnackbarVisible(true);
                        setSnackbarText(err.message);
                    });
            })
            .catch(err => {
                console.log(err);
                setSnackbarVisible(true);
                setSnackbarText(err.message);
            });
        // firebase.auth().createUserWithEmailAndPassword();
    };

    const handleGoogleLogin = async () => {
        try {
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            await AsyncStorage.setItem('expense_user', auth().currentUser.uid);
            navigation.push('HomeNav');
        } catch (error) {
            setSnackbarVisible(true);
            console.log(error);
            setSnackbarText("Google Login isn't supported yet");
        }
    };

    const handleFacebookLogin = async () => {
        setSnackbarVisible(true);
        setSnackbarText("Facebook login isn't supported yet");
        console.log('Facebook Login');
        // const result = await LoginManager.logInWithPermissions([
        //     'public_profile',
        //     'email',
        // ]);

        // if (result.isCancelled) {
        //     throw 'User cancelled the login process';
        // }

        // // Once signed in, get the users AccesToken
        // const data = await AccessToken.getCurrentAccessToken();

        // if (!data) {
        //     throw 'Something went wrong obtaining access token';
        // }

        // // Create a Firebase credential with the AccessToken
        // const facebookCredential = auth.FacebookAuthProvider.credential(
        //     data.accessToken,
        // );

        // // Sign-in the user with the credential
        // await auth().signInWithCredential(facebookCredential);
    };
    return (
        <ImageBackground
            style={StyleSheet.absoluteFill}
            source={source}
            resizeMode="cover">
            <View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        backgroundColor: '#000D',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                ]}>
                {/* <BgImage
          style={{ transform: [{ rotate: '-5deg' }, { scale: 1.2 }] }}
          source={Img}
        /> */}
                <MainContainer>
                    <Title>Login Here</Title>
                    <Input
                        placeholder="Enter your username/ email"
                        placeholderTextColor="#fffA"
                        value={email}
                        onChangeText={val => setEmail(val)}
                    />
                    <Input
                        placeholder="Enter your password"
                        placeholderTextColor="#fffA"
                        value={password}
                        onChangeText={val => setPassword(val)}
                    />
                    <Button onPress={handleLogin}>
                        <ButtonText>Login</ButtonText>
                    </Button>
                    <LoginContainer>
                        <Login onPress={handleGoogleLogin}>
                            <Ionicons
                                name="logo-google"
                                size={45}
                                color="#182e28"
                            />
                            <IconText>Google</IconText>
                        </Login>
                        <Login onPress={handleFacebookLogin}>
                            <Ionicons
                                name="logo-facebook"
                                size={45}
                                color="#182e28"
                            />
                            <IconText>Facebook</IconText>
                        </Login>
                    </LoginContainer>
                    <RowContainer>
                        <SignText>Dont have an Account </SignText>
                        <TouchableOpacity
                            onPress={() => navigation.push('Signup')}>
                            <SignText
                                style={{color: '#fff', fontWeight: '700'}}>
                                Sign Up
                            </SignText>
                        </TouchableOpacity>
                    </RowContainer>
                </MainContainer>
            </View>
            <Snackbar
                visible={snackbarVisible}
                duration={3000}
                style={{backgroundColor: '#182e28CC'}}
                onDismiss={() => setSnackbarVisible(false)}>
                {snackbarText}
            </Snackbar>
        </ImageBackground>
    );
}
LoginScreen.propTypes = {
    navigation: PropTypes.object,
};

export default LoginScreen;
