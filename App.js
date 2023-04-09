import React, { 
    useState, 
    useEffect 
} from "react";

import { 
    Button,
    Text,
    View 
    } from "react-native";

import auth from '@react-native-firebase/auth';

const App = (props) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    
    if (initializing) {
        return null;
    }

    if (!user) {
        return (
            <View>
                <Button
                    onPress={ () => auth().signInAnonymously().then((user) => setUser(user)) }
                    title="Acessar" />
            </View>
        );
    }

    return (
        <View>
            <Text>Olá usuário!</Text>

            <Button
                onPress={() => auth().signOut() }
                titl="Sair" />
        </View>
    );
 }

export default App;