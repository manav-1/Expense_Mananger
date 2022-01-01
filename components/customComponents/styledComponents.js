import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const MainContainer = styled.View`
    background: #fff9;
    width: ${Dimensions.get('window').width * 0.9}px;
    border-radius: 10px;
    padding: 20px 10px;
    ${'' /* position: absolute; */}
    ${'' /* top: 50px; */}
  text-align: center;
`;
const Title = styled.Text`
    text-align: center;
    font-weight: 600;
    font-family: Karla-Regular;
    color: #000;
    margin-bottom: 20px;
    font-size: 25px;
`;

const Input = styled.TextInput`
    width: 90%;
    margin: 5px auto;
    border-bottom-width: 2px;
    border-bottom-color: #fff;
    padding: 5px;
    font-family: Karla-Regular;
    font-size: 16px;
`;

const Button = styled.TouchableOpacity`
    border-radius: 5px;
    margin: 15px auto 5px;
    padding: 6px 20px;
    background: #fff;
    font-size: 30px;
`;

const Login = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background: transparent;
    font-size: 30px;
`;

const ButtonText = styled.Text`
    font-weight: 600;
    font-family: Inter-Regular;
    font-size: 18px;
    color: #000;
`;

const LoginContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin: 20px 10px;
`;

const BgImage = styled.Image`
    height: 250px;
    position: absolute;
    bottom: 20px;
    width: ${Dimensions.get('window').width}px;
    transform: rotate(5deg) scale(1.3);
    opacity: 0.75;
`;
const SignText = styled.Text`
    font-weight: 600;
    font-family: Inter;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    font-family: monospace;
    color: #000;
`;
const RowContainer = styled.View`
    flex-direction: row;
    margin: 5px;
`;

const IconText = styled.Text`
    color: #000;
    font-family: Inter-Medium;
    font-size: 11px;
    width: 80px;
    text-align: center;
`;

const FullContainer = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to top right, pink, white, pink);
`;
// const GradientContainer = styled(LinearGradient).attrs({
//   colors: ['#fffA', '#181D31'],
//   start: { x: 0, y: 0.2 },
//   end: { x: 0, y: 2 }
// })`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// `;

const GradientContainer = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #181824;
`;

const PaddedContainer = styled.ScrollView`
    margin: 5px;
    padding: 10px;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    margin-bottom: 80px;
`;
const PaddedViewContainer = styled.View`
    margin: 5px;
    padding: 10px;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    margin-bottom: 80px;
`;
const ExpenseInput = styled.TextInput`
    width: 90%;
    border-bottom-width: 2px;
    border-bottom-color: #fff;
    padding: 5px;
    font-family: Karla-Regular;
    font-size: 16px;
`;

const CenteredKarlaText = styled.Text`
    font-family: Karla-Regular;
    text-align: center;
    color: #000;
`;

export {
    MainContainer,
    Title,
    Input,
    Button,
    ButtonText,
    Login,
    LoginContainer,
    BgImage,
    SignText,
    RowContainer,
    IconText,
    FullContainer,
    GradientContainer,
    PaddedViewContainer,
    PaddedContainer,
    ExpenseInput,
    CenteredKarlaText,
};
