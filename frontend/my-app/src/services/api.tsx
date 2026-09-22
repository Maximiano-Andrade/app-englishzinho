const API_URL = 'http://172.27.176.1:8000';
// Expo Go no celular: use o IPv4 do computador.
// Android Emulator: http://10.0.2.2:8000


export type UsuarioLogado = {
    id_usuario: number;
    id_professor: number | null;
    nome: string;
    email: string;
    tipo_usuario: 'ALUNO' | 'PROFESSOR';
    foto_perfil?: string | null;
};

export type UsuarioCreate = {
    nome: string;
    email: string;
    senha: string;
    tipo_usuario: 'ALUNO' | 'PROFESSOR';
    foto_perfil?: string;
    nivel_ingles?: string;
    escola?: string;
};

export type Video = {
    id: number;
    title: string;
    description: string;
    type: string;
    nivel: string;
    url: string;
};

export type VideoCreate = {
    title: string;
    description: string;
    type: string;
    nivel: string;
    url: string;
};

export type AnswerCreate = {
    text: string;
    correct: boolean;
};

export type QuestionCreate = {
    text: string;
    answers: AnswerCreate[];
};

export type AtividadeCreate = {
    professor_id: number;
    title: string;
    description: string;
    type: 'Quiz' | 'Escuta' | 'Fala';
    level: 'Iniciante' | 'Intermediário' | 'Avançado';
    questions: QuestionCreate[];
};

export type Atividade = {
    id: number;
    professor_id: number;
    title: string;
    description: string;
    type: string;
    level: string;
    created_at: string;
};


async function tratarResposta(resposta: Response) {
    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.detail || 'Erro ao comunicar com a API.');
    }

    return dados;
}


// ---------- LOGIN ----------

export async function fazerLogin(
    email: string,
    senha: string,
): Promise<UsuarioLogado> {
    const resposta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            senha,
        }),
    });

    return tratarResposta(resposta);
}


// ---------- USUÁRIOS ----------

export async function cadastrarUsuario(usuario: UsuarioCreate) {
    const resposta = await fetch(`${API_URL}/usuario/cradastar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    });

    return tratarResposta(resposta);
}


// ---------- VÍDEOS ----------

export async function criarVideo(video: VideoCreate): Promise<Video> {
    const resposta = await fetch(`${API_URL}/video/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
    });

    return tratarResposta(resposta);
}

export async function listarVideos(): Promise<Video[]> {
    const resposta = await fetch(`${API_URL}/video/videos`);

    return tratarResposta(resposta);
}


// ---------- ATIVIDADES ----------

export async function criarAtividade(
    atividade: AtividadeCreate,
): Promise<Atividade> {
    const resposta = await fetch(`${API_URL}/atividades/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(atividade),
    });

    return tratarResposta(resposta);
}

export async function listarAtividades(): Promise<Atividade[]> {
    const resposta = await fetch(`${API_URL}/atividades/`);

    return tratarResposta(resposta);
}

export async function listarAtividadesDoProfessor(
    professorId: number,
): Promise<Atividade[]> {
    const resposta = await fetch(
        `${API_URL}/atividades/professor/${professorId}`,
    );

    return tratarResposta(resposta);
}

export async function buscarAtividade(atividadeId: number) {
    const resposta = await fetch(
        `${API_URL}/atividades/${atividadeId}`,
    );

    return tratarResposta(resposta);
}

export async function listarProgressoDoAluno(alunoId: number) {
    const resposta = await fetch(
        `${API_URL}/progresso/aluno/${alunoId}`,
    );

    return tratarResposta(resposta);
}

export async function concluirProgresso(
    alunoId: number,
    atividadeId: number,
) {
    const resposta = await fetch(`${API_URL}/progresso/concluir`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            aluno_id: alunoId,
            atividade_id: atividadeId,
        }),
    });

    return tratarResposta(resposta);
}