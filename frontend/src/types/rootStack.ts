import { AlimentoTaco, Product } from ".";

export type RootStackParamList = {
    AbrindoApp:undefined;
    TelaLogin:undefined;
    Home: undefined;
    CadastroAlturaPeso: undefined;
    CadastroEmail: undefined;
    CadastroNome: undefined;
    CadastroSexoIdade: undefined;
    TelaPPObjetivo: undefined;
    TelaFinalizado: undefined;
    CadastroNutriEmail: undefined;
    CadastroNutriNome: undefined;
    CadastroNutriFormacao:undefined;
    CadastroNutriTelefone:undefined;
    PesquisaAlimento: undefined;
    AdicionarAlimento: {
    product: AlimentoTaco | Product | null; // Agora aceita ambos os tipos
    };
    
    CadastrarAlimento:undefined;
    ErroAlimento:undefined;
    MonitorCalorico:undefined;
    MenuDietas:undefined;
    CafedaManha:undefined;
    Almoco:undefined;
    Jantar:undefined;
    Lanches:undefined;
    TelaConfiguracoes:undefined;
    TelaInformacoes:undefined;
    TelaTrocaSenha:undefined;
    TelaConfiguracoesNutri:undefined;
    TelaInformacoesNutri1:undefined;
    TelaInformacoesNutri2:undefined;
    TelaTrocaSenhaNutri:undefined;
    SeusExercicios: undefined;
    NewExercicise: undefined;
    MenuInferior: undefined;
    ConsumoAgua:undefined;
    TelaPeso: undefined;
    TelaPerfil: undefined;
    GraficoConsumoAgua:undefined;
    TelaUpdateInformacoes:undefined;
}

