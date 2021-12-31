/* eslint-disable no-shadow */
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import firebase from '../FirebaseConfig';
import auth from '@react-native-firebase/auth';
import {
    GradientContainer,
    ExpenseInput,
    PaddedContainer,
} from '../customComponents/styledComponents';
import {Snackbar, ProgressBar} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const Profile = () => {
    const [user, setUser] = React.useState(null);
    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');

    const [snackbarText, setSnackbarText] = React.useState('');
    const [snackbarVisible, setSnackbarVisible] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setUser(auth().currentUser);
        setUserName(auth().currentUser.displayName);
        setUserEmail(auth().currentUser.email);
        setImage(auth().currentUser.photoURL);
    }, []);
    // React.useEffect(() => {
    //     (async () => {
    //         if (Platform.OS !== 'web') {
    //             const {status} =
    //                 await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert(
    //                     'Sorry, we need camera roll permissions to make this work!',
    //                 );
    //             }
    //         }
    //     })();
    // }, []);

    const updateProfile = async () => {
        // firebase
        //   .
        auth()
            .currentUser.updateProfile({
                displayName: userName,
                email: userEmail,
            })
            .then(() => {
                setSnackbarVisible(true);
                setSnackbarText('Profile Updated');
            })
            .catch(error => {
                setSnackbarVisible(true);
                setSnackbarText(error.message);
            });
    };
    const pickImage = async () => {
        let result = await launchImageLibrary({
            mediaTypes: 'photo',
            quality: 1,
        });

        if (!result.didCancel) {
            setImage(result.uri);
            uploadImage(result.uri);
        }
    };
    const uploadImage = async image => {
        setIsLoading(true);
        storage()
            .ref(`images/${user.uid}.png`)
            .putFile(image)
            .then(async () => {
                setIsLoading(false);
                const user = auth().currentUser;
                const photoUrl = await storage()
                    .ref(`images/${user.uid}.png`)
                    .getDownloadURL();
                await auth().currentUser.updateProfile({
                    photoURL: photoUrl,
                });
                setImage(photoUrl);
            })
            .catch(err => {
                setSnackbarVisible(true);
                setSnackbarText(err.message);
            });
        setIsLoading(false);
    };

    return (
        <GradientContainer>
            <View style={styles.tabStyles}>
                <Text style={styles.tabBarTitle}>Profile</Text>
            </View>
            <PaddedContainer>
                {isLoading ? (
                    <ProgressBar progress={0.8} color="#f1c0cb" indeterminate />
                ) : null}
                <View style={styles.editImageContainer}>
                    <Image
                        source={{
                            uri:
                                image ??
                                'https://sitechecker.pro/wp-content/uploads/2017/12/URL-meaning.png',
                        }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity
                        onPress={pickImage}
                        style={styles.editProfileButton}>
                        <FontAwesome5 name="edit" size={18} color="#000" />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.text}>Name</Text>
                    <ExpenseInput
                        value={userName}
                        onChangeText={val => setUserName(val)}
                        style={styles.expenseInput}
                    />
                    <Text style={styles.text}>Email</Text>
                    <ExpenseInput
                        value={userEmail}
                        editable={false}
                        style={styles.expenseInput}
                    />

                    <TouchableOpacity
                        onPress={updateProfile}
                        style={styles.saveButton}>
                        <Text style={styles.saveText}>
                            Save Profile&nbsp;&nbsp;
                            <Ionicons
                                name="save-outline"
                                color="#000"
                                size={16}
                            />
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.alignSelf}>
                        <Text style={[styles.text, styles.extraText]}>
                            Account Created on
                        </Text>
                        <Text style={[styles.text, styles.extraText]}>
                            {user
                                ? new Date(
                                      user.metadata.creationTime,
                                  ).toLocaleDateString()
                                : null}
                        </Text>
                    </View>
                </View>
            </PaddedContainer>
            <Snackbar
                visible={snackbarVisible}
                duration={3000}
                style={styles.snackbar}
                onDismiss={() => setSnackbarVisible(false)}>
                <Text style={styles.snackbarText}>{snackbarText}</Text>
            </Snackbar>
        </GradientContainer>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: 'Karla-Regular',
        color: '#f1c0cb',
        marginHorizontal: 10,
        marginTop: 10,
    },
    expenseInput: {
        width: 200,
        borderBottomWidth: 1,
        borderBottomColor: '#ccf0fa',
        color: '#ccf0fa',
        borderRadius: 1,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#f1c0c0',
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        paddingVertical: 15,
        alignSelf: 'flex-end',
    },
    saveText: {
        color: '#000',
        fontFamily: 'Karla-Regular',
        fontSize: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'red',
    },
    editProfileButton: {
        position: 'absolute',
        right: -5,
        bottom: -5,
        backgroundColor: '#fff',
        padding: 10,
        paddingLeft: 12,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    extraText: {fontSize: 16, textAlign: 'right', marginTop: 2},
    snackbar: {backgroundColor: '#f1c0cb', marginBottom: 80},
    snackBarText: {color: '#000'},
    editImageContainer: {position: 'absolute', right: 10, top: 10},
    tabBarTitle: {
        fontSize: 25,
        padding: 10,
        margin: 5,
        color: '#fff',
        fontFamily: 'Karla-Regular',
    },
    tabStyles: {
        // borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#181824',
    },
    logoutButton: {
        marginRight: 10,
        paddingLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#494c59',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alignSelf: {alignSelf: 'flex-end'},
});

export default Profile;
