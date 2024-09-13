class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: [{ especie: 'macaco', quantidade: 3, carnivoro: false }] },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: [{ especie: 'gazela', quantidade: 1, carnivoro: false }] },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: [{ especie: 'leao', quantidade: 1, carnivoro: true }] }
        ];

        this.animais = {
            leao: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            leopardo: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            crocodilo: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            macaco: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            gazela: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            hipopotamo: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return "Animal inválido";
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return "Quantidade inválida";
        }

        const infoAnimal = this.animais[animal];
        const tamanhoNecessario = quantidade * infoAnimal.tamanho;
        let recintosViaveis = [];

        for (let i = 0; i < this.recintos.length; i++) {
            let recinto = this.recintos[i];
            
            let espacoOcupado = 0;
            for (let j = 0; j < recinto.animais.length; j++) {
                let animalPresente = recinto.animais[j];
                espacoOcupado += animalPresente.quantidade * this.animais[animalPresente.especie].tamanho;
            }

            let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;

            let biomaAdequado = false;
            for (let j = 0; j < recinto.bioma.length; j++) {
                if (infoAnimal.biomas.includes(recinto.bioma[j])) {
                    biomaAdequado = true;
                    break;
                }
            }
            if (!biomaAdequado) {
                continue;
            }

            let temOutrosAnimais = recinto.animais.length > 0;
            if (infoAnimal.carnivoro && temOutrosAnimais) {
                let outroAnimalDiferente = recinto.animais.some(a => a.especie !== animal);
                if (outroAnimalDiferente) {
                    continue;
                }
            }

            if (animal === 'hipopotamo' && !recinto.bioma.includes('rio')) {
                continue;
            }

            if (animal === 'macaco' && quantidade === 1 && !temOutrosAnimais) {
                continue;
            }

            if (temOutrosAnimais && !recinto.animais.some(a => a.especie === animal)) {
                espacoDisponivel -= 1;
            }

            if (espacoDisponivel >= tamanhoNecessario) {
                recintosViaveis.push(`Recinto nro ${recinto.numero} (espaço livre: ${espacoDisponivel - tamanhoNecessario}, total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length > 0) {
            return recintosViaveis.join('\n');
        } else {
            return "Não há recinto viável";
        }
    }
}

export { RecintosZoo as RecintosZoo };
