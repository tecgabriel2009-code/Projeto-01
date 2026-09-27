# Gestão Industrial — Módulos de Engenharia & Catálogo ARCA × SABÓ

Aplicativo industrial corporativo desenvolvido em React, TypeScript e Tailwind CSS com identidade visual padrão **Roxo Corporativo #670099 (RGB 103, 0, 153)**.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+) ou Bun
- Gerenciador de pacotes npm, yarn, pnpm ou bun

### Instalação de Dependências
```bash
npm install
```

### Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
O app estará acessível em `http://localhost:3000`.

### Compilar para Produção (Web)
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `dist/`.

---

## 📱 Como Compilar o Aplicativo Android (APK)

O projeto está totalmente configurado com Gradle Wrapper e módulo Android nativo (`app/`).

### Pré-requisitos para Android
- **JDK 17 ou superior**
- **Android SDK** (Android 14 / API 34)

### Gerar APK Debug
Na raiz do projeto, execute:
```bash
./gradlew assembleDebug
```
No Windows:
```cmd
gradlew.bat assembleDebug
```

O arquivo compilado será gerado em:
```
app/build/outputs/apk/debug/app-debug.apk
```

### Abrir no Android Studio
1. Abra o **Android Studio**.
2. Selecione **File > Open** e aponte para a pasta raiz deste projeto.
3. Aguarde o Gradle sincronizar e clique no botão **Run** ou **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

---

## 📦 Estrutura do Projeto

- `src/components/`
  - `RetentoresCatalogView.tsx` — Módulo completo do Catálogo de Retentores ARCA × SABÓ.
  - `TechnicalToolsView.tsx` — Hub de Ferramentas Técnicas com módulos separados.
  - `PumpsView.tsx` — Módulo de Bombas Industriais.
  - `CentrifugalPumpsView.tsx` — Módulo de Bombas Centrífugas.
  - `ReducersView.tsx` — Módulo de Redutores.
  - `LabTestsView.tsx` — Módulo de Laboratório de Testes.
  - `SettingsModal.tsx` — Configurações e exportação do sistema.
  - `UserProfileModal.tsx` — Perfil do Operador.
- `src/data/`
  - `banco-retentores-arca-sabo.json` — Banco de dados oficial de retentores ARCA e SABÓ.
  - `initialData.ts` — Dados iniciais de equipamentos e especificações.
  - `manufacturerLogos.ts` — Logotipos vetoriais dos fabricantes industriais.
- `src/services/`
  - `retentoresService.ts` — Motor de busca dimensional, filtros e equivalência cruzada ARCA $\leftrightarrow$ SABÓ.
- `src/types/`
  - `retentores.ts` — Tipagens TypeScript do banco de dados de retentores.
  - `index.ts` — Tipos dos módulos industriais e perfis.

---

## ⚙️ Módulo Catálogo de Retentores ARCA × SABÓ

- **Banco de Dados Real:** 88 registros indexados (35 ARCA e 53 SABÓ).
- **Pesquisa por Código & Substring:** Busca rápida por código do fabricante ou descrição.
- **Pesquisa Dimensional:** Diâmetro Interno ($d_1$), Diâmetro Externo ($d_2$) e Largura ($b$).
- **Modos de Tolerância:** Busca exata ou tolerância industrial de montagem ($\pm 0,4\text{ mm}$).
- **Intercambiabilidade Cruzada:** Identificação imediata de retentores equivalentes entre os catálogos ARCA e SABÓ.
- **Ficha Técnica Detalhada:** Informações completas, desenho esquemático com cotas técnicas e cópia de especificações.
