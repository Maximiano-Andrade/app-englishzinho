import {StyleSheet, Text, View, ScrollView} from "react-native";

export default function Progress() {
    const alunos = [
        {
            id: 1,
            name: 'Emma Johnson',
            nivel: 'Intermediário',

        },
        {
            id: 2,
            name: 'Carlos Rodriguez',
            nivel: 'Iniciante',
        },
        {
            id: 3,
            name: 'Maria Silva',
            nivel: 'Avançado',
        },
        {
            id: 4,
            name: 'Maria Silva',
            nivel: 'Avançado',
        }
    ]
    const atividades = [
        {
            id: 1,
            title: 'Vocabulario Basico',
            type: 'Escuta',
            complete: 12,
            pedente: 3,

        },
        {
            id: 2,
            title: 'Pratica pronuncia',
            type: 'Fala',
            complete: 12,
            pedente: 3,

        },
        {
            id: 3,
            title: 'Vacabulario Basico',
            type: 'Quiz',
            complete: 12,
            pedente: 3,

        },

    ]

    function handCor(nivel:any) {
        if (nivel === 'Intermediário') {
            return '#2563EB'
        } else if (nivel === 'Iniciante') {
            return '#F97316'
        }
        return '#EF4444'
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{gap: 10}}>
                <View style={styles.containerProgress}>
                    <View>
                        <Text style={styles.progressTitle}>Progresso de
                            Aluno</Text>
                        <Text style={styles.progressSubtitle}>Última atividade de
                            seus alunos</Text>
                    </View>
                    <View style={{gap: 5}}>
                        {
                            alunos.map((aluno) => (
                                <View key={aluno.id} style={styles.progressPerfil}>
                                    <Text style={styles.progressPerfilName}>{aluno.name}</Text>
                                    <Text
                                        style={[styles.progressPerfilNivel, {backgroundColor: handCor(aluno.nivel)}]}>{aluno.nivel}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>

                <View style={styles.containerAtivRecen}>
                    <View>
                        <Text style={styles.ativRecenTitle}>Atividades
                            recentes</Text>
                        <Text style={styles.ativRecenSubtitle}>Taxas de conclusão de suas tarefas</Text>
                    </View>
                    <View style={{gap: 5}}>
                        {
                            atividades.map((atividade) => (
                                <View key={atividade.id} style={styles.atividadeCards}>
                                    <View style={styles.atividadeTitleType}>
                                        <Text style={styles.atividadeTitle}>{atividade.title}</Text>
                                        <Text style={styles.atividadeType}>{atividade.type}</Text>
                                    </View>

                                    <View style={{flexDirection: 'row', justifyContent: 'center', }}>
                                        <View style={{alignItems: 'center',  flex: 1  }}>
                                            <Text style={{color:'#F97316', fontFamily:'Inter_800ExtraBold', fontSize: 15}}>{atividade.complete}</Text>
                                            <Text style={{fontFamily:'Inter_500Medium', fontSize: 15, color: '#374151'}}>Completo</Text>
                                        </View>

                                        <View style={{alignItems: 'center', flex: 1}}>
                                            <Text style={{color:'#EF4444', fontFamily:'Inter_800ExtraBold', fontSize: 15}}>{atividade.pedente}</Text>
                                            <Text style={{fontFamily:'Inter_500Medium', fontSize: 15, color: '#374151'}}>Pendente</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 15,
        paddingVertical: 5,
        gap: 10,

    },

    containerProgress: {
        borderWidth: 1,
        borderColor: '#9CA3AF',
        borderRadius: 5,
        padding: 10,
        gap: 15,
        backgroundColor: '#fff'
    },

    progressTitle: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 20,
        color: '#374151'
    },

    progressSubtitle: {
        fontSize: 15,
        fontFamily: 'Inter_500Medium',
        color: '#374151'
    },

    progressPerfil: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgb(156 163 175 / 0.31)',
        backgroundColor: '#EFEEFB',
        padding: 10,
    },

    progressPerfilName: {
        fontFamily: 'Inter_500Medium',
        fontSize: 20,
        color: '#374151'
    },

    progressPerfilNivel: {
        fontSize: 15,
        color: '#fff',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter_500Medium',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,

    },

    containerAtivRecen: {
        borderWidth: 1,
        borderColor: '#9CA3AF',
        borderRadius: 5,
        padding: 10,
        gap: 10,
        backgroundColor: '#fff'
    },

    ativRecenTitle: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 20,
        color: '#374151'
    },

    ativRecenSubtitle: {
        fontSize: 15,
        fontFamily: 'Inter_500Medium',
        color: '#374151'
    },

    atividadeCards: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgb(156 163 175 / 0.31)',
        backgroundColor: '#EFEEFB',
        padding: 10,
        gap: 10,

    },

    atividadeTitleType: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    atividadeTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 20,
        color: '#374151'
    },

    atividadeType: {
        fontFamily: 'Inter_500Medium',
        fontSize: 20,
        color: '#374151',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(156 163 175 / 0.31)',
    }

});