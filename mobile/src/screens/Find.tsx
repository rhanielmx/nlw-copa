import { Heading, Text, useToast, VStack } from "native-base";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from '../components/Header'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";

export function Find() {
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')

    const toast = useToast()
    const { navigate } = useNavigation()

    //TODO - Rename Pool
    async function handleJoinPool() {
        try {
            setIsLoading(true)
            if (!code.trim()) {
                return toast.show({
                    title: 'Informe um código!',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            await api.post('/pools/join', { code })

            toast.show({
                title: 'Você se juntou ao bolão!',
                placement: 'top',
                bgColor: 'green.500'
            })

            setIsLoading(false)
            navigate('pools')


        } catch (err) {
            console.log(err)
            setIsLoading(false)

            if (err?.data?.message === 'Poll not found!') {
                return toast.show({
                    title: 'Bolão não encontrado!',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            if (err?.data?.message === 'You can\'t join the poll twice') {
                return toast.show({
                    title: 'Você já está nesse bolão!',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            toast.show({
                title: 'Não foi possível se juntar ao bolão!',
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    return (
        <VStack flex={1} bgColor='gray.900'>
            <Header title="Buscar por código" showBackButton />
            <VStack mt={8} mx={5} alignItems='center'>
                <Heading
                    fontFamily='heading'
                    color='white'
                    fontSize='xl'
                    mb={8}
                    textAlign='center'
                >
                    Encontre um bolão através de seu código único!
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual seu código do bolão?"
                    autoCapitalize="characters"
                    value={code}
                    onChangeText={setCode}
                />
                <Button
                    title="Buscar bolão"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />
            </VStack>
        </VStack>
    )
}