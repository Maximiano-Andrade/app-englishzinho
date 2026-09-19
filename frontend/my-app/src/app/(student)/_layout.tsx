import {Stack, Link} from 'expo-router'
export default  function Layout(){
    return (
          <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name='atividade'  options={{headerShown: true, title: 'Atividade'}}/>
              <Stack.Screen name={'videoTela'} options={{headerShown: true, title: ''}}/>
          </Stack>
    )
}